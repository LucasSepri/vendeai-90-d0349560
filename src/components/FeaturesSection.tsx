
import { Bot, CircleUser, MessageSquare, ShoppingBag, ChevronRight, TrendingUp, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturesSection = () => {
  const features = [
    {
      icon: <TrendingUp className="w-12 h-12 text-vendeai-gold" />,
      title: "Criação de funis de vendas com IA",
      description: "Nossa IA analisa seu público e cria funis de vendas personalizados que maximizam suas taxas de conversão."
    },
    {
      icon: <FileText className="w-12 h-12 text-vendeai-gold" />,
      title: "Geração de scripts de vendas automáticos",
      description: "Gere scripts de vendas persuasivos e personalizados para cada cliente com apenas um clique."
    },
    {
      icon: <MessageSquare className="w-12 h-12 text-vendeai-gold" />,
      title: "Atendimento inteligente via chatbot",
      description: "Chatbot com IA avançada que entende as necessidades do cliente e responde como um vendedor experiente."
    },
    {
      icon: <ShoppingBag className="w-12 h-12 text-vendeai-gold" />,
      title: "Controle de estoque automatizado",
      description: "Gerencie seu estoque com facilidade, com alertas inteligentes e previsões de demanda."
    },
    {
      icon: <Bot className="w-12 h-12 text-vendeai-gold" />,
      title: "PDV integrado",
      description: "Sistema de ponto de venda completo que se integra perfeitamente com todas as outras funcionalidades."
    },
    {
      icon: <CircleUser className="w-12 h-12 text-vendeai-gold" />,
      title: "Extensão de navegador para interações com leads",
      description: "Interaja com seus leads diretamente nas redes sociais com nossa extensão exclusiva."
    }
  ];

  return (
    <section id="recursos" className="section bg-vendeai-lightgray py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-vendeai">
            Funcionalidades <span className="text-vendeai-gold">Principais</span>
          </h2>
          <p className="text-lg text-vendeai-gray max-w-2xl mx-auto">
            A VendeAI oferece um conjunto completo de ferramentas de vendas e atendimento automatizadas, impulsionadas por inteligência artificial avançada.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card flex flex-col animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-vendeai">{feature.title}</h3>
              <p className="text-vendeai-gray flex-grow">{feature.description}</p>
              <div className="mt-4">
                <Button variant="link" className="text-vendeai-gold p-0 flex items-center hover:text-vendeai-darkgold">
                  Saiba mais <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="btn-primary">Explorar Todos os Recursos</Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
