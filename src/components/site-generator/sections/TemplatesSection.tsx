
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Store, 
  Home, 
  ShoppingBag, 
  UserCircle, 
  Briefcase, 
  ArrowRight
} from "lucide-react";
import { Template } from "../types";

interface TemplatesSectionProps {
  onEditTemplate?: (template: Template) => void;
}

export function TemplatesSection({ onEditTemplate }: TemplatesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("ecommerce");
  
  const categories = [
    { id: "ecommerce", label: "Loja Virtual", icon: Store },
    { id: "realestate", label: "Corretores de Imóveis", icon: Home },
    { id: "fashion", label: "Moda e Acessórios", icon: ShoppingBag },
    { id: "local", label: "Serviços Locais", icon: Briefcase },
    { id: "digital", label: "Negócios Digitais", icon: UserCircle },
    { id: "professionals", label: "Profissionais Liberais", icon: UserCircle }
  ];

  const templates: Template[] = [
    { id: "ecom1", name: "Loja Moderna", category: "ecommerce", image: "https://placehold.co/600x400/333/FFF?text=Loja+Moderna" },
    { id: "ecom2", name: "Marketplace Plus", category: "ecommerce", image: "https://placehold.co/600x400/333/FFF?text=Marketplace+Plus" },
    { id: "real1", name: "Imobiliária Elite", category: "realestate", image: "https://placehold.co/600x400/333/FFF?text=Imobiliária+Elite" },
    { id: "real2", name: "Corretor Premium", category: "realestate", image: "https://placehold.co/600x400/333/FFF?text=Corretor+Premium" },
    { id: "fash1", name: "Boutique Elegance", category: "fashion", image: "https://placehold.co/600x400/333/FFF?text=Boutique+Elegance" },
    { id: "fash2", name: "Moda Express", category: "fashion", image: "https://placehold.co/600x400/333/FFF?text=Moda+Express" },
    { id: "loc1", name: "Serviços Locais Pro", category: "local", image: "https://placehold.co/600x400/333/FFF?text=Serviços+Locais" },
    { id: "loc2", name: "Local Business", category: "local", image: "https://placehold.co/600x400/333/FFF?text=Local+Business" },
    { id: "dig1", name: "Digital Agency", category: "digital", image: "https://placehold.co/600x400/333/FFF?text=Digital+Agency" },
    { id: "dig2", name: "Infoprodutos Elite", category: "digital", image: "https://placehold.co/600x400/333/FFF?text=Infoprodutos+Elite" },
    { id: "pro1", name: "Advogado Premium", category: "professionals", image: "https://placehold.co/600x400/333/FFF?text=Advogado+Premium" },
    { id: "pro2", name: "Consultório Médico", category: "professionals", image: "https://placehold.co/600x400/333/FFF?text=Consultório+Médico" },
  ];

  const filteredTemplates = templates.filter(
    template => template.category === selectedCategory
  );

  const handleEditTemplate = (template: Template) => {
    if (onEditTemplate) {
      onEditTemplate(template);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Modelos por Nicho</h1>
      <p className="text-vendeai-lightgray mb-6">
        Escolha um modelo pronto para seu site e personalize conforme suas necessidades.
      </p>
      
      <Tabs 
        defaultValue="ecommerce" 
        value={selectedCategory}
        onValueChange={setSelectedCategory}
        className="mb-8"
      >
        <TabsList className="grid grid-cols-3 md:grid-cols-6 bg-vendeai border border-vendeai-gold/20">
          {categories.map(category => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="data-[state=active]:bg-vendeai-gold/20 data-[state=active]:text-vendeai-gold"
            >
              <category.icon className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{category.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map(template => (
              <Card key={template.id} className="overflow-hidden border-vendeai-gold/20 bg-vendeai-dark">
                <div className="aspect-video overflow-hidden relative group">
                  <img 
                    src={template.image} 
                    alt={template.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button 
                      className="gradient-gold"
                      onClick={() => handleEditTemplate(template)}
                    >
                      Editar Template
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">{template.name}</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-vendeai-gold hover:text-vendeai-gold hover:bg-vendeai-gold/10"
                      onClick={() => handleEditTemplate(template)}
                    >
                      Editar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
