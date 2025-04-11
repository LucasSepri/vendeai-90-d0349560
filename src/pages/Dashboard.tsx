
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Gift, Home, BarChart3, MessageSquare, Package, ShoppingCart, Globe, ChevronRight, Crown } from "lucide-react";

const Dashboard = () => {
  const [referralCode] = useState("VENDE" + Math.floor(1000 + Math.random() * 9000));
  const [referrals] = useState(3); // Simulated referral count
  const [requiredReferrals] = useState(15); // Required referrals for premium reward

  // Main dashboard features
  const features = [
    { 
      name: "Funil de Vendas com IA", 
      icon: BarChart3, 
      description: "Crie funis de vendas personalizados e otimizados com IA",
      status: "active"
    },
    { 
      name: "Scripts de Vendas", 
      icon: MessageSquare, 
      description: "Gere scripts de vendas persuasivos automaticamente",
      status: "active"
    },
    { 
      name: "Chatbot IA", 
      icon: MessageSquare, 
      description: "Automatize seu atendimento com inteligência artificial",
      status: "coming-soon"
    },
    { 
      name: "Controle de Estoque", 
      icon: Package, 
      description: "Gerencie seu estoque de forma inteligente",
      status: "coming-soon"
    },
    { 
      name: "PDV Integrado", 
      icon: ShoppingCart, 
      description: "Processe vendas diretamente da plataforma",
      status: "coming-soon"
    },
    { 
      name: "Extensão de Navegador", 
      icon: Globe, 
      description: "Capture leads diretamente de qualquer site",
      status: "coming-soon"
    }
  ];

  return (
    <div className="min-h-screen bg-vendeai flex flex-col">
      {/* Top navigation */}
      <header className="bg-vendeai border-b border-vendeai-gold/20 py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <div className="flex items-center gap-2">
                <img 
                  src="/lovable-uploads/9cfbc124-fed8-43bf-9903-c387d361d0ed.png" 
                  alt="Vendigit Logo" 
                  className="h-8"
                />
                <span className="text-2xl font-semibold text-white mr-2">Vende<span className="text-vendeai-gold">AI</span></span>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Gift className="text-vendeai-gold h-5 w-5" />
              <span className="text-white text-sm">Seu código: <span className="text-vendeai-gold font-semibold">{referralCode}</span></span>
            </div>
            <Button asChild variant="ghost" className="text-white hover:text-vendeai-gold">
              <Link to="/logout">Sair</Link>
            </Button>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-vendeai border-r border-vendeai-gold/20 hidden md:block">
          <div className="p-4">
            <div className="mb-6">
              <h3 className="text-white text-sm font-medium mb-3">MENU</h3>
              <ul className="space-y-1">
                <li>
                  <Button variant="ghost" className="w-full justify-start text-white hover:text-vendeai-gold hover:bg-vendeai-gold/10">
                    <Home className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </li>
                {features.map((feature, index) => (
                  <li key={index}>
                    <Button variant="ghost" className="w-full justify-start text-white hover:text-vendeai-gold hover:bg-vendeai-gold/10">
                      <feature.icon className="mr-2 h-4 w-4" />
                      {feature.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border-t border-vendeai-gold/20 pt-6 mt-6">
              <h3 className="text-white text-sm font-medium mb-3">SEU PLANO</h3>
              <div className="bg-vendeai-gold/10 rounded-lg p-4">
                <span className="text-vendeai-gold font-semibold">Plano Gratuito</span>
                <ul className="mt-2 space-y-2">
                  <li className="text-white text-xs flex items-center">
                    <ChevronRight className="h-3 w-3 mr-1 text-vendeai-gold" />
                    Funil básico
                  </li>
                  <li className="text-white text-xs flex items-center">
                    <ChevronRight className="h-3 w-3 mr-1 text-vendeai-gold" />
                    1 script de vendas/mês
                  </li>
                  <li className="text-white text-xs flex items-center">
                    <ChevronRight className="h-3 w-3 mr-1 text-vendeai-gold" />
                    100 mensagens/mês
                  </li>
                </ul>
                <Button className="w-full mt-4 gradient-gold text-xs">
                  Fazer Upgrade
                </Button>
              </div>
            </div>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto bg-vendeai">
          <div className="max-w-6xl mx-auto">
            {/* Welcome section */}
            <div className="bg-vendeai-darkgray rounded-lg p-6 mb-6 border border-vendeai-gold/20">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Bem-vindo ao VendeAI!
              </h1>
              <p className="text-vendeai-lightgray mb-4">
                Sua conta foi criada com sucesso. Uma chave de ativação exclusiva foi vinculada ao seu e-mail e IP.
              </p>
              <Button className="gradient-gold">Acessar Dashboard Completo</Button>
            </div>
            
            {/* Referral progress */}
            <div className="bg-vendeai-darkgray rounded-lg p-6 mb-8 border border-vendeai-gold/20">
              <div className="flex items-center gap-3 mb-4">
                <Gift className="text-vendeai-gold h-6 w-6" />
                <h2 className="text-xl font-bold text-white">Programa de Indicação</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-vendeai-gold/10 rounded-lg p-4 border border-vendeai-gold/30">
                  <h3 className="text-vendeai-gold font-medium mb-2">Seu código de indicação</h3>
                  <p className="text-white text-xl font-bold">{referralCode}</p>
                  <p className="text-xs text-vendeai-lightgray mt-2">
                    Compartilhe com seus amigos empresários
                  </p>
                </div>
                
                <div className="bg-vendeai-gold/10 rounded-lg p-4 border border-vendeai-gold/30">
                  <h3 className="text-vendeai-gold font-medium mb-2">Indicações utilizadas</h3>
                  <p className="text-white text-xl font-bold">{referrals} de {requiredReferrals}</p>
                  <p className="text-xs text-vendeai-lightgray mt-2">
                    Faltam {requiredReferrals - referrals} para a premiação
                  </p>
                </div>
                
                <div className="bg-vendeai-gold/10 rounded-lg p-4 border border-vendeai-gold/30">
                  <h3 className="text-vendeai-gold font-medium mb-2">Sua premiação</h3>
                  <div className="flex items-center gap-2">
                    <Crown className="text-vendeai-gold h-5 w-5" />
                    <p className="text-white font-medium">30 dias grátis</p>
                  </div>
                  <p className="text-xs text-vendeai-lightgray mt-2">
                    No plano Premium após {requiredReferrals} indicações
                  </p>
                </div>
              </div>
              
              <div className="mt-4 w-full bg-vendeai/50 rounded-full h-2.5">
                <div className="bg-vendeai-gold h-2.5 rounded-full" style={{ width: `${(referrals / requiredReferrals) * 100}%` }}></div>
              </div>
              <p className="text-xs text-vendeai-lightgray mt-2 text-center">
                {Math.round((referrals / requiredReferrals) * 100)}% concluído - Indique mais {requiredReferrals - referrals} amigos para ganhar sua premiação
              </p>
            </div>
            
            {/* Features grid */}
            <h2 className="text-xl font-bold text-white mb-4">Funcionalidades Disponíveis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-vendeai-darkgray rounded-lg p-6 border border-vendeai-gold/10 hover:border-vendeai-gold/30 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-vendeai-gold/10 rounded-lg">
                      <feature.icon className="h-6 w-6 text-vendeai-gold" />
                    </div>
                    <h3 className="text-white font-semibold">{feature.name}</h3>
                  </div>
                  <p className="text-vendeai-lightgray text-sm mb-4">{feature.description}</p>
                  {feature.status === 'active' ? (
                    <Button className="w-full gradient-gold">Acessar</Button>
                  ) : (
                    <Button className="w-full" variant="outline" disabled>
                      Em breve
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
