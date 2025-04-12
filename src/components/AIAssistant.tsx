import { useState, useEffect, useRef } from "react";
import { Bot, User, Send, X, Trash2, ChevronRight, Info, Lightbulb, Sparkles, Key, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";

// API key for OpenRouter integration
const API_KEY = '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';

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  context?: string; // Track what context the message was related to
}

interface AIStats {
  messagesCount: number;
  topTopics: string[];
  lastInteraction: Date | null;
  helpfulResponses: number;
}

interface TrainingData {
  question: string;
  answer: string;
  category: string;
}

interface AIAssistantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AIAssistant = ({ open, onOpenChange }: AIAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [trainingData, setTrainingData] = useState<TrainingData[]>([]);
  const [assistantMode, setAssistantMode] = useState<"standard" | "advanced">("standard");
  const [stats, setStats] = useState<AIStats>({
    messagesCount: 0,
    topTopics: [],
    lastInteraction: null,
    helpfulResponses: 0
  });
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
  const [apiKey, setApiKey] = useState(API_KEY);
  const [useExternalAI, setUseExternalAI] = useState(true);
  const [externalModel, setExternalModel] = useState("deepseek/deepseek-chat:free");
  const [apiError, setApiError] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("vendeai_assistant_history");
    const savedTrainingData = localStorage.getItem("vendeai_training_data");
    const savedStats = localStorage.getItem("vendeai_assistant_stats");
    const savedApiKey = localStorage.getItem("vendeai_api_key");
    const savedUseExternalAI = localStorage.getItem("vendeai_use_external_ai");
    const savedExternalModel = localStorage.getItem("vendeai_external_model");
    
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
    
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (error) {
        console.error("Error parsing saved stats:", error);
        // Initialize with default stats
        updateStats([]);
      }
    } else {
      // Initialize stats based on existing messages
      updateStats(savedMessages ? JSON.parse(savedMessages) : []);
    }

    if (savedApiKey) {
      setApiKey(savedApiKey);
    }

    if (savedUseExternalAI) {
      setUseExternalAI(JSON.parse(savedUseExternalAI));
    }

    if (savedExternalModel) {
      setExternalModel(savedExternalModel);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("vendeai_assistant_history", JSON.stringify(messages));
      updateStats(messages);
    }
  }, [messages]);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input field when dialog opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);
  
  // Update assistant stats
  const updateStats = (currentMessages: Message[]) => {
    // Count messages
    const userMessages = currentMessages.filter(msg => msg.role === "user");
    
    // Track topics from context field
    const topics = userMessages
      .map(msg => msg.context || "geral")
      .reduce((acc: Record<string, number>, topic) => {
        acc[topic] = (acc[topic] || 0) + 1;
        return acc;
      }, {});
    
    // Get top 3 topics
    const topTopics = Object.entries(topics)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([topic]) => topic);
      
    // Last interaction time
    const lastMessage = currentMessages[currentMessages.length - 1];
    const lastInteraction = lastMessage ? new Date(lastMessage.timestamp) : null;
    
    // Helpful responses (simplified for demo - could be based on user feedback)
    const helpfulResponses = Math.floor(userMessages.length * 0.8); // Assume 80% were helpful
    
    const newStats: AIStats = {
      messagesCount: userMessages.length,
      topTopics,
      lastInteraction,
      helpfulResponses
    };
    
    setStats(newStats);
    localStorage.setItem("vendeai_assistant_stats", JSON.stringify(newStats));
  };

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

  const handleSendMessage = async () => {
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

    try {
      // Use the DeepSeek API directly
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'VendeAI Assistant'
        },
        body: JSON.stringify({
          model: externalModel,
          messages: [
            {
              role: 'system',
              content: 'Você é a assistente VendeAI, uma IA especializada em automação de vendas e marketing. Responda em português do Brasil de forma profissional e persuasiva, fornecendo informações precisas sobre funcionalidades de automação de vendas, funis, scripts de vendas, chatbots e outras ferramentas de vendas.'
            },
            ...messages.slice(-5).map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            { role: 'user', content: input.trim() }
          ]
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error:", errorData);
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

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
      setApiError(error instanceof Error ? error.message : "Erro desconhecido ao processar a solicitação");
      
      // Add error message to conversation
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Desculpe, tive um problema ao processar sua solicitação. Por favor, tente novamente em alguns momentos.",
        timestamp: new Date(),
        context: category
      };
      
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      
      toast({
        title: "Erro ao gerar resposta",
        description: "Não foi possível processar sua solicitação. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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

  const saveApiKey = () => {
    localStorage.setItem("vendeai_api_key", apiKey);
    localStorage.setItem("vendeai_use_external_ai", JSON.stringify(useExternalAI));
    localStorage.setItem("vendeai_external_model", externalModel);
    
    toast({
      title: "Configurações salvas",
      description: useExternalAI 
        ? "O assistente agora usará o modelo externo para respostas." 
        : "O assistente usará o modelo interno para respostas."
    });
    
    setIsApiKeyDialogOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-black border border-vendeai-gold/20">
          <Tabs defaultValue="chat" className="w-full">
            <DialogHeader className="p-6 pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-vendeai-gold/20 p-2 rounded-full">
                    <Bot className="h-5 w-5 text-vendeai-gold" />
                  </div>
                  <div>
                    <DialogTitle className="text-white">Assistente VendeAI</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Inteligência artificial avançada para suas vendas
                    </DialogDescription>
                  </div>
                </div>
                
                <TabsList className="bg-vendeai-gold/10">
                  <TabsTrigger value="chat" className="data-[state=active]:bg-vendeai-gold data-[state=active]:text-black text-gray-400">
                    Chat
                  </TabsTrigger>
                  <TabsTrigger value="stats" className="data-[state=active]:bg-vendeai-gold data-[state=active]:text-black text-gray-400">
                    Estatísticas
                  </TabsTrigger>
                </TabsList>
              </div>
            </DialogHeader>
            
            <TabsContent value="chat" className="mt-0 flex flex-col">
              <div className="p-2">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-vendeai-gold/20 hover:bg-vendeai-gold/10 text-gray-400 hover:text-vendeai-gold flex gap-2"
                    onClick={clearConversation}
                  >
                    <Trash2 className="h-4 w-4" />
                    Limpar conversa
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-vendeai-gold/20 hover:bg-vendeai-gold/10 text-gray-400 hover:text-vendeai-gold flex gap-2"
                    onClick={() => setIsApiKeyDialogOpen(true)}
                  >
                    <Key className="h-4 w-4" />
                    Config
                  </Button>
                </div>
              </div>
              
              <ScrollArea className="p-6 pt-2 h-[350px]">
                <div className="flex flex-col gap-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.role === "assistant" ? "items-start" : "items-start justify-end"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="bg-vendeai-gold/20 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Bot className="h-4 w-4 text-vendeai-gold" />
                        </div>
                      )}
                      
                      <div
                        className={`rounded-lg p-3 max-w-[85%] ${
                          message.role === "assistant"
                            ? "bg-vendeai-gray/10 text-white"
                            : "bg-vendeai-gold/10 text-white"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className="mt-1 text-xs text-gray-400 flex items-center gap-1">
                          {new Date(message.timestamp).toLocaleTimeString()}
                          {message.context && (
                            <span className="ml-2 bg-vendeai-gold/10 px-1.5 py-0.5 rounded-full text-xs">
                              {message.context}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {message.role === "user" && (
                        <div className="bg-vendeai-gold h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <User className="h-4 w-4 text-black" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex items-start gap-3">
                      <div className="bg-vendeai-gold/20 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot className="h-4 w-4 text-vendeai-gold" />
                      </div>
                      <div className="rounded-lg p-3 max-w-[85%] bg-vendeai-gray/10 text-white">
                        <div className="flex space-x-1 items-center">
                          <div className="h-2 w-2 bg-vendeai-gold/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                          <div className="h-2 w-2 bg-vendeai-gold/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                          <div className="h-2 w-2 bg-vendeai-gold/50 rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {apiError && (
                    <div className="flex items-start gap-3">
                      <div className="bg-red-500/20 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="rounded-lg p-3 max-w-[85%] bg-red-500/10 text-white">
                        <p className="text-sm">{apiError}</p>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              <Separator className="border-vendeai-gold/10" />
              
              <div className="p-4">
                <div className="relative">
                  <Textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Digite sua mensagem..."
                    className="resize-none pr-12 bg-black text-white border-vendeai-gold/20 focus-visible:ring-vendeai-gold/40"
                    rows={2}
                    disabled={isTyping}
                  />
                  <Button
                    size="icon"
                    className="absolute right-2 bottom-2 h-8 w-8 gradient-gold text-black"
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isTyping}
                  >
                    {isTyping ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
                  <Bot className="h-3 w-3" />
                  <span>
                    Modelo: {useExternalAI ? (
                      <span className="text-vendeai-gold">{externalModel}</span>
                    ) : (
                      <span>VendeAI Assistant {assistantMode === "advanced" ? "2.0" : "1.0"}</span>
                    )}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-auto h-6 px-2 text-vendeai-gold hover:bg-vendeai-gold/10"
                    onClick={() => setAssistantMode(assistantMode === "standard" ? "advanced" : "standard")}
                  >
                    {assistantMode === "standard" ? (
                      <><Sparkles className="h-3 w-3 mr-1" /> Ativar modo avançado</>
                    ) : (
                      <><Info className="h-3 w-3 mr-1" /> Voltar ao modo padrão</>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="stats" className="mt-0">
              <ScrollArea className="p-6 h-[400px]">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white text-lg font-medium mb-2 flex items-center">
                      <Lightbulb className="h-5 w-5 mr-2 text-vendeai-gold" />
                      Estatísticas de Aprendizado
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-vendeai-gold/10 rounded-lg p-4 border border-vendeai-gold/20">
                        <p className="text-gray-400 text-sm">Total de Interações</p>
                        <p className="text-white text-2xl font-bold">{stats.messagesCount}</p>
                      </div>
                      <div className="bg-vendeai-gold/10 rounded-lg p-4 border border-vendeai-gold/20">
                        <p className="text-gray-400 text-sm">Respostas Úteis</p>
                        <p className="text-white text-2xl font-bold">{stats.helpfulResponses}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-white text-lg font-medium mb-2">Principais Tópicos</h3>
                    <div className="space-y-2">
                      {stats.topTopics.length > 0 ? (
                        stats.topTopics.map((topic, index) => (
                          <div key={index} className="bg-vendeai-gold/10 rounded-lg p-3 border border-vendeai-gold/20">
                            <p className="text-white capitalize">{topic}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400">Nenhum tópico registrado ainda</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-white text-lg font-medium mb-2">Dados de Treinamento</h3>
                    <p className="text-gray-400 mb-2">
                      O assistente aprendeu com {trainingData.length} interações
                    </p>
                    
                    <div className="bg-vendeai-gold/10 rounded-lg p-4 border border-vendeai-gold/20">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">Categorias de Conhecimento</h4>
                      </div>
                      
                      <div className="space-y-2">
                        {/* Count training data by category */}
                        {Object.entries(
                          trainingData.reduce((acc: Record<string, number>, item) => {
                            acc[item.category] = (acc[item.category] || 0) + 1;
                            return acc;
                          }, {})
                        ).map(([category, count]) => (
                          <div key={category} className="flex items-center justify-between">
                            <span className="text-gray-400 capitalize">{category}</span>
                            <div className="flex items-center">
                              <span className="text-vendeai-gold font-medium">{count}</span>
                              <span className="text-gray-500 ml-1">itens</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-white text-lg font-medium mb-2">Última Interação</h3>
                    <p className="text-gray-400">
                      {stats.lastInteraction 
                        ? new Date(stats.lastInteraction).toLocaleString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : "Nenhuma interação registrada"}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-white text-lg font-medium mb-2">Modelo de IA</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400">
                        {useExternalAI 
                          ? `Usando modelo externo: ${externalModel}`
                          : "Usando modelo interno do VendeAI"}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-vendeai-gold border-vendeai-gold/30 hover:bg-vendeai-gold/10"
                        onClick={() => setIsApiKeyDialogOpen(true)}
                      >
                        Configurar
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isApiKeyDialogOpen} onOpenChange={setIsApiKeyDialogOpen}>
        <DialogContent className="bg-black border border-vendeai-gold/20">
          <DialogHeader>
            <DialogTitle className="text-white">Configurações do Assistente</DialogTitle>
            <DialogDescription className="text-gray-400">
              Configure o modelo de IA usado pelo assistente VendeAI
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="use-external-ai" className="text-white">Usar modelo externo</Label>
              <Switch
                id="use-external-ai"
                checked={useExternalAI}
                onCheckedChange={setUseExternalAI}
                className="data-[state=checked]:bg-vendeai-gold"
              />
            </div>
            
            {useExternalAI && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="api-key" className="text-white">OpenRouter API Key</Label>
                  <Input
                    id="api-key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    type="password"
                    placeholder="sk-or-v1-..."
                    className="bg-black text-white border-vendeai-gold/20"
                  />
                  <p className="text-xs text-gray-400">
                    Sua chave API é armazenada apenas no seu navegador e nunca é enviada para nossos servidores.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="model-select" className="text-white">Modelo</Label>
                  <select
                    id="model-select"
                    value={externalModel}
                    onChange={(e) => setExternalModel(e.target.value)}
                    className="w-full bg-black text-white border border-vendeai-gold/20 rounded-md p-2"
                  >
                    <option value="deepseek/deepseek-chat:free">DeepSeek Chat</option>
                    <option value="meta-llama/llama-3-70b-instruct">Meta Llama 3 70B</option>
                    <option value="anthropic/claude-3-opus:beta">Claude 3 Opus</option>
                    <option value="anthropic/claude-3-sonnet:beta">Claude 3 Sonnet</option>
                    <option value="mistralai/mistral-medium">Mistral Medium</option>
                  </select>
                  <p className="text-xs text-gray-400">
                    Certos modelos podem ter custos por uso através da OpenRouter.
                  </p>
                </div>
              </>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsApiKeyDialogOpen(false)}
              className="text-vendeai-gold border-vendeai-gold/30 hover:bg-vendeai-gold/10"
            >
              Cancelar
            </Button>
            <Button 
              onClick={saveApiKey}
              className="gradient-gold text-black"
            >
              Salvar configurações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIAssistant;
