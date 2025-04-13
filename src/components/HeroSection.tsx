import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
const HeroSection = () => {
  const features = ["Teste grátis por 14 dias", "Instalação simples", "Sem contrato de fidelidade"];
  return <section className="pt-28 pb-24 bg-black relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#995e16] opacity-10"></div>
      
      {/* Badge at the top */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-center mb-12">
          <div className="py-2 px-4 bg-black border border-vendeai-gold/30 rounded-full inline-flex items-center">
            <span className="text-vendeai-gold text-xs font-medium uppercase tracking-wider">Automação inteligente de vendas</span>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Venda mais, sem precisar <br className="hidden md:block" />
            de uma <span className="text-vendeai-gold">equipe!</span>
          </h1>
          
          <p className="text-lg text-gray-300 mb-10 max-w-3xl mx-auto">
            Aumente suas vendas com nossa plataforma de automação inteligente. A Lucre AI 
            usa inteligência artificial para criar funis de vendas, gerar scripts, sites, 
            sistema de PDV integrado e CRM e automatizar seu atendimento. 
            Tudo em um só lugar.
          </p>
          
          {/* CTA Button with Ticto-style border effect */}
          <div className="flex justify-center">
            <div className="relative group">
              <Button asChild className="relative z-10 bg-transparent hover:bg-vendeai-gold text-white hover:text-black border border-vendeai-gold rounded-md py-6 px-8 text-lg transition-all duration-300">
                <Link to="/register" className="flex items-center">
                  Crie sua conta
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <div className="absolute inset-0 rounded-md border border-vendeai-gold -m-[1px] opacity-30 group-hover:opacity-0 transition-all duration-300"></div>
            </div>
          </div>
          
          {/* Features with checkmarks */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-12">
            {features.map((feature, index) => <div key={index} className="flex items-center">
                <div className="rounded-full bg-vendeai-gold/20 p-1 mr-2 flex items-center justify-center">
                  <Check className="h-4 w-4 text-vendeai-gold" />
                </div>
                <span className="text-sm text-gray-300">{feature}</span>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;