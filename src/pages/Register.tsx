
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building, User, Mail, Lock, CheckCircle, ArrowLeft, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const registerSchema = z.object({
  companyName: z.string().min(1, "Nome da empresa é obrigatório"),
  ownerName: z.string().min(1, "Nome do responsável é obrigatório"),
  email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  referralCode: z.string().optional(),
  plan: z.enum(["free", "pro", "premium"], {
    required_error: "Selecione um plano",
  }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showReferralField, setShowReferralField] = useState(false);
  
  // Get the plan from URL state if available
  const preselectedPlan = location.state?.plan || "free";

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      companyName: "",
      ownerName: "",
      email: "",
      password: "",
      referralCode: "",
      plan: preselectedPlan,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    
    try {
      console.log("Register attempt with:", data);
      
      // Simulate API call - would generate activation key on backend
      // The key would be associated with email + IP + plan
      setTimeout(() => {
        // Generate a UUID (this would happen on backend)
        const dummyActivationKey = crypto.randomUUID();
        console.log("Generated activation key (invisible to user):", dummyActivationKey);
        
        // Check if referral code was used
        if (data.referralCode) {
          console.log("Referral code used:", data.referralCode);
          // In a real implementation, you would:
          // 1. Validate the referral code exists
          // 2. Credit the referrer with a new referral
          // 3. Apply any benefits to the new user
        }
        
        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Sua conta foi criada. Faça login para acessar a plataforma.",
        });
        
        // Redirect to login page
        navigate("/login");
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Erro ao criar conta",
        description: "Ocorreu um problema ao processar seu cadastro. Tente novamente.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const planInfo = {
    free: {
      name: "Gratuito",
      price: "R$0",
      features: ["Funil básico", "1 script de vendas/mês", "100 mensagens/mês"]
    },
    pro: {
      name: "Profissional",
      price: "R$97/mês",
      features: ["Funis ilimitados", "30 scripts/mês", "1.000 mensagens/mês"]
    },
    premium: {
      name: "Premium",
      price: "R$197/mês",
      features: ["Tudo do Pro", "Scripts ilimitados", "Mensagens ilimitadas"]
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
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-vendeai text-2xl">Criar sua conta</CardTitle>
                <CardDescription>
                  Comece a vender mais com inteligência artificial
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da empresa</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Building className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            {...field}
                            placeholder="Sua empresa"
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
                  name="ownerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do responsável</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            {...field}
                            placeholder="Seu nome completo"
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
                            placeholder="Mínimo 6 caracteres"
                            className="pl-10"
                            disabled={isLoading}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {showReferralField ? (
                  <FormField
                    control={form.control}
                    name="referralCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código de indicação (opcional)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Gift className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input
                              {...field}
                              placeholder="Ex: VENDE1234"
                              className="pl-10"
                              disabled={isLoading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="text-vendeai-gold w-full"
                    onClick={() => setShowReferralField(true)}
                  >
                    <Gift className="mr-2 h-4 w-4" />
                    Tenho um código de indicação
                  </Button>
                )}
                
                <FormField
                  control={form.control}
                  name="plan"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Escolha seu plano</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="space-y-2"
                          disabled={isLoading}
                        >
                          {Object.entries(planInfo).map(([planKey, plan]) => (
                            <div 
                              key={planKey}
                              className={`flex items-center space-x-2 rounded-lg border p-3 cursor-pointer hover:bg-muted transition-colors ${
                                field.value === planKey ? 'border-vendeai-gold bg-muted/20' : 'border-gray-200'
                              }`}
                              onClick={() => form.setValue('plan', planKey as any)}
                            >
                              <RadioGroupItem value={planKey} id={`plan-${planKey}`} />
                              <div className="flex-1">
                                <label 
                                  htmlFor={`plan-${planKey}`} 
                                  className="text-sm font-medium cursor-pointer"
                                >
                                  {plan.name} - <span className="text-vendeai-gold">{plan.price}</span>
                                </label>
                                <p className="text-xs text-muted-foreground">
                                  {plan.features.join(' • ')}
                                </p>
                              </div>
                              {field.value === planKey && (
                                <CheckCircle className="h-5 w-5 text-vendeai-gold" />
                              )}
                            </div>
                          ))}
                        </RadioGroup>
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
                  {isLoading ? "Criando conta..." : "Criar conta"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-vendeai-gold/10 pt-4">
            <div className="text-sm text-center">
              Já possui uma conta?{" "}
              <Link to="/login" className="text-vendeai-gold hover:underline font-medium">
                Fazer login
              </Link>
            </div>
          </CardFooter>
        </Card>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-vendeai-lightgray">
            Ao criar uma conta, você concorda com nossos <a href="#" className="text-vendeai-gold hover:underline">Termos de Serviço</a> e <a href="#" className="text-vendeai-gold hover:underline">Política de Privacidade</a>.
          </p>
          <p className="text-xs text-vendeai-gold mt-2">
            Use de forma exclusiva. Indique para ganhar benefícios.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
