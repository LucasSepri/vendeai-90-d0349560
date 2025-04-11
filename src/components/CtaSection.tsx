
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="bg-vendeai py-24 relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-vendeai-gold/10 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-vendeai-gold/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Pronto para vender mais sem precisar de uma equipe?
          </h2>
          <p className="text-lg text-gray-300 mb-8 md:px-12">
            Junte-se a centenas de empreendedores que estão revolucionando seu processo de vendas com a VendeAI. Comece hoje com 14 dias grátis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-primary text-lg">Começar Grátis</Button>
            <Button variant="outline" className="btn-secondary text-lg">Agendar Demonstração</Button>
          </div>
          
          <div className="mt-12 pt-8 border-t border-vendeai-gold/20 flex flex-col items-center">
            <p className="text-white mb-4">Solicite uma demonstração personalizada</p>
            <div className="flex items-center space-x-4">
              <input 
                type="email" 
                placeholder="Seu melhor email" 
                className="bg-white/10 border border-vendeai-gold/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vendeai-gold/50 w-full max-w-xs"
              />
              <Button className="btn-primary">Enviar</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
