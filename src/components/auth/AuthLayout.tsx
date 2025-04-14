
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  rightText?: string;
  logoPath?: string;
}

const AuthLayout = ({ 
  children, 
  title, 
  subtitle, 
  rightText = "Você é único.", 
  logoPath = "/lovable-uploads/d8f0ed69-36f2-4092-bc51-10156dca574a.png" 
}: AuthLayoutProps) => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left panel - Form container */}
      <div className="w-full bg-black p-8 md:w-[480px] flex flex-col justify-between relative z-10">
        <div className="mb-8">
          <Link to="/" className="inline-block">
            <img src={logoPath} alt="LucreAI Logo" className="h-16 object-contain" />
          </Link>
        </div>
        
        <div className="flex-1 flex flex-col">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-white mb-2">{title}</h1>
            {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
          </div>
          
          <div className="glass-card backdrop-blur-md bg-white/5 border border-vendeai-gold/20 rounded-xl p-6 shadow-xl">
            {children}
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-vendeai-gold/20 text-xs text-gray-500">
          <div className="flex justify-between">
            <p>© {new Date().getFullYear()} LucreAI. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
      
      {/* Right panel - Decorative background */}
      <div className="hidden md:flex md:flex-1 bg-gradient-to-br from-vendeai-darkgold via-black to-vendeai-gold relative items-center justify-center p-12">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-lg mx-auto text-center">
          <h2 className="text-8xl font-bold text-white leading-tight">
            {rightText.split('.')[0]}<span className="text-vendeai-gold">.</span>
          </h2>
          <p className="mt-6 text-xl text-white/80">
            Transforme seus negócios com inteligência artificial
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
