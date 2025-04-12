
import { useRef, useEffect } from "react";
import { Send, Bot, Sparkles, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface AssistantInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSendMessage: () => void;
  isTyping: boolean;
  assistantMode: "standard" | "advanced";
  setAssistantMode: (mode: "standard" | "advanced") => void;
  useExternalAI: boolean;
  externalModel: string;
  open: boolean;
}

export const AssistantInput = ({ 
  input, 
  setInput, 
  handleSendMessage, 
  isTyping, 
  assistantMode, 
  setAssistantMode,
  useExternalAI,
  externalModel,
  open
}: AssistantInputProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
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
          <span>
            Modelo: {useExternalAI ? (
              <span className="text-vendeai-gold">{externalModel} (OpenRouter)</span>
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
    </>
  );
};
