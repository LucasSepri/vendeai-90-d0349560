
import { StarIcon } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      content: "A VendeAI revolucionou meu negócio. Antes, eu não conseguia dar conta de todas as vendas sozinho. Hoje, a plataforma me ajuda a gerenciar tudo e aumentei meu faturamento em 47%.",
      author: "Carlos Silva",
      position: "Proprietário, Loja de Eletrônicos",
      stars: 5
    },
    {
      content: "O chatbot da VendeAI é incrível! Ele responde às perguntas dos clientes como se fosse eu mesma. Isso me permitiu focar no crescimento do negócio enquanto as vendas continuam acontecendo.",
      author: "Ana Paula Matos",
      position: "CEO, Boutique de Roupas",
      stars: 5
    },
    {
      content: "Os scripts de vendas gerados pela IA são extremamente persuasivos. Minha taxa de conversão aumentou significativamente desde que comecei a usá-los nas minhas abordagens.",
      author: "Marcos Oliveira",
      position: "Consultor Financeiro",
      stars: 4
    }
  ];

  return (
    <section id="depoimentos" className="section bg-vendeai-lightgray py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-vendeai">
            O que dizem nossos <span className="text-vendeai-gold">clientes</span>
          </h2>
          <p className="text-lg text-vendeai-gray max-w-2xl mx-auto">
            Veja como a VendeAI está transformando negócios por todo o Brasil.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-md border border-gray-100 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.stars ? 'text-vendeai-gold' : 'text-gray-300'}`}
                    fill={i < testimonial.stars ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <p className="text-vendeai-gray mb-6 italic">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold text-vendeai">{testimonial.author}</p>
                <p className="text-sm text-vendeai-gray">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
