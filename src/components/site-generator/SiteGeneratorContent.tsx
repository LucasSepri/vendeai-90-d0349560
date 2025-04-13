
import React from "react";
import { TemplatesSection } from "./sections/TemplatesSection";
import { PagesSection } from "./sections/PagesSection";
import { IntegrationsSection } from "./sections/IntegrationsSection";
import { DomainsSection } from "./sections/DomainsSection";
import { VisualEditorSection } from "./sections/VisualEditorSection";
import { AnalyticsSection } from "./sections/AnalyticsSection";
import { Template } from "./types";

interface SiteGeneratorContentProps {
  activeSection: string;
  selectedTemplate?: Template | null;
  onEditTemplate?: (template: Template) => void;
  onCloseEditor?: () => void;
}

export function SiteGeneratorContent({ 
  activeSection, 
  selectedTemplate = null,
  onEditTemplate,
  onCloseEditor
}: SiteGeneratorContentProps) {
  return (
    <div className="flex-1 ml-64 p-6 bg-vendeai overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        {activeSection === "templates" && <TemplatesSection onEditTemplate={onEditTemplate} />}
        {activeSection === "pages" && <PagesSection />}
        {activeSection === "integrations" && <IntegrationsSection />}
        {activeSection === "domains" && <DomainsSection />}
        {activeSection === "editor" && selectedTemplate && <VisualEditorSection template={selectedTemplate} onClose={onCloseEditor} />}
        {activeSection === "analytics" && <AnalyticsSection />}
      </div>
    </div>
  );
}
