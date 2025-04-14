
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, AlertTriangle, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AuthLayout from "@/components/auth/AuthLayout";

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

  useEffect(() => {
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
  }, []);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
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

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <AuthLayout 
      title="Acesse sua conta" 
      subtitle="Se você já possui uma conta, preencha seus dados de acesso à plataforma."
    >
      {loginError && (
        <div className="mb-6 p-3 bg-destructive/10 border border-destructive/30 rounded-md flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <p className="text-sm text-destructive">{loginError}</p>
        </div>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      {...field}
                      placeholder="Seu E-mail"
                      type="email"
                      className="bg-black border-vendeai-gold/30 focus:border-vendeai-gold pl-10 h-12 text-white"
                      disabled={isLoading}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Sua Senha"
                      className="bg-black border-vendeai-gold/30 focus:border-vendeai-gold pl-10 pr-10 h-12 text-white"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="pt-2">
            <Button
              type="submit"
              className="w-full bg-white hover:bg-gray-100 text-black font-medium h-12 flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Acessar sua conta"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
      
      <div className="flex justify-between mt-8 text-sm">
        <Link to="/forgot-password" className="text-gray-400 hover:text-vendeai-gold transition-colors">
          Esqueceu sua senha?
        </Link>
        <Link to="/register" className="text-vendeai-gold hover:text-vendeai-lightgold transition-colors flex items-center gap-1">
          Criar uma nova conta <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
