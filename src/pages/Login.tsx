
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login attempt', { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-black/90 to-vendeai-gold/30 p-4">
      <div className="w-full max-w-md bg-black/80 rounded-xl shadow-2xl border border-vendeai-gold/30 p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Acesse sua conta</h1>
          <p className="text-gray-400">Se você já possui uma conta, preencha seus dados de acesso à plataforma.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Seu E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-black/50 border border-vendeai-gold/30 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-vendeai-gold"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Sua Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-black/50 border border-vendeai-gold/30 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-vendeai-gold"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-vendeai-gold"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-vendeai-gold text-black hover:bg-vendeai-gold/90 transition-colors"
          >
            Acessar sua conta →
          </Button>
        </form>

        <div className="text-center text-sm">
          <a href="#" className="text-gray-400 hover:text-vendeai-gold">Esqueceu sua senha?</a>
          <span className="mx-2 text-gray-600">|</span>
          <a href="#" className="text-gray-400 hover:text-vendeai-gold">Criar uma nova conta →</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
