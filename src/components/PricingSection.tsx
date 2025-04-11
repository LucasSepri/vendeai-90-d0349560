
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PricingSection = () => {
  const plans = [
    {
      name: "Gratuito",
      price: "R$0",
      description: "Ideal para testar a plataforma",
      features: [
        "Funil de vendas básico",
        "1 script de vendas por mês",
        "Chatbot com 100 mensagens/mês",
        "Controle de estoque básico",
        "Suporte por email"
      ],
      cta: "Começar Grátis",
      planId: "free",
      popular: false
    },
    {
      name: "Profissional",
      price: "R$97",
      period: "/mês",
      description: "Para empreendedores em crescimento",
      features: [
        "Funis de vendas ilimitados",
        "30 scripts de vendas por mês",
        "Chatbot com 1.000 mensagens/mês",
        "Controle de estoque avançado",
        "PDV integrado básico",
        "Extensão de navegador",
        "Suporte prioritário"
      ],
      cta: "Escolher Plano",
      planId: "pro",
      popular: true
    },
    {
      name: "Premium",
      price: "R$197",
      period: "/mês",
      description: "Para negócios estabelecidos",
      features: [
        "Tudo do plano Profissional",
        "Scripts de vendas ilimitados",
        "Chatbot com mensagens ilimitadas",
        "Análise avançada de dados",
        "PDV integrado completo",
        "API para integração personalizada",
        "Suporte VIP 24/7"
      ],
      cta: "Escolher Plano",
      planId: "premium",
      popular: false
    }
  ];

  return (
    <section id="planos" className="section bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-vendeai">
            Planos e <span className="text-vendeai-gold">Preços</span>
          </h2>
          <p className="text-lg text-vendeai-gray max-w-2xl mx-auto">
            Escolha o plano ideal para o seu negócio e comece a vender mais hoje mesmo.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 animate-fade-in ${
                plan.popular 
                  ? 'border-2 border-vendeai-gold relative scale-105 z-10 bg-white' 
                  : 'border border-gray-200 bg-white'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="gradient-gold text-white text-center py-1 font-medium">
                  Mais Popular
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-xl font-bold mb-2 text-vendeai">{plan.name}</h3>
                <div className="flex items-end mb-4">
                  <span className="text-3xl font-bold text-vendeai">{plan.price}</span>
                  {plan.period && <span className="text-vendeai-gray ml-1">{plan.period}</span>}
                </div>
                <p className="text-sm text-vendeai-gray mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="flex-shrink-0 mr-2 mt-1">
                        <Check className="h-4 w-4 text-vendeai-gold" />
                      </span>
                      <span className="text-sm text-vendeai-gray">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                  asChild
                >
                  <Link to="/register" state={{ plan: plan.planId }}>
                    {plan.cta}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 text-vendeai-gray">
          <p>Precisa de mais recursos? <a href="#" className="text-vendeai-gold font-medium">Entre em contato</a> para um plano personalizado.</p>
          <p className="text-sm mt-2">Use de forma exclusiva. Indique para ganhar benefícios.</p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
