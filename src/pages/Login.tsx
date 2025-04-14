
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
    // Implementação futura do login
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen w-full bg-black relative overflow-hidden">
      {/* Efeitos de luz no fundo */}
      <div className="absolute top-[20%] left-[5%] w-[300px] h-[300px] rounded-full bg-[#a66717]/20 blur-[100px] z-0"></div>
      <div className="absolute bottom-[15%] right-[10%] w-[250px] h-[250px] rounded-full bg-white/10 blur-[100px] z-0"></div>
      
      {/* Card de login (lado esquerdo) */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 lg:w-[500px] p-6 z-10">
        <div className="backdrop-blur-xl bg-black/40 border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)] rounded-xl p-10 w-full max-w-[440px]">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <img 
              src="/lovable-uploads/a82f2ab5-9796-41d6-a7b6-2ab258f14a9b.png" 
              alt="Lucre AI Logo" 
              className="h-12 mb-6" 
            />
            <h1 className="text-2xl font-semibold text-white">Acesse sua conta</h1>
          </div>
          
          {/* Texto descritivo */}
          <p className="text-white/70 text-sm mb-6">
            Se você já possui uma conta, preencha seus dados de acesso à plataforma.
          </p>
          
          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Input
                type="email"
                placeholder="Seu E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border border-white/20 text-white h-12 w-full px-4 rounded-lg 
                          focus:border-[#a66717] focus:ring-1 focus:ring-[#a66717] transition-all duration-300
                          placeholder:text-white/60"
                required
              />
            </div>
            
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Sua Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent border border-white/20 text-white h-12 w-full px-4 rounded-lg 
                          focus:border-[#a66717] focus:ring-1 focus:ring-[#a66717] transition-all duration-300
                          placeholder:text-white/60"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-white hover:bg-[#a66717] hover:text-white text-black flex items-center justify-center font-medium text-base transition-colors"
            >
              Acessar sua conta 
              <span className="ml-2">→</span>
            </Button>
          </form>
          
          {/* Separador */}
          <div className="h-px bg-white/10 my-6"></div>
          
          {/* Links */}
          <div className="flex justify-between items-center text-sm">
            <Link to="/forgot-password" className="text-white/70 hover:text-white transition-colors">
              Esqueceu sua senha?
            </Link>
            <Link to="/register" className="text-white/70 hover:text-white transition-colors flex items-center group">
              Criar uma nova conta 
              <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Lado direito com a frase */}
      <div className="hidden md:flex flex-col justify-center items-start w-1/2 p-12 z-10">
        <h2 className="text-7xl font-bold text-white leading-tight">
          Você<br/>é <span className="text-[#a66717]">único.</span>
        </h2>
      </div>
    </div>
  );
};

export default Login;
