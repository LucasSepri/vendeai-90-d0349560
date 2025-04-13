
import { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  MousePointerClick, 
  Target, 
  LineChart,
  PieChart
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer
} from "recharts";

export function AnalyticsSection() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedSite, setSelectedSite] = useState("site1");
  
  // Sample data for charts
  const viewsData = [
    { name: 'Jan', views: 400 },
    { name: 'Fev', views: 300 },
    { name: 'Mar', views: 600 },
    { name: 'Abr', views: 800 },
    { name: 'Mai', views: 700 },
    { name: 'Jun', views: 900 },
    { name: 'Jul', views: 1200 },
  ];
  
  const conversionData = [
    { name: 'Página de Vendas', value: 68 },
    { name: 'Loja', value: 45 },
    { name: 'Blog', value: 37 },
    { name: 'Contato', value: 85 },
  ];
  
  const elementPerformanceData = [
    { name: 'Botão "Comprar Agora"', clicks: 245 },
    { name: 'Botão "Saiba Mais"', clicks: 156 },
    { name: 'Formulário de Contato', clicks: 87 },
    { name: 'Link "Nossos Produtos"', clicks: 129 },
    { name: 'Banner Principal', clicks: 198 },
  ];
  
  const salesProgress = 65; // Percentual de progresso
  const salesGoal = 1000; // Meta
  const currentSales = 650; // Vendas atuais
  
  const COLORS = ['#D4AF37', '#FFD700', '#DAA520', '#B8860B'];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Analytics</h1>
      <p className="text-vendeai-lightgray mb-6">
        Acompanhe o desempenho das suas páginas e sites em tempo real.
      </p>
      
      <div className="mb-6">
        <div className="bg-vendeai-dark border border-vendeai-gold/20 p-4 rounded-lg">
          <label htmlFor="site-select" className="block text-sm text-vendeai-lightgray mb-2">
            Selecione um site para analisar:
          </label>
          <select 
            id="site-select"
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
            className="w-full bg-vendeai border border-vendeai-gold/30 text-white rounded p-2"
          >
            <option value="site1">Loja Virtual - Multi Produtos</option>
            <option value="site2">Imobiliária Elite - Site Corporativo</option>
            <option value="site3">Moda Express - E-commerce</option>
          </select>
        </div>
      </div>
      
      <Tabs 
        defaultValue="overview" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-8"
      >
        <TabsList className="grid grid-cols-3 bg-vendeai border border-vendeai-gold/20">
          <TabsTrigger 
            value="overview"
            className="data-[state=active]:bg-vendeai-gold/20 data-[state=active]:text-vendeai-gold"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            <span>Visão Geral</span>
          </TabsTrigger>
          <TabsTrigger 
            value="conversion"
            className="data-[state=active]:bg-vendeai-gold/20 data-[state=active]:text-vendeai-gold"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            <span>Conversão</span>
          </TabsTrigger>
          <TabsTrigger 
            value="elements"
            className="data-[state=active]:bg-vendeai-gold/20 data-[state=active]:text-vendeai-gold"
          >
            <MousePointerClick className="h-4 w-4 mr-2" />
            <span>Elementos</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-vendeai-gold/20 bg-vendeai-dark">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center text-lg">
                  <Eye className="h-5 w-5 text-vendeai-gold mr-2" />
                  Visualizações
                </CardTitle>
                <CardDescription className="text-vendeai-lightgray">
                  Total de visitas ao site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-white">4,286</div>
                <div className="text-sm text-vendeai-gold flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+12.5% em relação ao mês passado</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-vendeai-gold/20 bg-vendeai-dark">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center text-lg">
                  <MousePointerClick className="h-5 w-5 text-vendeai-gold mr-2" />
                  Taxa de Conversão
                </CardTitle>
                <CardDescription className="text-vendeai-lightgray">
                  Média de todas as páginas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-white">3.6%</div>
                <div className="text-sm text-vendeai-gold flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+0.8% em relação ao mês passado</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-vendeai-gold/20 bg-vendeai-dark">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center text-lg">
                  <Target className="h-5 w-5 text-vendeai-gold mr-2" />
                  Progresso de Vendas
                </CardTitle>
                <CardDescription className="text-vendeai-lightgray">
                  Meta mensal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-white">{currentSales}</div>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-vendeai-lightgray">0</span>
                    <span className="text-vendeai-gold">{salesGoal}</span>
                  </div>
                  <Progress value={salesProgress} className="h-2" />
                  <div className="text-right text-sm text-vendeai-gold">
                    {salesProgress}% da meta
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="border-vendeai-gold/20 bg-vendeai-dark">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <LineChart className="h-5 w-5 text-vendeai-gold mr-2" />
                Visualizações ao Longo do Tempo
              </CardTitle>
              <CardDescription className="text-vendeai-lightgray">
                Número total de visitas nos últimos 7 meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={viewsData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#777" />
                    <YAxis stroke="#777" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#222', borderColor: '#D4AF37', color: '#fff' }}
                      labelStyle={{ color: '#D4AF37' }}
                    />
                    <Line type="monotone" dataKey="views" stroke="#D4AF37" strokeWidth={2} activeDot={{ r: 8 }} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="conversion" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-vendeai-gold/20 bg-vendeai-dark">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <PieChart className="h-5 w-5 text-vendeai-gold mr-2" />
                  Taxa de Conversão por Página
                </CardTitle>
                <CardDescription className="text-vendeai-lightgray">
                  Percentual de visitantes que realizaram uma ação
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={conversionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {conversionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Taxa de Conversão']}
                        contentStyle={{ backgroundColor: '#222', borderColor: '#D4AF37', color: '#fff' }}
                        labelStyle={{ color: '#D4AF37' }}
                      />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-vendeai-gold/20 bg-vendeai-dark">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="h-5 w-5 text-vendeai-gold mr-2" />
                  Metas de Conversão
                </CardTitle>
                <CardDescription className="text-vendeai-lightgray">
                  Progresso em relação às metas definidas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-white">Página de Vendas</span>
                    <span className="text-vendeai-gold">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-white">Loja</span>
                    <span className="text-vendeai-gold">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-white">Blog</span>
                    <span className="text-vendeai-gold">37%</span>
                  </div>
                  <Progress value={37} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-white">Contato</span>
                    <span className="text-vendeai-gold">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="elements" className="mt-6 space-y-6">
          <Card className="border-vendeai-gold/20 bg-vendeai-dark">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MousePointerClick className="h-5 w-5 text-vendeai-gold mr-2" />
                Desempenho dos Elementos
              </CardTitle>
              <CardDescription className="text-vendeai-lightgray">
                Número de cliques em cada elemento da página
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={elementPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#777" 
                      angle={-45} 
                      textAnchor="end" 
                      height={70}
                    />
                    <YAxis stroke="#777" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#222', borderColor: '#D4AF37', color: '#fff' }}
                      labelStyle={{ color: '#D4AF37' }}
                    />
                    <Bar dataKey="clicks" fill="#D4AF37" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="p-4 bg-vendeai-gold/10 rounded-lg border border-vendeai-gold/30">
            <h3 className="text-lg font-medium text-white mb-2 flex items-center">
              <Target className="h-5 w-5 text-vendeai-gold mr-2" />
              Dicas para Melhorar Desempenho
            </h3>
            <ul className="space-y-2 text-vendeai-lightgray">
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-vendeai-gold/20 text-vendeai-gold flex items-center justify-center mr-2 mt-0.5">1</div>
                <p>Considere tornar o botão "Comprar Agora" mais visível na página inicial</p>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-vendeai-gold/20 text-vendeai-gold flex items-center justify-center mr-2 mt-0.5">2</div>
                <p>O formulário de contato recebe poucos cliques, tente melhorar sua posição na página</p>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-vendeai-gold/20 text-vendeai-gold flex items-center justify-center mr-2 mt-0.5">3</div>
                <p>O Banner Principal tem bom desempenho, considere adicionar mais CTA nessa área</p>
              </li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
