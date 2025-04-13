
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="pt-24 pb-24 bg-vendeai relative overflow-hidden">
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
          
          {/* CTA Button with gradient */}
          <div className="flex justify-center">
            <Button asChild className="rounded-full text-white py-6 px-8 text-lg">
              <Link to="/register" className="group relative overflow-hidden bg-gradient-to-r from-[#ff5770] to-[#9d66ff] hover:from-[#ff5770] hover:to-[#b38aff]">
                <span className="inline-flex items-center">
                  Crie sua conta
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
