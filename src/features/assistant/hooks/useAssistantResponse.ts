
import { Message, TrainingData } from "../types";

export const useAssistantResponse = () => {
  const generateEnhancedResponse = async (
    query: string, 
    history: Message[], 
    trainingSet: TrainingData[]
  ): Promise<string> => {
    const lowercaseQuery = query.toLowerCase();
    
    // 1. Check if we have training data that matches this query
    const matchingTrainingData = trainingSet.filter(item => 
      item.question.toLowerCase().includes(lowercaseQuery) || 
      lowercaseQuery.includes(item.question.toLowerCase())
    );
    
    if (matchingTrainingData.length > 0 && Math.random() > 0.3) { // 70% chance to use training data
      // Pick the best match
      const bestMatch = matchingTrainingData.sort((a, b) => 
        b.question.length - a.question.length // Prefer longer matches
      )[0];
      
      return bestMatch.answer;
    }
    
    // 2. Look for context in recent conversation (last 5 messages)
    const recentMessages = history.slice(-5);
    const hasAskedAbout = (topic: string) => 
      recentMessages.some(msg => 
        msg.role === "user" && msg.content.toLowerCase().includes(topic)
      );
    
    const hasRecentContext = (topic: string) =>
      recentMessages.some(msg => msg.context === topic);
    
    // 3. Generate contextual responses
    if (lowercaseQuery.includes("olá") || lowercaseQuery.includes("oi")) {
      if (history.length > 10) {
        return `Olá novamente! É bom ver você. Percebo que já conversamos algumas vezes. Como posso ajudar com suas vendas hoje?`;
      } else {
        return "Olá! Como posso ajudar você hoje com suas vendas?";
      }
    } else if (lowercaseQuery.includes("funil") || lowercaseQuery.includes("vendas")) {
      if (hasRecentContext("funil de vendas")) {
        return "Voltando ao tema de funis de vendas, posso oferecer diversas dicas para otimizar seu processo. Que parte específica do seu funil de vendas você gostaria de melhorar: prospecção, qualificação, negociação ou fechamento?";
      }
      return "Posso ajudar você a criar um funil de vendas otimizado. Basta ir à seção 'Funil com IA' no menu lateral e seguir as instruções para criar um funil personalizado para seu negócio. Nossa IA analisa seu mercado e público-alvo para recomendar as melhores etapas.";
    } else if (lowercaseQuery.includes("script") || lowercaseQuery.includes("texto")) {
      if (hasAskedAbout("exemplo")) {
        return "Aqui está um exemplo de script para primeiro contato: 'Olá [nome], percebi que sua empresa tem enfrentado desafios com [problema específico]. Ajudamos empresas como a sua a aumentar vendas em até 30% com nossa plataforma VendeAI. Teria 15 minutos para uma demonstração rápida de como podemos resolver esse problema específico?'";
      }
      return "Para gerar scripts de vendas automáticos, acesse a seção 'Scripts Automáticos'. Lá você pode criar textos persuasivos baseados no perfil do seu cliente e produto. Nossa IA analisa casos de sucesso do seu setor para criar argumentos convincentes e respostas para objeções comuns.";
    } else if (lowercaseQuery.includes("chatbot") || lowercaseQuery.includes("atendimento")) {
      return "O VendeAI possui um chatbot avançado para atendimento que pode ser configurado na seção 'Chatbot IA'. Ele aprende com as interações e se torna cada vez mais eficiente. Você pode treinar o bot com respostas para perguntas frequentes e definir fluxos de conversação para qualificação de leads.";
    } else if (lowercaseQuery.includes("plano") || lowercaseQuery.includes("preço")) {
      if (hasAskedAbout("diferença")) {
        return "A principal diferença entre os planos é que o Premium oferece recursos ilimitados de scripts e mensagens, enquanto o Profissional tem limites mensais. Além disso, o Premium inclui atendimento prioritário e acesso antecipado a novos recursos da plataforma.";
      }
      return "Temos três planos: Gratuito (R$0), Profissional (R$97/mês) e Premium (R$197/mês). Cada um oferece diferentes recursos. O plano gratuito permite experimentar as funcionalidades básicas, o Profissional é ideal para empreendedores e pequenos negócios, e o Premium para empresas que precisam de recursos avançados e sem limitações.";
    } else if (lowercaseQuery.includes("upgrade") || lowercaseQuery.includes("premium")) {
      return "Para fazer upgrade do seu plano, vá até 'Configurações > Planos e Faturamento'. Lá você pode comparar os recursos e escolher o plano ideal para o seu negócio. O processo leva menos de 2 minutos e você terá acesso imediato aos novos recursos. Temos uma garantia de satisfação de 7 dias para novos assinantes.";
    } else if (lowercaseQuery.includes("funcionalidade") || lowercaseQuery.includes("recursos")) {
      return "O VendeAI oferece: criação de funis de vendas com IA, geração de scripts automáticos, chatbot inteligente, controle de estoque, PDV integrado e extensão para navegador. Cada recurso é projetado para aumentar sua taxa de conversão e automatizar partes do processo de vendas. Qual desses recursos gostaria de saber mais?";
    } else if (hasAskedAbout("funcionalidade") && (lowercaseQuery.includes("mais") || lowercaseQuery.includes("outro"))) {
      return "Além dos recursos mencionados, também oferecemos análise de dados de vendas com insights acionáveis, integração com plataformas populares como Shopify e WooCommerce, e suporte dedicado para ajudar você a maximizar suas vendas. Nossa plataforma utiliza IA para identificar oportunidades de up-selling e cross-selling que você pode estar perdendo.";
    } else if (lowercaseQuery.includes("ajuda") || lowercaseQuery.includes("dúvida")) {
      return "Estou aqui para ajudar! Você pode me perguntar sobre como usar qualquer funcionalidade do VendeAI, detalhes sobre planos, ou solicitar dicas para aumentar suas vendas. Para melhor atendimento, tente descrever seu problema ou dúvida específica, e posso oferecer orientações personalizadas ou direcionar você para os tutoriais apropriados.";
    } else if (lowercaseQuery.includes("api") || lowercaseQuery.includes("deepseek") || lowercaseQuery.includes("openrouter")) {
      return "O VendeAI agora está integrado com modelos avançados de IA como o DeepSeek V3 através da API OpenRouter. Esta integração permite respostas mais contextuais e precisas para suas consultas de vendas. Para configurar, acesse as Configurações do Assistente e insira sua chave de API. Você também pode alternar facilmente entre o modelo padrão e os modelos avançados conforme sua necessidade.";
    } else {
      // Contextual awareness based on message history and user behavior
      const userMessageCount = history.filter(msg => msg.role === "user").length;
      
      // Personalize for new vs returning users
      let personalization = "";
      if (userMessageCount > 15) {
        personalization = "Como usuário frequente do VendeAI, ";
      } else if (userMessageCount > 5) {
        personalization = "Vejo que já está familiarizado com nossa plataforma. ";
      }
      
      return `${personalization}Entendi sua pergunta sobre "${query}". Como assistente avançado do VendeAI, posso ajudar com estratégias de vendas personalizadas, criação de funis otimizados, scripts persuasivos, configuração de chatbot e outras funcionalidades da plataforma. Com base em sua consulta, recomendo explorar a seção ${detectCategory(query)} da plataforma. Poderia elaborar um pouco mais sobre o que precisa especificamente?`;
    }
  };

  const detectCategory = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes("preço") || lowerQuestion.includes("plano") || lowerQuestion.includes("valor")) {
      return "preços";
    } else if (lowerQuestion.includes("funil") || lowerQuestion.includes("lead")) {
      return "funil de vendas";
    } else if (lowerQuestion.includes("script") || lowerQuestion.includes("texto")) {
      return "scripts";
    } else if (lowerQuestion.includes("estoque") || lowerQuestion.includes("produto")) {
      return "estoque";
    } else if (lowerQuestion.includes("pdv") || lowerQuestion.includes("ponto de venda")) {
      return "pdv";
    } else {
      return "geral";
    }
  };

  return {
    generateEnhancedResponse,
    detectCategory
  };
};
