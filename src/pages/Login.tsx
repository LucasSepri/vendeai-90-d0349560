
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres")
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [ipAddress, setIpAddress] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  useState(() => {
    const getIpAddress = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error("Failed to get IP address:", error);
        setIpAddress("127.0.0.1");
      }
    };
    getIpAddress();
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setLoginError("");
    try {
      const users = JSON.parse(localStorage.getItem('vendeai_users') || '[]');
      const user = users.find((u: any) => u.email === data.email);
      
      if (!user) {
        setLoginError("Conta não encontrada. Verifique seus dados ou crie uma conta.");
        setIsLoading(false);
        return;
      }
      
      if (user.password !== data.password) {
        setLoginError("Senha incorreta. Tente novamente.");
        setIsLoading(false);
        return;
      }
      
      if (user.ipAddress && user.ipAddress !== ipAddress) {
        setLoginError("Acesso não autorizado. Esta conta só pode ser acessada do dispositivo original.");
        setIsLoading(false);
        return;
      }
      
      localStorage.setItem('vendeai_currentUser', JSON.stringify({
        email: user.email,
        referralCode: user.referralCode,
        companyName: user.companyName,
        ownerName: user.ownerName,
        plan: user.plan,
        referrals: user.referrals || 0,
        ipAddress: ipAddress
      }));
      
      toast({
        title: "Login bem-sucedido",
        description: "Bem-vindo de volta ao VendeAI!"
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Ocorreu um problema ao processar seu login. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black overflow-hidden">
      {/* Coluna do formulário */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col justify-center p-6 md:p-12 lg:p-16 relative z-10">
        <div className="max-w-md mx-auto w-full">
          {/* Logo */}
          <div className="mb-8">
            <Link to="/" className="inline-block">
              <img 
                alt="Lucre AI Logo" 
                src="/lovable-uploads/d8f0ed69-36f2-4092-bc51-10156dca574a.png" 
                className="h-16 object-contain"
              />
            </Link>
          </div>
          
          {/* Título e subtítulo */}
          <div className="mb-8">
            <h1 className="text-2xl font-medium text-white mb-2">Acesse sua conta</h1>
            <p className="text-white/70">
              Se você já possui uma conta, preencha seus dados de acesso à plataforma.
            </p>
          </div>
          
          {/* Mensagem de erro */}
          {loginError && (
            <div className="mb-6 p-3 bg-destructive/20 border border-destructive/50 rounded-md flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{loginError}</p>
            </div>
          )}
          
          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm text-white/90 font-medium">
                Seu E-mail
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com.br"
                  className={`login-input ${errors.email ? 'border-destructive' : ''}`}
                  disabled={isLoading}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>
            
            {/* Senha */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm text-white/90 font-medium">
                Sua Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`login-input pr-10 ${errors.password ? 'border-destructive' : ''}`}
                  disabled={isLoading}
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>
            
            {/* Botão de login */}
            <button
              type="submit"
              className="login-button mt-6"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Acessar sua conta"}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </button>
            
            {/* Links auxiliares */}
            <div className="flex justify-between pt-4 border-t border-white/10 mt-6 text-sm">
              <Link to="/forgot-password" className="text-white/70 hover:text-vendeai-gold transition-colors">
                Esqueceu sua senha?
              </Link>
              
              <Link to="/register" className="text-white/70 hover:text-white flex items-center gap-1 group transition-colors">
                Criar uma nova conta
                <ArrowRight className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </form>
        </div>
      </div>
      
      {/* Coluna da imagem/tagline */}
      <div className="w-full md:w-1/2 lg:w-3/5 hidden md:flex items-center justify-center relative overflow-hidden login-gradient">
        {/* Efeitos de luz */}
        <div className="light-spot bg-vendeai-gold/30 w-96 h-96 top-1/4 -left-24"></div>
        <div className="light-spot bg-purple-700/40 w-96 h-96 bottom-1/4 right-1/4"></div>
        
        {/* Tagline */}
        <div className="max-w-lg px-10">
          <h2 className="tagline">
            Você é <span className="login-highlight">único.</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
