
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { SiteGeneratorSidebar } from "@/components/site-generator/SiteGeneratorSidebar";
import { SiteGeneratorContent } from "@/components/site-generator/SiteGeneratorContent";
import { Template } from "@/components/site-generator/types";

const SiteGenerator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("templates");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setActiveSection("editor");
    setIsEditing(true);
    toast({
      title: "Editor aberto",
      description: `Editando o template: ${template.name}`,
    });
  };

  const handleCloseEditor = () => {
    setSelectedTemplate(null);
    setActiveSection("templates");
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-vendeai flex">
      <SiteGeneratorSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isEditing={isEditing}
      />
      <SiteGeneratorContent 
        activeSection={activeSection} 
        selectedTemplate={selectedTemplate}
        onEditTemplate={handleEditTemplate}
        onCloseEditor={handleCloseEditor}
      />
    </div>
  );
};

export default SiteGenerator;
