
import { Link } from "react-router-dom";
import { 
  Layout, 
  Store, 
  Home, 
  ShoppingBag, 
  UserCircle, 
  Briefcase, 
  Shield, 
  BarChart3, 
  Link2, 
  Instagram, 
  MessageCircle, 
  Database, 
  Globe,
  ArrowLeft,
  Move,
  TextIcon,
  Image,
  Square,
  PlusCircle,
  Save,
  Eye,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SiteGeneratorSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isEditing?: boolean;
}

export function SiteGeneratorSidebar({ activeSection, setActiveSection, isEditing = false }: SiteGeneratorSidebarProps) {
  const menuItems = [
    {
      id: "templates",
      label: "Modelos por Nicho",
      icon: Layout
    },
    {
      id: "pages",
      label: "Páginas",
      icon: Shield
    },
    {
      id: "integrations",
      label: "Integrações",
      icon: Link2
    },
    {
      id: "domains",
      label: "Domínios",
      icon: Globe
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3
    }
  ];

  const editorItems = [
    {
      id: "text",
      label: "Texto",
      icon: TextIcon
    },
    {
      id: "image",
      label: "Imagem",
      icon: Image
    },
    {
      id: "button",
      label: "Botão",
      icon: Square
    },
    {
      id: "section",
      label: "Seção",
      icon: Layout
    }
  ];

  if (isEditing) {
    return (
      <div className="w-64 h-screen bg-vendeai border-r border-vendeai-gold/20 flex flex-col fixed">
        <div className="p-4 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 text-white hover:bg-vendeai-gold/10"
              onClick={() => setActiveSection("templates")}
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Voltar aos Templates</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <Move className="h-5 w-5 text-vendeai-gold" />
            <h2 className="text-lg font-semibold text-white">Editor Visual</h2>
          </div>
          
          <Separator className="bg-vendeai-gold/20 my-4" />
          
          <div className="mb-6">
            <h3 className="text-vendeai-gold text-sm font-medium mb-3">Elementos</h3>
            <div className="space-y-1">
              {editorItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className="w-full justify-start text-left px-2 py-2 text-white hover:bg-vendeai-gold/10"
                  draggable
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  <span>{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-vendeai-gold text-sm font-medium mb-3">Blocos Pré-feitos</h3>
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-left px-2 py-2 text-white hover:bg-vendeai-gold/10"
                draggable
              >
                <Layout className="h-5 w-5 mr-2" />
                <span>Cabeçalho</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-left px-2 py-2 text-white hover:bg-vendeai-gold/10"
                draggable
              >
                <Shield className="h-5 w-5 mr-2" />
                <span>Banner Principal</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-left px-2 py-2 text-white hover:bg-vendeai-gold/10"
                draggable
              >
                <Store className="h-5 w-5 mr-2" />
                <span>Seção de Produtos</span>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-auto p-4">
          <div className="flex gap-2">
            <Button className="flex-1 gradient-gold">
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
            <Button variant="outline" className="flex-1 border-vendeai-gold/50 text-vendeai-gold hover:bg-vendeai-gold/10">
              <Eye className="h-4 w-4 mr-2" />
              Visualizar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 h-screen bg-vendeai border-r border-vendeai-gold/20 flex flex-col fixed">
      <div className="p-4 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <Link to="/dashboard" className="flex items-center gap-2 text-white">
            <ArrowLeft className="h-5 w-5" />
            <span>Voltar ao Dashboard</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <Layout className="h-5 w-5 text-vendeai-gold" />
          <h2 className="text-lg font-semibold text-white">Gerador de Sites</h2>
        </div>
        
        <Separator className="bg-vendeai-gold/20 my-4" />
        
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={`w-full justify-start text-left px-2 py-2 ${
                activeSection === item.id 
                  ? "bg-vendeai-gold/10 text-vendeai-gold border-l-2 border-vendeai-gold" 
                  : "text-white hover:bg-vendeai-gold/10 hover:text-vendeai-gold"
              }`}
              onClick={() => setActiveSection(item.id)}
            >
              <item.icon className="h-5 w-5 mr-2" />
              <span>{item.label}</span>
            </Button>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-4">
        <div className="p-4 bg-vendeai-gold/10 rounded-lg border border-vendeai-gold/30">
          <p className="text-sm text-white mb-2">Personalize e publique seu site em menos de 10 minutos!</p>
          <Button variant="outline" className="w-full border-vendeai-gold/50 text-vendeai-gold hover:bg-vendeai-gold/10">
            Ver Tutorial
          </Button>
        </div>
      </div>
    </div>
  );
}
