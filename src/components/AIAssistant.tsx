
import { useState, useEffect, useRef } from "react";
import { Bot, User, Send, X, Trash2, ChevronRight, Info, Lightbulb, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

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
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("vendeai_assistant_history");
    const savedTrainingData = localStorage.getItem("vendeai_training_data");
    const savedStats = localStorage.getItem("vendeai_assistant_stats");
    
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

    // Generate assistant response with improved logic
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get information related to the user's query - improved to use training data
      let aiResponse = await generateEnhancedResponse(input.trim(), messages, trainingData);

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

  const generateEnhancedResponse = async (
    query: string, 
    history: Message[], 
    trainingSet: TrainingData[]
  ): Promise<string> => {
    const lowercaseQuery = query.toLowerCase();
    
    // 1. Check if we have training data that matches this query
    const matchingTrainingData = trainingSet.filter(item => 
      item.question.toLowerCase().includes(lowercaseQuery) || 
      lowercaseQuery.includes(item.question.toLowerCase())
    );
    
    if (matchingTrainingData.length > 0 && Math.random() > 0.3) { // 70% chance to use training data
      // Pick the best match
      const bestMatch = matchingTrainingData.sort((a, b) => 
        b.question.length - a.question.length // Prefer longer matches
      )[0];
      
      return bestMatch.answer;
    }
    
    // 2. Look for context in recent conversation (last 5 messages)
    const recentMessages = history.slice(-5);
    const hasAskedAbout = (topic: string) => 
      recentMessages.some(msg => 
        msg.role === "user" && msg.content.toLowerCase().includes(topic)
      );
    
    const hasRecentContext = (topic: string) =>
      recentMessages.some(msg => msg.context === topic);
    
    // 3. Generate contextual responses
    if (lowercaseQuery.includes("olá") || lowercaseQuery.includes("oi")) {
      if (history.length > 10) {
        return `Olá novamente! É bom ver você. Percebo que já conversamos algumas vezes. Como posso ajudar com suas vendas hoje?`;
      } else {
        return "Olá! Como posso ajudar você hoje com suas vendas?";
      }
    } else if (lowercaseQuery.includes("funil") || lowercaseQuery.includes("vendas")) {
      if (hasRecentContext("funil de vendas")) {
        return "Voltando ao tema de funis de vendas, posso oferecer diversas dicas para otimizar seu processo. Que parte específica do seu funil de vendas você gostaria de melhorar: prospecção, qualificação, negociação ou fechamento?";
      }
      return "Posso ajudar você a criar um funil de vendas otimizado. Basta ir à seção 'Funil com IA' no menu lateral e seguir as instruções para criar um funil personalizado para seu negócio. Nossa IA analisa seu mercado e público-alvo para recomendar as melhores etapas.";
    } else if (lowercaseQuery.includes("script") || lowercaseQuery.includes("texto")) {
      if (hasAskedAbout("exemplo")) {
        return "Aqui está um exemplo de script para primeiro contato: 'Olá [nome], percebi que sua empresa tem enfrentado desafios com [problema específico]. Ajudamos empresas como a sua a aumentar vendas em até 30% com nossa plataforma VendeAI. Teria 15 minutos para uma demonstração rápida de como podemos resolver esse problema específico?'";
      }
      return "Para gerar scripts de vendas automáticos, acesse a seção 'Scripts Automáticos'. Lá você pode criar textos persuasivos baseados no perfil do seu cliente e produto. Nossa IA analisa casos de sucesso do seu setor para criar argumentos convincentes e respostas para objeções comuns.";
    } else if (lowercaseQuery.includes("chatbot") || lowercaseQuery.includes("atendimento")) {
      return "O VendeAI possui um chatbot avançado para atendimento que pode ser configurado na seção 'Chatbot IA'. Ele aprende com as interações e se torna cada vez mais eficiente. Você pode treinar o bot com respostas para perguntas frequentes e definir fluxos de conversação para qualificação de leads.";
    } else if (lowercaseQuery.includes("plano") || lowercaseQuery.includes("preço")) {
      if (hasAskedAbout("diferença")) {
        return "A principal diferença entre os planos é que o Premium oferece recursos ilimitados de scripts e mensagens, enquanto o Profissional tem limites mensais. Além disso, o Premium inclui atendimento prioritário e acesso antecipado a novos recursos da plataforma.";
      }
      return "Temos três planos: Gratuito (R$0), Profissional (R$97/mês) e Premium (R$197/mês). Cada um oferece diferentes recursos. O plano gratuito permite experimentar as funcionalidades básicas, o Profissional é ideal para empreendedores e pequenos negócios, e o Premium para empresas que precisam de recursos avançados e sem limitações.";
    } else if (lowercaseQuery.includes("upgrade") || lowercaseQuery.includes("premium")) {
      return "Para fazer upgrade do seu plano, vá até 'Configurações > Planos e Faturamento'. Lá você pode comparar os recursos e escolher o plano ideal para o seu negócio. O processo leva menos de 2 minutos e você terá acesso imediato aos novos recursos. Temos uma garantia de satisfação de 7 dias para novos assinantes.";
    } else if (lowercaseQuery.includes("funcionalidade") || lowercaseQuery.includes("recursos")) {
      return "O VendeAI oferece: criação de funis de vendas com IA, geração de scripts automáticos, chatbot inteligente, controle de estoque, PDV integrado e extensão para navegador. Cada recurso é projetado para aumentar sua taxa de conversão e automatizar partes do processo de vendas. Qual desses recursos gostaria de saber mais?";
    } else if (hasAskedAbout("funcionalidade") && (lowercaseQuery.includes("mais") || lowercaseQuery.includes("outro"))) {
      return "Além dos recursos mencionados, também oferecemos análise de dados de vendas com insights acionáveis, integração com plataformas populares como Shopify e WooCommerce, e suporte dedicado para ajudar você a maximizar suas vendas. Nossa plataforma utiliza IA para identificar oportunidades de up-selling e cross-selling que você pode estar perdendo.";
    } else if (lowercaseQuery.includes("ajuda") || lowercaseQuery.includes("dúvida")) {
      return "Estou aqui para ajudar! Você pode me perguntar sobre como usar qualquer funcionalidade do VendeAI, detalhes sobre planos, ou solicitar dicas para aumentar suas vendas. Para melhor atendimento, tente descrever seu problema ou dúvida específica, e posso oferecer orientações personalizadas ou direcionar você para os tutoriais apropriados.";
    } else {
      // Contextual awareness based on message history and user behavior
      const userMessageCount = history.filter(msg => msg.role === "user").length;
      
      // Personalize for new vs returning users
      let personalization = "";
      if (userMessageCount > 15) {
        personalization = "Como usuário frequente do VendeAI, ";
      } else if (userMessageCount > 5) {
        personalization = "Vejo que já está familiarizado com nossa plataforma. ";
      }
      
      return `${personalization}Entendi sua pergunta sobre "${query}". Como assistente avançado do VendeAI, posso ajudar com estratégias de vendas personalizadas, criação de funis otimizados, scripts persuasivos, configuração de chatbot e outras funcionalidades da plataforma. Com base em sua consulta, recomendo explorar a seção ${detectCategory(query)} da plataforma. Poderia elaborar um pouco mais sobre o que precisa especificamente?`;
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

  return (
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
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-vendeai-gold/20 hover:bg-vendeai-gold/10 text-gray-400 hover:text-vendeai-gold flex gap-2"
                onClick={clearConversation}
              >
                <Trash2 className="h-4 w-4" />
                Limpar conversa
              </Button>
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
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
                <Bot className="h-3 w-3" />
                <span>Modelo: VendeAI Assistant {assistantMode === "advanced" ? "2.0" : "1.0"}</span>
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
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AIAssistant;
