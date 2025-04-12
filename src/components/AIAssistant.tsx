import { useState, useEffect, useRef } from "react";
import { Bot, User, Send, X, Trash2, ChevronRight, Info, Lightbulb, Key, AlertTriangle } from "lucide-react";
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

// API key for DeepSeek integration via OpenRouter
const API_KEY = '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';
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
export const AIAssistant = ({
  open,
  onOpenChange
}: AIAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(API_KEY);
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
  const [apiError, setApiError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const {
    toast
  } = useToast();

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("vendeai_assistant_history");
    const savedApiKey = localStorage.getItem("vendeai_api_key");
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error("Error parsing saved messages:", error);
      }
    }
    if (savedApiKey) {
      setApiKey(savedApiKey);
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
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
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
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput("");
    setIsLoading(true);
    setApiError("");
    try {
      // Make request to DeepSeek API via OpenRouter
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'VendeAI Assistant'
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-chat:free',
          messages: [{
            role: 'system',
            content: 'Você é a assistente VendeAI, uma IA especializada em automação de vendas e marketing. Responda em português do Brasil de forma profissional e persuasiva, fornecendo informações precisas sobre funcionalidades de automação de vendas, funis, scripts de vendas, chatbots e outras ferramentas de vendas.'
          }, ...messages.slice(-5).map(msg => ({
            role: msg.role,
            content: msg.content
          })), {
            role: 'user',
            content: input.trim()
          }]
        })
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
        timestamp: new Date()
      };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      setApiError(error instanceof Error ? error.message : "Erro desconhecido ao processar a solicitação");

      // Add error message to conversation
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Desculpe, tive um problema ao processar sua solicitação. Por favor, tente novamente em alguns momentos.",
        timestamp: new Date()
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
      toast({
        title: "Erro ao gerar resposta",
        description: "Não foi possível processar sua solicitação. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const clearConversation = () => {
    setMessages([]);
    localStorage.removeItem("vendeai_assistant_history");
    toast({
      title: "Conversa limpa",
      description: "Sua conversa com a assistente foi reiniciada."
    });
  };
  const saveApiKey = () => {
    localStorage.setItem("vendeai_api_key", apiKey);
    toast({
      title: "Configurações salvas",
      description: "Sua chave API foi salva com sucesso."
    });
    setIsApiKeyDialogOpen(false);
  };
  return <>
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
                      Inteligência artificial para suas vendas
                    </DialogDescription>
                  </div>
                </div>
                
                <TabsList className="bg-vendeai-gold/10">
                  <TabsTrigger value="chat" className="data-[state=active]:bg-vendeai-gold data-[state=active]:text-black text-gray-400">
                    Chat
                  </TabsTrigger>
                  <TabsTrigger value="info" className="data-[state=active]:bg-vendeai-gold data-[state=active]:text-black text-gray-400">
                    Info
                  </TabsTrigger>
                </TabsList>
              </div>
            </DialogHeader>
            
            <TabsContent value="chat" className="mt-0 flex flex-col">
              <div className="p-2">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="w-full border-vendeai-gold/20 hover:bg-vendeai-gold/10 text-gray-400 hover:text-vendeai-gold flex gap-2" onClick={clearConversation}>
                    <Trash2 className="h-4 w-4" />
                    Limpar conversa
                  </Button>
                  
                  
                </div>
              </div>
              
              <ScrollArea className="p-6 pt-2 h-[350px]">
                <div className="flex flex-col gap-4">
                  {messages.map(message => <div key={message.id} className={`flex gap-3 ${message.role === "assistant" ? "items-start" : "items-start justify-end"}`}>
                      {message.role === "assistant" && <div className="bg-vendeai-gold/20 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Bot className="h-4 w-4 text-vendeai-gold" />
                        </div>}
                      
                      <div className={`rounded-lg p-3 max-w-[85%] ${message.role === "assistant" ? "bg-vendeai-gray/10 text-white" : "bg-vendeai-gold/10 text-white"}`}>
                        <p className="text-sm">{message.content}</p>
                        <div className="mt-1 text-xs text-gray-400 flex items-center gap-1">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                      
                      {message.role === "user" && <div className="bg-vendeai-gold h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <User className="h-4 w-4 text-black" />
                        </div>}
                    </div>)}
                  
                  {isLoading && <div className="flex items-start gap-3">
                      <div className="bg-vendeai-gold/20 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot className="h-4 w-4 text-vendeai-gold" />
                      </div>
                      <div className="rounded-lg p-3 max-w-[85%] bg-vendeai-gray/10 text-white">
                        <div className="flex space-x-1 items-center">
                          <div className="h-2 w-2 bg-vendeai-gold/50 rounded-full animate-bounce" style={{
                        animationDelay: "0ms"
                      }}></div>
                          <div className="h-2 w-2 bg-vendeai-gold/50 rounded-full animate-bounce" style={{
                        animationDelay: "300ms"
                      }}></div>
                          <div className="h-2 w-2 bg-vendeai-gold/50 rounded-full animate-bounce" style={{
                        animationDelay: "600ms"
                      }}></div>
                        </div>
                      </div>
                    </div>}
                  
                  {apiError && <div className="flex items-start gap-3">
                      <div className="bg-red-500/20 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="rounded-lg p-3 max-w-[85%] bg-red-500/10 text-white">
                        <p className="text-sm">{apiError}</p>
                      </div>
                    </div>}
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              <Separator className="border-vendeai-gold/10" />
              
              <div className="p-4">
                <div className="relative">
                  <Textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Digite sua mensagem..." className="resize-none pr-12 bg-black text-white border-vendeai-gold/20 focus-visible:ring-vendeai-gold/40" rows={2} disabled={isLoading} />
                  <Button size="icon" className="absolute right-2 bottom-2 h-8 w-8 gradient-gold text-black" onClick={handleSendMessage} disabled={!input.trim() || isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
                  <Bot className="h-3 w-3" />
                  <span>VendeAI v1.0</span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="info" className="mt-0">
              <ScrollArea className="p-6 h-[400px]">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white text-lg font-medium mb-2 flex items-center">
                      <Lightbulb className="h-5 w-5 mr-2 text-vendeai-gold" />
                      Sobre o Assistente
                    </h3>
                    <p className="text-gray-400 mb-4">
                      O assistente VendeAI utiliza o modelo DeepSeek para gerar respostas em tempo real para suas perguntas sobre vendas, marketing e automação.
                    </p>
                    
                    <div className="bg-vendeai-gold/10 rounded-lg p-4 border border-vendeai-gold/20">
                      <h4 className="text-white font-medium mb-2">Como usar</h4>
                      <p className="text-gray-400 mb-2">
                        Digite suas perguntas no campo de mensagem e pressione Enter ou clique no botão de enviar.
                      </p>
                      <p className="text-gray-400">
                        O assistente pode ajudar com:
                      </p>
                      <ul className="text-gray-400 list-disc pl-5 mt-2 space-y-1">
                        <li>Estratégias de vendas</li>
                        <li>Automação de marketing</li>
                        <li>Geração de scripts de vendas</li>
                        <li>Dicas para melhorar conversões</li>
                        <li>Otimização de funis de vendas</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-white text-lg font-medium mb-2">Modelo</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400">
                        Utilizando DeepSeek Chat via OpenRouter
                      </p>
                      <Button variant="outline" size="sm" className="text-vendeai-gold border-vendeai-gold/30 hover:bg-vendeai-gold/10" onClick={() => setIsApiKeyDialogOpen(true)}>
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
              Configure a chave API usada pelo assistente VendeAI
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key" className="text-white">OpenRouter API Key</Label>
              <Input id="api-key" value={apiKey} onChange={e => setApiKey(e.target.value)} type="password" placeholder="sk-or-v1-..." className="bg-black text-white border-vendeai-gold/20" />
              <p className="text-xs text-gray-400">
                Sua chave API é armazenada apenas no seu navegador e nunca é enviada para nossos servidores.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApiKeyDialogOpen(false)} className="text-vendeai-gold border-vendeai-gold/30 hover:bg-vendeai-gold/10">
              Cancelar
            </Button>
            <Button onClick={saveApiKey} className="gradient-gold text-black">
              Salvar configurações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>;
};
export default AIAssistant;