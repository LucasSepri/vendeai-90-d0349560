
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface ApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  useExternalAI: boolean;
  setUseExternalAI: (use: boolean) => void;
  externalModel: string;
  setExternalModel: (model: string) => void;
  saveApiKey: () => void;
}

export const ApiKeyDialog = ({ 
  open, 
  onOpenChange, 
  apiKey, 
  setApiKey, 
  useExternalAI, 
  setUseExternalAI, 
  externalModel, 
  setExternalModel, 
  saveApiKey 
}: ApiKeyDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                  <option value="deepseek-v3-open-instruct">DeepSeek V3 (Recomendado)</option>
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
            onClick={() => onOpenChange(false)}
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
  );
};
