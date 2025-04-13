
import { useState, useRef } from "react";
import { ChevronLeft, Save, Eye, Settings, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Template, DragElement } from "../types";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface VisualEditorSectionProps {
  template: Template;
  onClose?: () => void;
}

export function VisualEditorSection({ template, onClose }: VisualEditorSectionProps) {
  const { toast } = useToast();
  const [elements, setElements] = useState<DragElement[]>([]);
  const [activeView, setActiveView] = useState("desktop");
  const [selectedElement, setSelectedElement] = useState<DragElement | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const elementType = e.dataTransfer.getData("elementType");
    if (!elementType) return;

    const newElement: DragElement = {
      id: `element-${Date.now()}`,
      type: elementType as any,
      content: getDefaultContent(elementType as any)
    };

    setElements((prev) => [...prev, newElement]);
    toast({
      title: "Elemento adicionado",
      description: `Um elemento ${elementType} foi adicionado ao editor.`
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const getDefaultContent = (type: string): string => {
    switch (type) {
      case "text":
        return "Clique para editar este texto";
      case "button":
        return "Botão";
      case "image":
        return "https://placehold.co/600x400/333/FFF?text=Imagem";
      default:
        return "";
    }
  };

  const handleSave = () => {
    toast({
      title: "Template salvo",
      description: "As alterações foram salvas com sucesso.",
    });
  };

  const handlePreview = () => {
    toast({
      title: "Visualizando template",
      description: "Abrindo visualização do template."
    });
  };

  const handleElementSelect = (element: DragElement) => {
    setSelectedElement(element);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Editor Visual</h1>
          <p className="text-vendeai-lightgray">Editando: {template.name}</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="border-vendeai-gold/50 text-vendeai-gold hover:bg-vendeai-gold/10"
            onClick={handlePreview}
          >
            <Eye className="h-4 w-4 mr-2" />
            Visualizar
          </Button>
          <Button className="gradient-gold" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <Tabs defaultValue="desktop" value={activeView} onValueChange={setActiveView} className="w-full">
          <TabsList className="grid grid-cols-3 w-64 mx-auto bg-vendeai border border-vendeai-gold/20">
            <TabsTrigger value="mobile" className="data-[state=active]:bg-vendeai-gold/20 data-[state=active]:text-vendeai-gold">
              Mobile
            </TabsTrigger>
            <TabsTrigger value="tablet" className="data-[state=active]:bg-vendeai-gold/20 data-[state=active]:text-vendeai-gold">
              Tablet
            </TabsTrigger>
            <TabsTrigger value="desktop" className="data-[state=active]:bg-vendeai-gold/20 data-[state=active]:text-vendeai-gold">
              Desktop
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-9">
          <Card className="border-vendeai-gold/20 bg-vendeai-dark p-1 h-[calc(100vh-240px)] overflow-auto">
            <div 
              ref={editorRef}
              className={`bg-white ${
                activeView === "mobile" ? "w-[375px]" : 
                activeView === "tablet" ? "w-[768px]" : "w-full"
              } min-h-[1200px] mx-auto`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {elements.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <p>Arraste e solte elementos do painel à esquerda</p>
                </div>
              )}

              {elements.map((element) => (
                <div 
                  key={element.id} 
                  className={`p-2 border border-dashed ${selectedElement?.id === element.id ? 'border-vendeai-gold' : 'border-transparent'} hover:border-gray-300 cursor-pointer`}
                  onClick={() => handleElementSelect(element)}
                >
                  {element.type === "text" && <p className="p-2">{element.content}</p>}
                  {element.type === "button" && (
                    <button className="px-4 py-2 bg-vendeai-gold text-white rounded">
                      {element.content}
                    </button>
                  )}
                  {element.type === "image" && (
                    <img src={element.content} alt="Preview" className="max-w-full h-auto" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="border-vendeai-gold/20 bg-vendeai-dark p-4 h-[calc(100vh-240px)] overflow-auto">
            <h3 className="text-lg font-medium text-white mb-4">Propriedades</h3>
            
            {selectedElement ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-vendeai-lightgray block mb-1">
                    Tipo
                  </label>
                  <div className="text-white font-medium">
                    {selectedElement.type.charAt(0).toUpperCase() + selectedElement.type.slice(1)}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-vendeai-lightgray block mb-1">
                    Conteúdo
                  </label>
                  <textarea 
                    className="w-full p-2 bg-vendeai border border-vendeai-gold/20 rounded text-white"
                    value={selectedElement.content}
                    onChange={(e) => {
                      const updatedElements = elements.map(el => 
                        el.id === selectedElement.id ? { ...el, content: e.target.value } : el
                      );
                      setElements(updatedElements);
                      setSelectedElement({ ...selectedElement, content: e.target.value });
                    }}
                    rows={3}
                  />
                </div>
                
                <div className="pt-4 border-t border-vendeai-gold/10">
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      setElements(elements.filter(el => el.id !== selectedElement.id));
                      setSelectedElement(null);
                      toast({
                        title: "Elemento removido",
                        description: "O elemento foi removido do editor."
                      });
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remover Elemento
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-vendeai-lightgray text-sm">
                Selecione um elemento para editar suas propriedades
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
