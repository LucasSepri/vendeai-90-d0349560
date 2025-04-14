
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration attempt with:', { name, email, password });
  };

  return (
    <AuthLayout
      title="Crie sua conta"
      subtitle="Preencha os dados abaixo para criar sua conta e acessar a plataforma."
      buttonText="Criar conta"
      onSubmit={handleSubmit}
      alternateActionText="Já possui uma conta?"
      alternateActionLink="/login"
      alternateActionLinkText="Acessar sua conta"
    >
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <User className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            className="w-full bg-black border border-gray-700 text-white rounded p-3 pl-10 focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
            placeholder="Seu Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Mail className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="email"
            className="w-full bg-black border border-gray-700 text-white rounded p-3 pl-10 focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
            placeholder="Seu E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Lock className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full bg-black border border-gray-700 text-white rounded p-3 pl-10 pr-10 focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
            placeholder="Sua Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-500" />
            ) : (
              <Eye className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
