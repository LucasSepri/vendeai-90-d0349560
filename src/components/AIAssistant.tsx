import { useState, useEffect, useRef } from "react";
import { Bot, User, Send, X, Trash2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIAssistantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AIAssistant = ({ open, onOpenChange }: AIAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("vendeai_assistant_history");
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
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("vendeai_assistant_history", JSON.stringify(messages));
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

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsTyping(true);

    // Generate assistant response (simulated with setTimeout for demo)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get information related to the user's query - this would be replaced with actual AI processing
      let aiResponse = await generateResponse(input.trim(), messages);

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
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

  const generateResponse = async (query: string, history: Message[]): Promise<string> => {
    // This would be replaced with actual AI logic that learns from past interactions
    // For now, we'll use simple pattern matching
    
    const lowercaseQuery = query.toLowerCase();
    
    // Simple context awareness from message history
    const hasAskedAboutFeatures = history.some(msg => 
      msg.role === "user" && msg.content.toLowerCase().includes("funcionalidade"));
    
    if (lowercaseQuery.includes("olá") || lowercaseQuery.includes("oi")) {
      return "Olá! Como posso ajudar você hoje com suas vendas?";
    } else if (lowercaseQuery.includes("funil") || lowercaseQuery.includes("vendas")) {
      return "Posso ajudar você a criar um funil de vendas otimizado. Basta ir à seção 'Funil com IA' no menu lateral e seguir as instruções para criar um funil personalizado para seu negócio.";
    } else if (lowercaseQuery.includes("script") || lowercaseQuery.includes("texto")) {
      return "Para gerar scripts de vendas automáticos, acesse a seção 'Scripts Automáticos'. Lá você pode criar textos persuasivos baseados no perfil do seu cliente e produto.";
    } else if (lowercaseQuery.includes("chatbot") || lowercaseQuery.includes("atendimento")) {
      return "O VendeAI possui um chatbot avançado para atendimento que pode ser configurado na seção 'Chatbot IA'. Ele aprende com as interações e se torna cada vez mais eficiente.";
    } else if (lowercaseQuery.includes("plano") || lowercaseQuery.includes("preço")) {
      return "Temos três planos: Gratuito (R$0), Profissional (R$97/mês) e Premium (R$197/mês). Cada um oferece diferentes recursos. Para mais detalhes, acesse a seção 'Planos' no site principal.";
    } else if (lowercaseQuery.includes("upgrade") || lowercaseQuery.includes("premium")) {
      return "Para fazer upgrade do seu plano, vá até 'Configurações > Planos e Faturamento'. Lá você pode comparar os recursos e escolher o plano ideal para o seu negócio.";
    } else if (lowercaseQuery.includes("funcionalidade") || lowercaseQuery.includes("recursos")) {
      return "O VendeAI oferece: criação de funis de vendas com IA, geração de scripts automáticos, chatbot inteligente, controle de estoque, PDV integrado e extensão para navegador. Qual desses recursos gostaria de saber mais?";
    } else if (hasAskedAboutFeatures && (lowercaseQuery.includes("mais") || lowercaseQuery.includes("outro"))) {
      return "Além dos recursos mencionados, também oferecemos análise de dados de vendas, integração com plataformas populares como Shopify e WooCommerce, e suporte dedicado para ajudar você a maximizar suas vendas.";
    } else if (lowercaseQuery.includes("ajuda") || lowercaseQuery.includes("dúvida")) {
      return "Estou aqui para ajudar! Você pode me perguntar sobre como usar qualquer funcionalidade do VendeAI, detalhes sobre planos, ou solicitar dicas para aumentar suas vendas.";
    } else {
      return "Entendi sua pergunta sobre \"" + query + "\". Como assistente de IA do VendeAI, posso ajudar com estratégias de vendas, criação de funis, scripts, configuração de chatbot e outras funcionalidades da plataforma. Poderia elaborar um pouco mais sobre o que precisa?";
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
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-black border border-vendeai-gold/20">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center gap-2">
            <div className="bg-vendeai-gold/20 p-2 rounded-full">
              <Bot className="h-5 w-5 text-vendeai-gold" />
            </div>
            <div>
              <DialogTitle className="text-white">Assistente VendeAI</DialogTitle>
              <DialogDescription className="text-gray-400">
                Inteligência artificial para impulsionar suas vendas
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
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
                  <div className="mt-1 text-xs text-gray-400">
                    {new Date(message.timestamp).toLocaleTimeString()}
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
            Modelo: VendeAI Assistant 1.0
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIAssistant;
