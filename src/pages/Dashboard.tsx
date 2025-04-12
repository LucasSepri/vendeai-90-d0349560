import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Gift, User, Settings, LogOut, LayoutDashboard, Users, MessageSquare, FileText, ShoppingBag, Store, ChevronRight, Crown, Bot } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import AIAssistant from "@/components/AIAssistant";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('vendeai_currentUser');
    if (!storedUser) {
      toast({
        title: "Acesso não autorizado",
        description: "Faça login para acessar o dashboard.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    try {
      const user = JSON.parse(storedUser);
      setUserData(user);
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }, [navigate, toast]);

  const handleLogout = () => {
    localStorage.removeItem('vendeai_currentUser');
    toast({
      title: "Sessão encerrada",
      description: "Você saiu da sua conta com sucesso."
    });
    navigate('/login');
  };

  if (loading) {
    return <div className="min-h-screen bg-vendeai flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>;
  }
  
  const referralsNeeded = 15;
  const referralsProgress = Math.min(100, (userData?.referrals || 0) / referralsNeeded * 100);
  const referralsRemaining = Math.max(0, referralsNeeded - (userData?.referrals || 0));

  return <div className="min-h-screen bg-vendeai flex flex-col">
      <AIAssistant open={isAssistantOpen} onOpenChange={setIsAssistantOpen} />
      
      <div className="flex flex-1">
        <div className="hidden md:flex w-64 flex-col bg-vendeai border-r border-vendeai-gold/20 fixed h-full">
          <div className="p-4 border-b border-vendeai-gold/20">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/lovable-uploads/9cfbc124-fed8-43bf-9903-c387d361d0ed.png" alt="Vendigit Logo" className="h-8" />
              <span className="text-xl font-semibold text-white">
                Vende<span className="text-vendeai-gold">AI</span>
              </span>
            </Link>
          </div>
          
          <nav className="flex-1 p-4">
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start text-white gap-3 hover:bg-vendeai-gold/10 hover:text-vendeai-gold">
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Button>
              
              <Button variant="ghost" className="w-full justify-start text-white gap-3 hover:bg-vendeai-gold/10 hover:text-vendeai-gold">
                <MessageSquare className="h-5 w-5" />
                <span>Funil com IA</span>
              </Button>
              
              <Button variant="ghost" className="w-full justify-start text-white gap-3 hover:bg-vendeai-gold/10 hover:text-vendeai-gold">
                <FileText className="h-5 w-5" />
                <span>Scripts Automáticos</span>
              </Button>
              
              <Button variant="ghost" className="w-full justify-start text-white gap-3 hover:bg-vendeai-gold/10 hover:text-vendeai-gold">
                <ShoppingBag className="h-5 w-5" />
                <span>Controle de Estoque</span>
              </Button>
              
              <Button variant="ghost" className="w-full justify-start text-white gap-3 hover:bg-vendeai-gold/10 hover:text-vendeai-gold">
                <Store className="h-5 w-5" />
                <span>PDV</span>
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white gap-3 hover:bg-vendeai-gold/10 hover:text-vendeai-gold"
                onClick={() => setIsAssistantOpen(true)}
              >
                <Bot className="h-5 w-5" />
                <span>Assistente IA</span>
              </Button>
            </div>
            
            <div className="pt-6 mt-6 border-t border-vendeai-gold/10">
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start text-white gap-3 hover:bg-vendeai-gold/10 hover:text-vendeai-gold">
                  <User className="h-5 w-5" />
                  <span>Meu Perfil</span>
                </Button>
                
                <Button variant="ghost" className="w-full justify-start text-white gap-3 hover:bg-vendeai-gold/10 hover:text-vendeai-gold">
                  <Settings className="h-5 w-5" />
                  <span>Configurações</span>
                </Button>
                
                <Button variant="ghost" className="w-full justify-start text-white gap-3 hover:bg-vendeai-gold/10 hover:text-vendeai-gold" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                  <span>Sair</span>
                </Button>
              </div>
            </div>
          </nav>
          
          <div className="p-4 mt-auto">
            <div className="p-3 bg-vendeai-gold/10 rounded-lg border border-vendeai-gold/30">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-5 w-5 text-vendeai-gold" />
                <span className="text-sm font-medium text-white">Plano {userData?.plan === 'free' ? 'Gratuito' : userData?.plan === 'pro' ? 'Profissional' : 'Premium'}</span>
              </div>
              
              {userData?.plan !== 'premium' && <Button size="sm" variant="outline" className="w-full mt-2 text-vendeai-gold border-vendeai-gold/50 hover:bg-vendeai-gold/10">
                  Fazer upgrade
                </Button>}
            </div>
          </div>
        </div>
        
        <div className="flex-1 md:ml-64">
          <header className="bg-vendeai border-b border-vendeai-gold/20 py-4 px-6 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 md:hidden">
                <Link to="/">
                  <div className="flex items-center gap-2">
                    <img src="/lovable-uploads/9cfbc124-fed8-43bf-9903-c387d361d0ed.png" alt="Vendigit Logo" className="h-8" />
                    <span className="text-xl font-semibold text-white">
                      Vende<span className="text-vendeai-gold">AI</span>
                    </span>
                  </div>
                </Link>
              </div>
              
              <div className="md:flex-1 md:ml-4">
                <h1 className="text-xl font-semibold text-white hidden md:block">Dashboard</h1>
              </div>
              
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-vendeai-gold/30 text-vendeai-gold hover:bg-vendeai-gold/10"
                  onClick={() => setIsAssistantOpen(true)}
                >
                  <Bot className="h-5 w-5" />
                </Button>
                
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-white text-sm">Olá, <span className="font-medium">{userData?.ownerName?.split(' ')[0] || 'Usuário'}</span></span>
                </div>
                
                <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </header>
          
          <main className="p-6">
            <div className="grid gap-6 mb-8">
              <Card className="border-vendeai-gold/20 shadow-md bg-gradient-to-r from-vendeai to-vendeai">
                <CardHeader>
                  <CardTitle className="text-white">
                    Bem-vindo ao VendeAI, {userData?.ownerName?.split(' ')[0] || 'Usuário'}!
                  </CardTitle>
                  <CardDescription className="text-vendeai-lightgray">
                    Este é o seu painel de controle. Acesse todas as funcionalidades abaixo.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="h-5 w-5 text-vendeai-gold" />
                    <span className="text-white">
                      Seu plano atual: <span className="text-vendeai-gold font-medium">
                        {userData?.plan === 'free' ? 'Gratuito' : userData?.plan === 'pro' ? 'Profissional' : 'Premium'}
                      </span>
                    </span>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-4">
                    <Button asChild className="gradient-gold">
                      <Link to="/dashboard/tools">Acessar Dashboard</Link>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="border-vendeai-gold/30 text-white hover:bg-vendeai-gold/10 hover:text-vendeai-gold"
                      onClick={() => setIsAssistantOpen(true)}
                    >
                      <Bot className="mr-2 h-5 w-5" />
                      Falar com Assistente IA
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="border-vendeai-gold/20 shadow-md bg-vendeai-gold">
                <CardHeader className="pb-3 bg-slate-50">
                  <div className="flex items-center gap-2">
                    <Gift className="text-vendeai-gold h-5 w-5" />
                    <CardTitle className="text-lg text-vendeai-gold">Seu código de indicação</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="bg-slate-50">
                  <div className="rounded-lg p-4 border border-vendeai-gold/30 text-center mb-4 bg-vendeai-gold">
                    <p className="text-white text-lg font-bold">{userData?.referralCode || 'VENDE1234'}</p>
                  </div>
                  
                  <div className="space-y-4 bg-black">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-white px-[30px] text-center">Progresso para 30 dias grátis do plano Premium</span>
                        <span className="text-sm text-vendeai-gold px-0">{userData?.referrals || 0}/{referralsNeeded}</span>
                      </div>
                      <Progress value={referralsProgress} className="h-2 bg-vendeai-gold/20" indicatorClassName="bg-vendeai-gold" />
                    </div>
                    
                    {referralsRemaining > 0 ? <p className="text-sm text-vendeai-lightgray px-[30px] text-center">
                        <span className="text-vendeai-gold font-medium">{referralsRemaining}</span> indicações restantes para liberar 30 dias de Premium grátis!
                      </p> : <p className="text-sm text-vendeai-gold font-medium">
                        Parabéns! Você atingiu o número de indicações necessárias.
                      </p>}
                    
                    <Button variant="outline" className="w-full border-vendeai-gold/50 text-center text-amber-400 bg-black">
                      <Users className="mr-2 h-4 w-4" />
                      Compartilhar código
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-vendeai-gold/20 shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Funcionalidades</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-between text-white hover:text-vendeai-gold bg-black">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="h-5 w-5 text-vendeai-gold" />
                        <span>Funil com IA</span>
                      </div>
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                    
                    <Button variant="ghost" className="w-full justify-between text-white hover:text-vendeai-gold bg-black">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-vendeai-gold" />
                        <span>Scripts Automáticos</span>
                      </div>
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                    
                    <Button variant="ghost" className="w-full justify-between text-white hover:text-vendeai-gold bg-black">
                      <div className="flex items-center gap-3">
                        <ShoppingBag className="h-5 w-5 text-vendeai-gold" />
                        <span>Controle de Estoque</span>
                      </div>
                      <div className="text-xs bg-vendeai-gold/20 text-vendeai-gold px-2 py-1 rounded">
                        Em breve
                      </div>
                    </Button>
                    
                    <Button variant="ghost" className="w-full justify-between text-white hover:text-vendeai-gold bg-black">
                      <div className="flex items-center gap-3">
                        <Store className="h-5 w-5 text-vendeai-gold" />
                        <span>PDV</span>
                      </div>
                      <div className="text-xs bg-vendeai-gold/20 text-vendeai-gold px-2 py-1 rounded">
                        Em breve
                      </div>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full justify-between text-white hover:text-vendeai-gold bg-black"
                      onClick={() => setIsAssistantOpen(true)}
                    >
                      <div className="flex items-center gap-3">
                        <Bot className="h-5 w-5 text-vendeai-gold" />
                        <span>Assistente IA</span>
                      </div>
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  {userData?.plan === 'free' && <div className="p-3 rounded-lg border border-vendeai-gold/30 bg-black">
                      <p className="text-sm text-white mb-2">
                        Acesse todas as funcionalidades com o plano Premium
                      </p>
                      <Button className="w-full gradient-gold">
                        Fazer upgrade
                      </Button>
                    </div>}
                </CardContent>
              </Card>
            </div>
            
            <Card className="border-vendeai-gold/20 shadow-md mb-8">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Benefícios do seu plano</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {userData?.plan === 'free' && <>
                      <div className="p-4 rounded-lg border border-vendeai-gold/30 bg-vendeai-gold">
                        <h3 className="font-medium text-white mb-2">Funil básico</h3>
                        <p className="text-sm text-vendeai-lightgray">Crie um funil de vendas básico com IA</p>
                      </div>
                      <div className="p-4 rounded-lg border border-vendeai-gold/30 bg-vendeai-gold">
                        <h3 className="font-medium text-white mb-2">1 script/mês</h3>
                        <p className="text-sm text-vendeai-lightgray">Gere um script de vendas por mês</p>
                      </div>
                      <div className="p-4 rounded-lg border border-vendeai-gold/30 bg-vendeai-gold">
                        <h3 className="font-medium text-white mb-2">100 mensagens/mês</h3>
                        <p className="text-sm text-vendeai-lightgray">Limite de 100 mensagens mensais</p>
                      </div>
                    </>}
                  
                  {userData?.plan === 'pro' && <>
                      <div className="p-4 bg-vendeai-gold/10 rounded-lg border border-vendeai-gold/30">
                        <h3 className="font-medium text-white mb-2">Funis ilimitados</h3>
                        <p className="text-sm text-vendeai-lightgray">Crie funis de vendas sem limites</p>
                      </div>
                      <div className="p-4 bg-vendeai-gold/10 rounded-lg border border-vendeai-gold/30">
                        <h3 className="font-medium text-white mb-2">30 scripts/mês</h3>
                        <p className="text-sm text-vendeai-lightgray">Gere até 30 scripts de vendas por mês</p>
                      </div>
                      <div className="p-4 bg-vendeai-gold/10 rounded-lg border border-vendeai-gold/30">
                        <h3 className="font-medium text-white mb-2">1.000 mensagens/mês</h3>
                        <p className="text-sm text-vendeai-lightgray">Limite de 1.000 mensagens mensais</p>
                      </div>
                    </>}
                  
                  {userData?.plan === 'premium' && <>
                      <div className="p-4 bg-vendeai-gold/10 rounded-lg border border-vendeai-gold/30">
                        <h3 className="font-medium text-white mb-2">Tudo do Pro</h3>
                        <p className="text-sm text-vendeai-lightgray">Todas as funcionalidades do plano Pro</p>
                      </div>
                      <div className="p-4 bg-vendeai-gold/10 rounded-lg border border-vendeai-gold/30">
                        <h3 className="font-medium text-white mb-2">Scripts ilimitados</h3>
                        <p className="text-sm text-vendeai-lightgray">Gere scripts de vendas sem limites</p>
                      </div>
                      <div className="p-4 bg-vendeai-gold/10 rounded-lg border border-vendeai-gold/30">
                        <h3 className="font-medium text-white mb-2">Mensagens ilimitadas</h3>
                        <p className="text-sm text-vendeai-lightgray">Envie mensagens sem limites mensais</p>
                      </div>
                    </>}
                  
                  {userData?.plan !== 'premium' && <div className="md:col-span-3 mt-2">
                      <Button className="gradient-gold text-vendeai-foreground">
                        Fazer upgrade para Premium
                      </Button>
                    </div>}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>;
};

export default Dashboard;
