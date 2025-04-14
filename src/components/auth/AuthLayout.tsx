
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  buttonText: string;
  onSubmit: (e: React.FormEvent) => void;
  forgotPasswordLink?: boolean;
  alternateActionText?: string;
  alternateActionLink?: string;
  alternateActionLinkText?: string;
}

const AuthLayout = ({
  title,
  subtitle,
  children,
  buttonText,
  onSubmit,
  forgotPasswordLink = false,
  alternateActionText,
  alternateActionLink,
  alternateActionLinkText
}: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-[500px] bg-black flex flex-col p-8 md:p-12">
        <div className="mb-8">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-12">
            <img 
              src="/lovable-uploads/a82f2ab5-9796-41d6-a7b6-2ab258f14a9b.png" 
              alt="Lucre AI Logo" 
              className="h-10 w-10" 
            />
            <span className="text-white text-2xl font-bold">Lucre AI</span>
          </div>
          
          <h1 className="text-white text-2xl font-bold mb-4">{title}</h1>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>

        <form onSubmit={onSubmit} className="flex-1 flex flex-col">
          <div className="space-y-6 flex-1">
            {children}
          </div>

          <button
            type="submit"
            className="w-full bg-white hover:bg-gray-100 text-black font-medium py-3 px-4 rounded mt-6 flex items-center justify-center"
          >
            {buttonText} <ArrowRight className="ml-2 h-4 w-4" />
          </button>
          
          <div className="mt-6 flex justify-between items-center">
            {forgotPasswordLink && (
              <Link to="/forgot-password" className="text-sm text-gray-400 hover:text-gold-500 transition">
                Esqueceu sua senha?
              </Link>
            )}
            
            {alternateActionText && alternateActionLink && alternateActionLinkText && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">{alternateActionText}</span>
                <Link 
                  to={alternateActionLink} 
                  className="text-sm text-white hover:text-gold-500 transition flex items-center"
                >
                  {alternateActionLinkText} <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right Panel - Image/Slogan */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/d75ecb04-b660-4c1a-a8e8-9106b3cc1f3e.png')] bg-cover bg-right opacity-40"></div>
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <div className="text-center p-12">
            <h2 className="text-white text-7xl font-bold mb-4">Você</h2>
            <h2 className="text-white text-7xl font-bold">é único<span className="text-gold-500">.</span></h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
