
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Shield, BarChart3, Crown, Target } from "lucide-react";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";

export function PagesSection() {
  const [activeTab, setActiveTab] = useState("protection");
  const [salesProgress, setSalesProgress] = useState(65); // Exemplo: 65% da meta atingida
  const [salesGoal, setSalesGoal] = useState(1000); // Meta de vendas
  const [currentSales, setCurrentSales] = useState(650); // Vendas atuais

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Páginas</h1>
      <p className="text-vendeai-lightgray mb-6">
        Gerencie suas páginas, links de proteção e acompanhe seu progresso de vendas.
      </p>

      <Tabs 
        defaultValue="protection" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-8"
      >
        <TabsList className="grid grid-cols-2 bg-vendeai border border-vendeai-gold/20">
          <TabsTrigger 
            value="protection"
            className="data-[state=active]:bg-vendeai-gold/20 data-[state=active]:text-vendeai-gold"
          >
            <Shield className="h-4 w-4 mr-2" />
            <span>Proteção de Links</span>
          </TabsTrigger>
          <TabsTrigger 
            value="sales"
            className="data-[state=active]:bg-vendeai-gold/20 data-[state=active]:text-vendeai-gold"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            <span>Meta de Vendas</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="protection" className="mt-6">
          <Card className="border-vendeai-gold/20 bg-vendeai-dark">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-vendeai-gold" />
                Proteção de Links
              </CardTitle>
              <CardDescription className="text-vendeai-lightgray">
                Crie links protegidos para controlar o acesso ao seu conteúdo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="page-url" className="text-white">URL da Página</Label>
                <Input 
                  id="page-url" 
                  placeholder="Ex: meusite.com/pagina-de-venda" 
                  className="bg-vendeai border-vendeai-gold/30 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="protection-type" className="text-white">Tipo de Proteção</Label>
                <select 
                  id="protection-type" 
                  className="w-full h-10 rounded-md border border-vendeai-gold/30 bg-vendeai px-3 py-2 text-sm text-white"
                >
                  <option value="password">Senha</option>
                  <option value="email">Email</option>
                  <option value="payment">Pagamento</option>
                </select>
              </div>
              
              <Button className="gradient-gold w-full">
                Criar Link Protegido
              </Button>
              
              <div className="mt-4 p-4 bg-vendeai-gold/5 rounded-md border border-vendeai-gold/20">
                <h4 className="text-white font-medium mb-2">Meus Links Protegidos</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-vendeai-gold/10 rounded">
                    <span className="text-white text-sm truncate">pagina-de-venda-exclusiva</span>
                    <Button variant="ghost" size="sm" className="text-vendeai-gold hover:text-vendeai-gold hover:bg-vendeai-gold/10">
                      Gerenciar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="mt-6">
          <Card className="border-vendeai-gold/20 bg-vendeai-dark">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-vendeai-gold" />
                Meta de Vendas
              </CardTitle>
              <CardDescription className="text-vendeai-lightgray">
                Acompanhe seu progresso de vendas com a VendeAI.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-gradient-to-br from-vendeai to-vendeai-dark border border-vendeai-gold/30 rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Progresso de Vendas</h3>
                    <p className="text-vendeai-lightgray text-sm">Meta mensal</p>
                  </div>
                  <div className="bg-vendeai-gold/20 p-2 rounded-full">
                    <Crown className="h-6 w-6 text-vendeai-gold" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{currentSales} vendas</span>
                    <span className="text-vendeai-gold font-bold">Meta: {salesGoal}</span>
                  </div>
                  
                  <Progress value={salesProgress} className="h-3 bg-vendeai-gold/20" indicatorClassName="bg-vendeai-gold" />
                  
                  <div className="text-right text-vendeai-lightgray text-sm">
                    {salesProgress}% completo
                  </div>
                </div>
                
                <div className="mt-6 bg-vendeai-gold/10 p-4 rounded-md">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-vendeai-gold" />
                    <span className="text-white font-medium">
                      Faltam {salesGoal - currentSales} vendas para atingir sua meta!
                    </span>
                  </div>
                </div>
                
                <Button className="w-full mt-4 gradient-gold">
                  Definir Nova Meta
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
