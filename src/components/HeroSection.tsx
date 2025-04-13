
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-28 pb-24 bg-black relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#120022] opacity-90"></div>
      
      {/* Badge at the top */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-center mb-12">
          <div className="py-2 px-4 bg-black border border-vendeai-gold/30 rounded-full inline-flex items-center">
            <span className="text-vendeai-gold text-xs font-medium uppercase tracking-wider">Mais que um simples checkout</span>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
            A única plataforma de conversão e <br className="hidden md:block" />
            vendas de produtos <span className="text-vendeai-gold">digitais</span> e físicos
          </h1>
          
          <p className="text-lg text-gray-300 mb-10 max-w-3xl mx-auto">
            Criada por quem vende e entende. Inovação, excelência e agilidade, tudo
            que você precisa para maximizar seus resultados.
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
