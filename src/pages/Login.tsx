
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, Mail, AlertTriangle } from "lucide-react";
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      console.log("Login attempt with:", data);
      
      // Simulate login verification and IP checking
      // In a real implementation, you would:
      // 1. Check if the email exists in the database
      // 2. Verify the password
      // 3. Verify the IP matches the registration IP
      
      // For demo purposes, we're simulating a successful login after validation
      const emailExists = true; // This would come from your backend
      const ipMatches = true; // This would be checked on your backend
      
      if (!emailExists) {
        setErrorMessage("Conta não encontrada. Verifique seus dados ou crie uma conta.");
        setIsLoading(false);
        return;
      }
      
      if (!ipMatches) {
        setErrorMessage("Acesso negado. Esta conta só pode ser acessada do IP original de cadastro.");
        toast({
          variant: "destructive",
          title: "Acesso negado",
          description: "Por segurança, esta conta só pode ser acessada do IP original de cadastro. Entre em contato com o suporte se precisar de ajuda.",
        });
        setIsLoading(false);
        return;
      }
      
      // Simulate server delay
      setTimeout(() => {
        toast({
          title: "Login bem-sucedido",
          description: "Bem-vindo ao VendeAI!",
        });
        
        // Redirect to dashboard
        navigate("/dashboard");
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Ocorreu um problema durante o processo de login. Tente novamente.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-vendeai flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-block">
            <div className="flex justify-center mb-2">
              <img 
                src="/lovable-uploads/9cfbc124-fed8-43bf-9903-c387d361d0ed.png" 
                alt="Vendigit Logo" 
                className="h-12"
              />
            </div>
            <div className="text-2xl font-semibold text-white">
              Vende<span className="text-vendeai-gold">AI</span>
            </div>
          </Link>
          <p className="text-vendeai-lightgray text-sm mt-2">por Vendigit</p>
        </div>
        
        <Card className="border-vendeai-gold/20 shadow-lg bg-vendeai-darkgray text-white">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Acessar sua conta</CardTitle>
            <CardDescription className="text-vendeai-lightgray">
              Digite suas credenciais para acessar a plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-900/30 text-red-200 rounded-md flex items-start border border-red-500/30">
                <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-red-400" />
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">E-mail</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-vendeai-gold" />
                          <Input
                            {...field}
                            placeholder="seu@email.com.br"
                            type="email"
                            className="pl-10 bg-vendeai border-vendeai-gold/20 text-white placeholder:text-vendeai-lightgray/50"
                            disabled={isLoading}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-vendeai-gold" />
                          <Input
                            {...field}
                            type="password"
                            placeholder="********"
                            className="pl-10 bg-vendeai border-vendeai-gold/20 text-white placeholder:text-vendeai-lightgray/50"
                            disabled={isLoading}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full gradient-gold" 
                  disabled={isLoading}
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </Form>
            
            <div className="mt-4 text-sm text-center">
              <Link to="/forgot-password" className="text-vendeai-gold hover:underline">
                Esqueceu sua senha?
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-vendeai-gold/10 pt-4">
            <div className="text-sm text-center">
              Não tem uma conta?{" "}
              <Link to="/register" className="text-vendeai-gold hover:underline font-medium">
                Criar conta agora
              </Link>
            </div>
          </CardFooter>
        </Card>
        
        <div className="mt-6 text-center">
          <div className="flex items-center gap-2 justify-center text-vendeai-lightgray">
            <AlertTriangle size={16} className="text-vendeai-gold" />
            <p className="text-xs">Acesso exclusivo para usuários registrados</p>
          </div>
          <p className="text-xs text-vendeai-lightgray mt-2">
            Use de forma exclusiva. Indique para ganhar benefícios.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
