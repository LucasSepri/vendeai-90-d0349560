
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, Check, X, ExternalLink, RefreshCw } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export function DomainsSection() {
  const [domainName, setDomainName] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<null | { available: boolean; message: string }>(null);
  const [useSubdomain, setUseSubdomain] = useState(true);
  const subdomain = "seu-negocio.vendeai.com";

  const checkDomainAvailability = () => {
    if (!domainName) return;
    
    setIsChecking(true);
    setCheckResult(null);
    
    // Simulação de verificação de disponibilidade
    setTimeout(() => {
      // Simula um resultado aleatório para fins de demonstração
      const available = Math.random() > 0.5;
      setCheckResult({
        available,
        message: available 
          ? "Domínio disponível para registro!" 
          : "Este domínio já está registrado."
      });
      setIsChecking(false);
    }, 1500);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Domínios</h1>
      <p className="text-vendeai-lightgray mb-6">
        Configure seu domínio personalizado ou use um subdomínio gratuito da VendeAI.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-vendeai-gold/20 bg-vendeai-dark">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Globe className="h-5 w-5 text-vendeai-gold" />
              Domínio Personalizado
            </CardTitle>
            <CardDescription className="text-vendeai-lightgray">
              Adicione seu próprio domínio para seu site
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="domain-name" className="text-white">Nome do Domínio</Label>
              <div className="flex gap-2">
                <Input 
                  id="domain-name" 
                  placeholder="Ex: meunegocio.com" 
                  className="bg-vendeai border-vendeai-gold/30 text-white"
                  value={domainName}
                  onChange={(e) => setDomainName(e.target.value)}
                />
                <Button 
                  variant="outline" 
                  className="border-vendeai-gold/30 text-white hover:bg-vendeai-gold/10"
                  onClick={checkDomainAvailability}
                  disabled={isChecking || !domainName}
                >
                  {isChecking ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    "Verificar"
                  )}
                </Button>
              </div>
            </div>
            
            {checkResult && (
              <div className={`p-3 rounded flex items-center gap-2 ${
                checkResult.available 
                  ? "bg-green-500/10 text-green-500 border border-green-500/30" 
                  : "bg-red-500/10 text-red-500 border border-red-500/30"
              }`}>
                {checkResult.available ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <X className="h-4 w-4" />
                )}
                <span>{checkResult.message}</span>
              </div>
            )}
            
            {checkResult?.available && (
              <Button className="w-full gradient-gold">
                Adicionar Domínio
              </Button>
            )}
            
            <div className="pt-4 border-t border-vendeai-gold/10">
              <h4 className="text-white text-sm font-medium mb-2">Como configurar seu domínio:</h4>
              <ol className="text-vendeai-lightgray text-sm space-y-1 list-decimal pl-4">
                <li>Compre um domínio em um registrador de sua preferência</li>
                <li>Adicione os registros DNS fornecidos por nós</li>
                <li>Aguarde a propagação (pode levar até 48h)</li>
                <li>Seu site estará acessível pelo seu domínio</li>
              </ol>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-vendeai-gold/20 bg-vendeai-dark">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-vendeai-gold" />
              Publicar Site
            </CardTitle>
            <CardDescription className="text-vendeai-lightgray">
              Torne seu site disponível online
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Usar subdomínio gratuito</h4>
                <p className="text-sm text-vendeai-lightgray">Obtenha um endereço gratuito em vendeai.com</p>
              </div>
              <Switch 
                checked={useSubdomain} 
                onCheckedChange={setUseSubdomain} 
                className="data-[state=checked]:bg-vendeai-gold"
              />
            </div>
            
            {useSubdomain && (
              <div className="space-y-2">
                <Label htmlFor="subdomain" className="text-white">Seu Subdomínio</Label>
                <Input 
                  id="subdomain" 
                  value={subdomain}
                  readOnly
                  className="bg-vendeai-gold/5 border-vendeai-gold/30 text-white"
                />
              </div>
            )}
            
            <div className="p-4 bg-vendeai-gold/5 rounded-md border border-vendeai-gold/20">
              <h4 className="text-white font-medium mb-2">Status do Site</h4>
              <div className="flex justify-between items-center">
                <span className="text-vendeai-lightgray">Seu site está:</span>
                <span className="text-yellow-500 flex items-center gap-1">
                  <RefreshCw className="h-4 w-4" />
                  Em progresso
                </span>
              </div>
            </div>
            
            <Button className="w-full gradient-gold">
              Publicar Site
            </Button>
            
            <div className="text-xs text-vendeai-lightgray text-center">
              A publicação pode levar alguns minutos. Você receberá uma notificação quando estiver concluída.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
