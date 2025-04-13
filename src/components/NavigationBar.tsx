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
    <header className="fixed w-full top-0 z-50 bg-vendeai/95 backdrop-blur-sm border-b border-vendeai-gold/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/7f27bfb7-609f-4838-a53c-09a2636b94b8.png" 
                alt="Lucre AI Logo" 
                className="h-10 mr-2"
              />
              <span className="text-2xl font-semibold text-white mr-2">Lucre<span className="text-vendeai-gold">AI</span></span>
              <span className="text-xs text-vendeai-gold">por Vendigit</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#recursos" className="text-white hover:text-vendeai-gold transition duration-300">Recursos</a>
            <a href="#como-funciona" className="text-white hover:text-vendeai-gold transition duration-300">Como Funciona</a>
            <a href="#planos" className="text-white hover:text-vendeai-gold transition duration-300">Planos</a>
            <a href="#depoimentos" className="text-white hover:text-vendeai-gold transition duration-300">Depoimentos</a>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-white hover:text-vendeai-gold transition duration-300">
                Login
              </Link>
              <Button className="btn-primary" asChild>
                <Link to="/register">Começar Grátis</Link>
              </Button>
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden bg-vendeai pt-4 pb-6 px-4 mt-2 rounded-lg border border-vendeai-gold/20 shadow-lg animate-fade-in">
            <div className="flex flex-col space-y-4">
              <a href="#recursos" className="text-white hover:text-vendeai-gold transition duration-300 py-2" onClick={toggleMenu}>Recursos</a>
              <a href="#como-funciona" className="text-white hover:text-vendeai-gold transition duration-300 py-2" onClick={toggleMenu}>Como Funciona</a>
              <a href="#planos" className="text-white hover:text-vendeai-gold transition duration-300 py-2" onClick={toggleMenu}>Planos</a>
              <a href="#depoimentos" className="text-white hover:text-vendeai-gold transition duration-300 py-2" onClick={toggleMenu}>Depoimentos</a>
              <Link to="/login" className="text-white hover:text-vendeai-gold transition duration-300 py-2" onClick={toggleMenu}>
                Login
              </Link>
              <Button className="btn-primary w-full mt-2" asChild>
                <Link to="/register" onClick={toggleMenu}>Começar Grátis</Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default NavigationBar;
