
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { SiteGeneratorSidebar } from "@/components/site-generator/SiteGeneratorSidebar";
import { SiteGeneratorContent } from "@/components/site-generator/SiteGeneratorContent";

const SiteGenerator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("templates");

  return (
    <div className="min-h-screen bg-vendeai flex">
      <SiteGeneratorSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <SiteGeneratorContent activeSection={activeSection} />
    </div>
  );
};

export default SiteGenerator;
