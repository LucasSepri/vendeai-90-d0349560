import { Button } from "@/components/ui/button";
const HeroSection = () => {
  return <section className="pt-32 pb-20 md:py-40 bg-vendeai relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-40 left-10 w-64 h-64 rounded-full bg-vendeai-gold/5 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-vendeai-gold/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white animate-fade-in leading-tight">
            Venda mais, sem precisar de uma <span className="text-[a66717] text-[#bd6c07]">equipe</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 animate-fade-in delay-100 md:px-12">
            Aumente suas vendas com nossa plataforma de automação inteligente. A VendeAI usa inteligência artificial para criar funis de vendas, gerar scripts e automatizar seu atendimento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-200">
            <Button className="btn-primary text-lg">Começar Grátis</Button>
            <Button variant="outline" className="btn-secondary text-lg">Agendar Demonstração</Button>
          </div>
          
          <div className="mt-12 pt-8 border-t border-vendeai-gold/20 flex flex-wrap justify-center gap-8 animate-fade-in delay-300">
            <div className="flex items-center">
              <div className="bg-vendeai-gold/20 p-2 rounded-full mr-3">
                <svg className="w-5 h-5 text-vendeai-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-300">Teste grátis por 14 dias</span>
            </div>
            <div className="flex items-center">
              <div className="bg-vendeai-gold/20 p-2 rounded-full mr-3">
                <svg className="w-5 h-5 text-vendeai-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-300">Instalação simples</span>
            </div>
            <div className="flex items-center">
              <div className="bg-vendeai-gold/20 p-2 rounded-full mr-3">
                <svg className="w-5 h-5 text-vendeai-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-300">Sem contrato de fidelidade</span>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;