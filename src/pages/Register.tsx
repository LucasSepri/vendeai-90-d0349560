
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building, User, Mail, Lock, CheckCircle, ArrowRight, ArrowLeft, Users, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AuthLayout from "@/components/auth/AuthLayout";

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
  const [ipAddress, setIpAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const preselectedPlan = location.state?.plan || "free";

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
      const activationKey = crypto.randomUUID();
      
      const referralCode = "VENDE" + Math.floor(1000 + Math.random() * 9000);
      
      const usedReferralCode = data.referralCode ? data.referralCode.trim() : null;
      
      const userData = {
        companyName: data.companyName,
        ownerName: data.ownerName,
        email: data.email,
        password: data.password,
        plan: data.plan,
        ipAddress: ipAddress,
        activationKey: activationKey,
        referralCode: referralCode,
        usedReferralCode: usedReferralCode,
        referrals: 0,
        registrationDate: new Date().toISOString(),
        isActive: true
      };
      
      const existingUsers = JSON.parse(localStorage.getItem('vendeai_users') || '[]');
      
      const emailExists = existingUsers.some((user: any) => user.email === data.email);
      if (emailExists) {
        toast({
          title: "E-mail já cadastrado",
          description: "Este e-mail já possui uma conta. Faça login.",
          variant: "destructive"
        });
        setIsLoading(false);
        navigate("/login");
        return;
      }
      
      existingUsers.push(userData);
      localStorage.setItem('vendeai_users', JSON.stringify(existingUsers));
      
      if (usedReferralCode) {
        const updatedUsers = existingUsers.map((user: any) => {
          if (user.referralCode === usedReferralCode) {
            return {
              ...user,
              referrals: (user.referrals || 0) + 1
            };
          }
          return user;
        });
        localStorage.setItem('vendeai_users', JSON.stringify(updatedUsers));
      }
      
      localStorage.setItem('vendeai_currentUser', JSON.stringify({
        email: data.email,
        referralCode: referralCode,
        ipAddress: ipAddress
      }));
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Bem-vindo à LucreAI. Faça login para acessar sua conta.",
      });
      
      navigate("/login");
      setIsLoading(false);
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

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <AuthLayout
      title="Criar sua conta"
      subtitle="Comece a vender mais com inteligência artificial"
      rightText="Vamos crescer juntos."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Building className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      {...field}
                      placeholder="Nome da empresa"
                      className="bg-transparent border-vendeai-gold/30 focus:border-vendeai-gold pl-10 h-12 text-white"
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
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      {...field}
                      placeholder="Nome do responsável"
                      className="bg-transparent border-vendeai-gold/30 focus:border-vendeai-gold pl-10 h-12 text-white"
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
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      {...field}
                      placeholder="Seu e-mail"
                      type="email"
                      className="bg-transparent border-vendeai-gold/30 focus:border-vendeai-gold pl-10 h-12 text-white"
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
                      placeholder="Crie sua senha"
                      className="bg-transparent border-vendeai-gold/30 focus:border-vendeai-gold pl-10 pr-10 h-12 text-white"
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
          
          <FormField
            control={form.control}
            name="referralCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      {...field}
                      placeholder="Código de indicação (opcional)"
                      className="bg-transparent border-vendeai-gold/30 focus:border-vendeai-gold pl-10 h-12 text-white"
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
            name="plan"
            render={({ field }) => (
              <FormItem className="space-y-3 pt-2">
                <FormLabel className="text-gray-400 text-xs">Escolha seu plano</FormLabel>
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
                        className={`flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-black/60 backdrop-blur-sm transition-colors ${
                          field.value === planKey ? 'border-vendeai-gold bg-white/5' : 'border-gray-800 bg-transparent'
                        }`}
                        onClick={() => form.setValue('plan', planKey as any)}
                      >
                        <RadioGroupItem 
                          value={planKey} 
                          id={`plan-${planKey}`}
                          className="border-vendeai-gold text-vendeai-gold"
                        />
                        <div className="flex-1">
                          <label 
                            htmlFor={`plan-${planKey}`} 
                            className="text-sm font-medium cursor-pointer text-white"
                          >
                            {plan.name} - <span className="text-vendeai-gold">{plan.price}</span>
                          </label>
                          <p className="text-xs text-gray-400">
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
          
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-vendeai-darkgold to-vendeai-gold hover:from-vendeai-gold hover:to-vendeai-darkgold text-white font-medium h-12 flex items-center justify-center gap-2 shadow-lg" 
              disabled={isLoading}
            >
              {isLoading ? "Criando conta..." : "Criar conta"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
      
      <div className="flex justify-center mt-8 text-sm">
        <Link to="/login" className="text-vendeai-gold hover:text-vendeai-lightgold transition-colors flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" /> Já possui uma conta? Faça login
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Register;
