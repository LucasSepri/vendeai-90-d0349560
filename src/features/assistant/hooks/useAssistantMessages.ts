import { useState, useEffect } from "react";
import { Message, TrainingData } from "../types";
import { useAssistantResponse } from "./useAssistantResponse";
import { useToast } from "@/hooks/use-toast";

export const useAssistantMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [trainingData, setTrainingData] = useState<TrainingData[]>([]);
  const [apiError, setApiError] = useState("");
  const { toast } = useToast();
  const { generateEnhancedResponse } = useAssistantResponse();

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("vendeai_assistant_history");
    const savedTrainingData = localStorage.getItem("vendeai_training_data");
    
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error("Error parsing saved messages:", error);
      }
    } else {
      // Add welcome message if no history exists
      const welcomeMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Olá! Sou a assistente VendeAI, como posso ajudar com suas vendas hoje?",
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      localStorage.setItem("vendeai_assistant_history", JSON.stringify([welcomeMessage]));
    }
    
    if (savedTrainingData) {
      try {
        setTrainingData(JSON.parse(savedTrainingData));
      } catch (error) {
        console.error("Error parsing saved training data:", error);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("vendeai_assistant_history", JSON.stringify(messages));
    }
  }, [messages]);

  // Add training data
  const addTrainingData = (question: string, answer: string) => {
    const newTrainingData: TrainingData = {
      question,
      answer,
      category: detectCategory(question)
    };
    
    const updatedTrainingData = [...trainingData, newTrainingData];
    setTrainingData(updatedTrainingData);
    localStorage.setItem("vendeai_training_data", JSON.stringify(updatedTrainingData));
  };
  
  // Detect category from question
  const detectCategory = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes("preço") || lowerQuestion.includes("plano") || lowerQuestion.includes("valor")) {
      return "preços";
    } else if (lowerQuestion.includes("funil") || lowerQuestion.includes("lead")) {
      return "funil de vendas";
    } else if (lowerQuestion.includes("script") || lowerQuestion.includes("texto")) {
      return "scripts";
    } else if (lowerQuestion.includes("estoque") || lowerQuestion.includes("produto")) {
      return "estoque";
    } else if (lowerQuestion.includes("pdv") || lowerQuestion.includes("ponto de venda")) {
      return "pdv";
    } else {
      return "geral";
    }
  };

  const handleSendMessage = async (useExternalAI: boolean, apiKey: string, externalModel: string, assistantMode: string) => {
    if (!input.trim()) return;

    // Add user message
    const category = detectCategory(input);
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
      context: category
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsTyping(true);
    setApiError("");

    // Generate assistant response with improved logic
    try {
      let aiResponse;
      
      if (useExternalAI && apiKey) {
        try {
          aiResponse = await generateOpenRouterResponse(input.trim(), messages, apiKey, externalModel);
        } catch (error) {
          console.error("Error with external AI:", error);
          toast({
            title: "Erro na API externa",
            description: "Não foi possível usar o modelo externo. Usando modelo interno como fallback.",
            variant: "destructive"
          });
          // Fallback to internal AI
          aiResponse = await generateEnhancedResponse(input.trim(), messages, trainingData);
        }
      } else {
        // Wait a bit to simulate thinking
        await new Promise(resolve => setTimeout(resolve, 1500));
        aiResponse = await generateEnhancedResponse(input.trim(), messages, trainingData);
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
        context: category
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      
      // Add to training data
      addTrainingData(input.trim(), aiResponse);
      
    } catch (error) {
      console.error("Error generating response:", error);
      toast({
        title: "Erro ao gerar resposta",
        description: "Não foi possível processar sua solicitação. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsTyping(false);
    }
  };

  const generateOpenRouterResponse = async (
    query: string,
    messageHistory: Message[],
    key: string,
    model: string
  ): Promise<string> => {
    if (!key) {
      throw new Error("API key is required");
    }

    // Format messages for OpenRouter API
    const formattedMessages = [
      {
        role: "system",
        content: "Você é a assistente VendeAI, uma IA especializada em automação de vendas e marketing. Responda em português do Brasil de forma profissional e persuasiva, fornecendo informações precisas sobre funcionalidades de automação de vendas, funis, scripts de vendas, chatbots e outras ferramentas de vendas."
      },
      // Convert last 10 messages from history to format expected by OpenRouter
      ...messageHistory.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: "user",
        content: query
      }
    ];

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${key}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "VendeAI Assistant"
        },
        body: JSON.stringify({
          model: model,
          messages: formattedMessages,
          temperature: 0.7,
          max_tokens: 1024
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenRouter API error:", errorData);
        setApiError(`Erro na API (${response.status}): ${errorData.error?.message || "Falha na requisição"}`);
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error calling OpenRouter:", error);
      setApiError(`Erro de conexão: ${error instanceof Error ? error.message : "Desconhecido"}`);
      throw error;
    }
  };

  const clearConversation = () => {
    // Keep only the welcome message
    const welcomeMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "Olá! Sou a assistente VendeAI, como posso ajudar com suas vendas hoje?",
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    localStorage.setItem("vendeai_assistant_history", JSON.stringify([welcomeMessage]));
    
    toast({
      title: "Conversa limpa",
      description: "Sua conversa com a assistente foi reiniciada."
    });
  };

  return {
    messages,
    input,
    setInput,
    isTyping,
    trainingData,
    apiError,
    handleSendMessage,
    clearConversation,
    detectCategory
  };
};
