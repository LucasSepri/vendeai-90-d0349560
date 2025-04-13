
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
const Footer = () => {
  return <footer className="bg-vendeai text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <a href="/" className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/a82f2ab5-9796-41d6-a7b6-2ab258f14a9b.png" 
                alt="Lucre AI Logo" 
                className="h-16 mb-2"
              />
            </a>
            <p className="text-gray-400 mb-4">
              Transformando pequenos e médios negócios com automação de vendas inteligente.
            </p>
            <p className="text-sm text-gray-400">© 2025 Vendigit. Todos os direitos reservados.</p>
          </div>
          
          <div>
            <h3 className="text-vendeai-gold font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-vendeai-gold transition duration-300">Funis de Vendas</a></li>
              <li><a href="#" className="text-gray-400 hover:text-vendeai-gold transition duration-300">Scripts de Vendas</a></li>
              <li><a href="#" className="text-gray-400 hover:text-vendeai-gold transition duration-300">Chatbot IA</a></li>
              <li><a href="#" className="text-gray-400 hover:text-vendeai-gold transition duration-300">Controle de Estoque</a></li>
              <li><a href="#" className="text-gray-400 hover:text-vendeai-gold transition duration-300">PDV Integrado</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-vendeai-gold font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-vendeai-gold transition duration-300">Sobre Nós</a></li>
              <li><a href="#" className="text-gray-400 hover:text-vendeai-gold transition duration-300">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-vendeai-gold transition duration-300">Carreiras</a></li>
              <li><a href="#" className="text-gray-400 hover:text-vendeai-gold transition duration-300">Contato</a></li>
              <li><a href="#" className="text-gray-400 hover:text-vendeai-gold transition duration-300">Seja um Parceiro</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-vendeai-gold font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-vendeai-gold transition duration-300">Termos de Serviço</a></li>
              <li><a href="#" className="text-gray-400 hover:text-vendeai-gold transition duration-300">Política de Privacidade</a></li>
              <li><a href="#" className="text-gray-400 hover:text-vendeai-gold transition duration-300">Cookies</a></li>
            </ul>
            
            <h3 className="text-vendeai-gold font-semibold mt-6 mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-vendeai-gold transition duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-vendeai-gold transition duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-vendeai-gold transition duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-vendeai-gold transition duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-vendeai-gold/20 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>Desenvolvido com ❤️ pela <span className="text-vendeai-gold">Vendigit</span> - Transformando negócios com tecnologia.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;
