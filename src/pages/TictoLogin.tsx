
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TictoLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for authentication logic
    console.log("Login attempt with:", { email, password });
  };

  return (
    <div className="min-h-screen ticto-bg flex flex-col md:flex-row">
      {/* Formulário de login (lado esquerdo) */}
      <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/3 flex justify-center items-center p-4">
        <div className="w-full max-w-md bg-ticto-card rounded-lg p-8 backdrop-blur-md">
          {/* Logo */}
          <div className="mb-8">
            <div className="text-white text-3xl font-bold flex items-center">
              <div className="w-10 h-10 bg-white text-black flex items-center justify-center rounded mr-2">
                <span className="text-xl font-bold">T</span>
              </div>
              <span>ticto</span>
            </div>
          </div>

          {/* Título e instruções */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2">Acesse sua conta</h2>
            <p className="text-gray-400 text-sm">
              Se você já possui uma conta, preencha seus dados de acesso à plataforma.
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="email"
                placeholder="Seu E-mail"
                className="ticto-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Sua Senha"
                className="ticto-input pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-0 top-3 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <Button type="submit" className="ticto-button w-full">
              Acessar sua conta <ArrowRight size={18} className="ml-2" />
            </Button>
          </form>

          {/* Links adicionais */}
          <div className="mt-6 flex justify-between items-center">
            <a href="#" className="text-sm text-gray-400 hover:text-ticto-gold">
              Esqueceu sua senha?
            </a>
            <a href="#" className="text-sm text-white flex items-center hover:text-ticto-gold">
              Criar uma nova conta <ArrowRight size={16} className="ml-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Lado direito - Frase e gradiente */}
      <div className="hidden md:flex w-1/2 lg:w-3/5 xl:w-2/3 bg-gradient-to-br from-black via-black to-ticto-gold/30 items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-6xl lg:text-7xl xl:text-8xl font-light text-white">
            Você <br />é único<span className="text-ticto-gold">.</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default TictoLogin;
