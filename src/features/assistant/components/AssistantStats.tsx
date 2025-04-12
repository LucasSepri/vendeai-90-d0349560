
import { Lightbulb } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { AIStats } from "../types";

interface AssistantStatsProps {
  stats: AIStats;
  trainingData: any[];
  useExternalAI: boolean;
  externalModel: string;
  setIsApiKeyDialogOpen: (open: boolean) => void;
}

export const AssistantStats = ({ 
  stats, 
  trainingData, 
  useExternalAI, 
  externalModel,
  setIsApiKeyDialogOpen
}: AssistantStatsProps) => {
  return (
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
  );
};
