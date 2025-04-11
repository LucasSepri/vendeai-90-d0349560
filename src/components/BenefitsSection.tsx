
import { Brain, Zap, LineChart, Clock } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Brain className="w-16 h-16 text-vendeai-gold" />,
      title: "IA de última geração",
      description: "Nossa inteligência artificial avançada entende o comportamento do consumidor e adapta suas estratégias de vendas para maximizar conversões."
    },
    {
      icon: <Zap className="w-16 h-16 text-vendeai-gold" />,
      title: "Automação completa",
      description: "Automatize todo o processo de vendas, desde a prospecção de leads até o atendimento pós-venda, liberando seu tempo para o que realmente importa."
    },
    {
      icon: <LineChart className="w-16 h-16 text-vendeai-gold" />,
      title: "Resultados mensuráveis",
      description: "Acompanhe o desempenho de suas vendas em tempo real com dashboards intuitivos e relatórios detalhados."
    },
    {
      icon: <Clock className="w-16 h-16 text-vendeai-gold" />,
      title: "Economia de tempo",
      description: "Reduza drasticamente o tempo gasto em tarefas administrativas e foque no crescimento estratégico do seu negócio."
    }
  ];

  return (
    <section id="como-funciona" className="section bg-vendeai relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-vendeai-gold/5 blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-64 h-64 rounded-full bg-vendeai-gold/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Por que escolher a <span className="text-vendeai-gold">VendeAI</span>?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Nossa plataforma utiliza tecnologia de ponta para revolucionar a maneira como você vende, sem a necessidade de contratar uma equipe completa.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center bg-vendeai-gray/10 p-8 rounded-xl backdrop-blur-sm border border-vendeai-gold/10 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-white">{benefit.title}</h3>
              <p className="text-gray-300">{benefit.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="gradient-gold h-1 w-24 mx-auto mb-8 rounded-full"></div>
          <h3 className="text-2xl font-bold text-white mb-4">Uma solução completa para pequenos e médios negócios</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            A VendeAI é como ter uma equipe completa de vendas e marketing trabalhando 24/7 para o seu negócio, sem os altos custos associados.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
