
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram, MessageCircle, Mail, Database, Link2, CheckCircle2, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: any;
  connected: boolean;
  color: string;
}

export function IntegrationsSection() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "whatsapp",
      name: "WhatsApp",
      description: "Conecte seu WhatsApp para mensagens automatizadas",
      icon: MessageCircle,
      connected: true,
      color: "#25D366"
    },
    {
      id: "instagram",
      name: "Instagram",
      description: "Integre seu feed do Instagram no site",
      icon: Instagram,
      connected: false,
      color: "#E1306C"
    },
    {
      id: "email",
      name: "Email Marketing",
      description: "Conecte sua ferramenta de email marketing",
      icon: Mail,
      connected: false,
      color: "#4A7AFF"
    },
    {
      id: "crm",
      name: "CRM",
      description: "Integre com seu CRM favorito",
      icon: Database,
      connected: false,
      color: "#FF9900"
    },
  ]);

  const toggleConnection = (id: string) => {
    setIntegrations(prevState => 
      prevState.map(integration => 
        integration.id === id 
          ? { ...integration, connected: !integration.connected } 
          : integration
      )
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Integrações</h1>
      <p className="text-vendeai-lightgray mb-6">
        Conecte seu site com outras plataformas para aumentar o alcance e automatizar processos.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id} className="border-vendeai-gold/20 bg-vendeai-dark overflow-hidden">
            <div className="h-1" style={{ backgroundColor: integration.color }}></div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <integration.icon className="h-5 w-5" style={{ color: integration.color }} />
                  <CardTitle className="text-white">{integration.name}</CardTitle>
                </div>
                {integration.connected ? (
                  <div className="flex items-center gap-1 text-green-500 text-sm">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Conectado</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-vendeai-lightgray text-sm">
                    <XCircle className="h-4 w-4" />
                    <span>Desconectado</span>
                  </div>
                )}
              </div>
              <CardDescription className="text-vendeai-lightgray">
                {integration.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {integration.connected ? (
                <div className="space-y-4">
                  <div className="p-3 bg-vendeai-gold/5 rounded border border-vendeai-gold/20 flex items-center justify-between">
                    <span className="text-white text-sm">Conexão ativa com {integration.name}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-vendeai-gold hover:bg-vendeai-gold/10"
                    >
                      Configurar
                    </Button>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full border-vendeai-gold/30 text-white hover:bg-vendeai-gold/10"
                    onClick={() => toggleConnection(integration.id)}
                  >
                    Desconectar
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {integration.id === "whatsapp" && (
                    <div className="space-y-2">
                      <Input 
                        placeholder="Seu número WhatsApp com DDD" 
                        className="bg-vendeai border-vendeai-gold/30 text-white"
                      />
                    </div>
                  )}
                  
                  {integration.id === "instagram" && (
                    <div className="space-y-2">
                      <Input 
                        placeholder="Seu nome de usuário no Instagram" 
                        className="bg-vendeai border-vendeai-gold/30 text-white"
                      />
                    </div>
                  )}
                  
                  {integration.id === "email" && (
                    <div className="space-y-2">
                      <select className="w-full h-10 rounded-md border border-vendeai-gold/30 bg-vendeai px-3 py-2 text-sm text-white">
                        <option value="" disabled selected>Selecione seu provedor</option>
                        <option value="mailchimp">Mailchimp</option>
                        <option value="activecampaign">ActiveCampaign</option>
                        <option value="convertkit">ConvertKit</option>
                        <option value="other">Outro</option>
                      </select>
                    </div>
                  )}
                  
                  {integration.id === "crm" && (
                    <div className="space-y-2">
                      <select className="w-full h-10 rounded-md border border-vendeai-gold/30 bg-vendeai px-3 py-2 text-sm text-white">
                        <option value="" disabled selected>Selecione seu CRM</option>
                        <option value="rdstation">RD Station</option>
                        <option value="hubspot">HubSpot</option>
                        <option value="salesforce">Salesforce</option>
                        <option value="other">Outro</option>
                      </select>
                    </div>
                  )}
                  
                  <Button 
                    className="w-full gradient-gold"
                    onClick={() => toggleConnection(integration.id)}
                  >
                    Conectar {integration.name}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
