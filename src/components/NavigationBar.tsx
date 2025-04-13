
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="fixed w-full top-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img alt="Lucre AI Logo" src="/lovable-uploads/1d42bd64-bc31-432a-b220-e8f892382a0c.png" className="h-24 object-contain" />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-white hover:text-vendeai-gold transition duration-300 px-4 py-2">
              Entrar
            </Link>
            <Button className="rounded-full bg-vendeai-gold hover:bg-vendeai-darkgold text-white" asChild>
              <Link to="/register">Criar conta</Link>
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <button className="md:hidden text-white focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden bg-vendeai pt-4 pb-6 px-4 mt-2 rounded-lg border border-vendeai-gold/20 shadow-lg animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/login" className="text-white hover:text-vendeai-gold transition duration-300 py-2" onClick={toggleMenu}>
                Entrar
              </Link>
              <Button className="rounded-full bg-vendeai-gold hover:bg-vendeai-darkgold text-white" asChild>
                <Link to="/register" onClick={toggleMenu}>Criar conta</Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default NavigationBar;
