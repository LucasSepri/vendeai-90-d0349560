import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return <header className="w-full bg-black border-b border-vendeai-gold/20 py-0">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img alt="Lucre AI Logo" src="/lovable-uploads/1d42bd64-bc31-432a-b220-e8f892382a0c.png" className="h-24 object-contain" />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/login" className="text-white hover:text-vendeai-gold transition-all duration-300 flex items-center">
              <LogIn size={18} className="mr-2" />
              <span>Entrar</span>
            </Link>
            <Button className="bg-transparent hover:bg-vendeai-gold text-white border border-vendeai-gold hover:text-black rounded-md transition-all duration-300 flex items-center group" asChild>
              <Link to="/register">
                <UserPlus size={18} className="mr-2 transition-all duration-300" />
                <span>Criar conta</span>
                
              </Link>
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <button className="md:hidden text-white focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && <nav className="md:hidden bg-black pt-4 pb-6 px-4 mt-2 rounded-lg border border-vendeai-gold/20 shadow-lg animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/login" className="text-white hover:text-vendeai-gold transition duration-300 py-2 flex items-center" onClick={toggleMenu}>
                <LogIn size={18} className="mr-2" />
                <span>Entrar</span>
              </Link>
              <Button className="bg-transparent hover:bg-vendeai-gold text-white border border-vendeai-gold hover:text-black rounded-md transition-all duration-300 flex items-center" asChild>
                <Link to="/register" onClick={toggleMenu}>
                  <UserPlus size={18} className="mr-2" />
                  <span>Criar conta</span>
                </Link>
              </Button>
            </div>
          </nav>}
      </div>
    </header>;
};
export default NavigationBar;