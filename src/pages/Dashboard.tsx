
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Gift } from "lucide-react";

const Dashboard = () => {
  const [referralCode] = useState("VENDE" + Math.floor(1000 + Math.random() * 9000));

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
                <span className="text-xl font-semibold text-white">
                  Vende<span className="text-vendeai-gold">AI</span>
                </span>
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
      
      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Sua conta foi criada com sucesso!
          </h1>
          <p className="text-vendeai-lightgray mb-8">
            Uma chave de ativação exclusiva foi gerada e vinculada ao seu e-mail e IP.
            Esta chave é exclusiva para seu uso e não deve ser compartilhada.
          </p>
          
          <div className="bg-vendeai-gold/10 rounded-lg p-4 mb-8 border border-vendeai-gold/30">
            <div className="flex items-center gap-2 justify-center mb-2">
              <Gift className="text-vendeai-gold h-5 w-5" />
              <h3 className="text-vendeai-gold font-medium">Seu código de indicação</h3>
            </div>
            <p className="text-white text-lg font-bold">{referralCode}</p>
            <p className="text-xs text-vendeai-lightgray mt-2">
              Indique seus amigos e ganhe 30 dias grátis no plano Premium
            </p>
          </div>
          
          <div className="space-y-4">
            <Button className="gradient-gold w-full">Acessar Dashboard</Button>
            <Button variant="outline" className="w-full text-vendeai-gold border-vendeai-gold/50 hover:bg-vendeai-gold/10" asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para página inicial
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
