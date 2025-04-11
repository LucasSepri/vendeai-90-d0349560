
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

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    
    // Simulate login verification (replace with actual auth logic)
    try {
      console.log("Login attempt with:", data);
      
      // Simulate a successful login
      setTimeout(() => {
        toast({
          title: "Login bem-sucedido",
          description: "Bem-vindo ao VendeAI!",
        });
        navigate("/dashboard");
        setIsLoading(false);
      }, 1500);
      
      // For future implementation: IP validation would happen here
      // If IP doesn't match, show warning and require 2FA
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente",
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
        
        <Card className="border-vendeai-gold/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-vendeai text-2xl">Acessar sua conta</CardTitle>
            <CardDescription>
              Digite suas credenciais para acessar a plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            {...field}
                            placeholder="seu@email.com.br"
                            type="email"
                            className="pl-10"
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
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            {...field}
                            type="password"
                            placeholder="********"
                            className="pl-10"
                            disabled={isLoading}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
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
            <AlertTriangle size={16} />
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
