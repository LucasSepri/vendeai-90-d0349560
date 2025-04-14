
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
    <div className="flex h-screen w-full overflow-hidden bg-black">
      {/* Left panel - Form container */}
      <div className="w-full lg:w-[480px] flex flex-col justify-between relative z-10 p-8">
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
          
          <div className="backdrop-blur-md bg-white/5 border border-vendeai-gold/20 rounded-xl p-6 shadow-xl">
            {children}
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-vendeai-gold/20 text-xs text-gray-500">
          <div className="flex justify-between">
            <p>© {new Date().getFullYear()} LucreAI. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
      
      {/* Right panel - Decorative background with gradient */}
      <div className="hidden lg:block lg:flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-vendeai-darkgold/30 via-black to-vendeai-gold/20"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="px-8">
            <h2 className="text-[120px] font-bold text-white tracking-tight leading-none">
              {rightText.split('.')[0]}<span className="text-vendeai-gold">.</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
