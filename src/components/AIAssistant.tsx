
import { useState, useEffect } from "react";
import { Bot, Trash2, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Importação dos hooks e componentes refatorados
import { useAssistantMessages } from "@/features/assistant/hooks/useAssistantMessages";
import { useAssistantStats } from "@/features/assistant/hooks/useAssistantStats";
import { AssistantMessages } from "@/features/assistant/components/AssistantMessages";
import { AssistantInput } from "@/features/assistant/components/AssistantInput";
import { AssistantStats } from "@/features/assistant/components/AssistantStats";
import { ApiKeyDialog } from "@/features/assistant/components/ApiKeyDialog";

interface AIAssistantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AIAssistant = ({ open, onOpenChange }: AIAssistantProps) => {
  const [assistantMode, setAssistantMode] = useState<"standard" | "advanced">("standard");
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [useExternalAI, setUseExternalAI] = useState(false);
  const [externalModel, setExternalModel] = useState("deepseek-v3-open-instruct");
  
  const { toast } = useToast();
  const { 
    messages, 
    input, 
    setInput, 
    isTyping, 
    trainingData, 
    apiError, 
    handleSendMessage: sendMessage, 
    clearConversation 
  } = useAssistantMessages();
  
  const { stats, updateStats } = useAssistantStats();

  // Atualizar estatísticas quando as mensagens mudam
  useEffect(() => {
    if (messages.length > 0) {
      updateStats(messages);
    }
  }, [messages, updateStats]);

  // Carregar configurações da API do localStorage
  useEffect(() => {
    const savedApiKey = localStorage.getItem("vendeai_api_key");
    const savedUseExternalAI = localStorage.getItem("vendeai_use_external_ai");
    const savedExternalModel = localStorage.getItem("vendeai_external_model");
    
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

  const handleSendMessage = () => {
    sendMessage(useExternalAI, apiKey, externalModel, assistantMode);
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
              
              <AssistantMessages 
                messages={messages} 
                isTyping={isTyping} 
                apiError={apiError} 
              />
              
              <AssistantInput 
                input={input}
                setInput={setInput}
                handleSendMessage={handleSendMessage}
                isTyping={isTyping}
                assistantMode={assistantMode}
                setAssistantMode={setAssistantMode}
                useExternalAI={useExternalAI}
                externalModel={externalModel}
                open={open}
              />
            </TabsContent>
            
            <TabsContent value="stats" className="mt-0">
              <AssistantStats 
                stats={stats}
                trainingData={trainingData}
                useExternalAI={useExternalAI}
                externalModel={externalModel}
                setIsApiKeyDialogOpen={setIsApiKeyDialogOpen}
              />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      
      <ApiKeyDialog 
        open={isApiKeyDialogOpen}
        onOpenChange={setIsApiKeyDialogOpen}
        apiKey={apiKey}
        setApiKey={setApiKey}
        useExternalAI={useExternalAI}
        setUseExternalAI={setUseExternalAI}
        externalModel={externalModel}
        setExternalModel={setExternalModel}
        saveApiKey={saveApiKey}
      />
    </>
  );
};

export default AIAssistant;
