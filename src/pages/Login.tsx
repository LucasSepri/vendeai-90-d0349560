
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
      {/* Efeito de luz dourada */}
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-[#a66717]/20 blur-[100px] z-0"></div>
      
      {/* Efeito de luz branca */}
      <div className="absolute bottom-[15%] right-[10%] w-[250px] h-[250px] rounded-full bg-white/10 blur-[100px] z-0"></div>
      
      {/* Card de Login com Glassmorphism */}
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 lg:w-2/5 xl:w-1/3 p-8 z-10">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] rounded-3xl p-8 w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <img 
              src="/lovable-uploads/a82f2ab5-9796-41d6-a7b6-2ab258f14a9b.png" 
              alt="Lucre AI Logo" 
              className="h-12 mb-6" 
            />
            <h1 className="text-2xl font-semibold text-white">Acesse sua conta</h1>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-white/80">
                Seu E-mail
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-white/80">
                Sua Senha
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/5 border-white/10 text-white pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-[#a66717] hover:bg-[#b77828] text-white flex items-center justify-center group"
            >
              Acessar sua conta 
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Button>
            
            <div className="flex flex-col space-y-4 items-center text-sm">
              <Link to="/forgot-password" className="text-white/70 hover:text-white transition-colors">
                Esqueceu sua senha?
              </Link>
              <Link to="/register" className="text-white/70 hover:text-white transition-colors flex items-center group">
                Criar uma nova conta 
                <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
      
      {/* Lado direito com a frase */}
      <div className="hidden md:flex flex-col justify-center items-start w-1/2 p-12 z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Você é <span className="text-[#a66717]">único.</span>
        </h2>
      </div>
    </div>
  );
};

export default Login;
