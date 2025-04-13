
import { useState } from "react";
import { TemplatesSection } from "./sections/TemplatesSection";
import { PagesSection } from "./sections/PagesSection";
import { IntegrationsSection } from "./sections/IntegrationsSection";
import { DomainsSection } from "./sections/DomainsSection";

interface SiteGeneratorContentProps {
  activeSection: string;
}

export function SiteGeneratorContent({ activeSection }: SiteGeneratorContentProps) {
  return (
    <div className="flex-1 ml-64 p-6 bg-vendeai overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        {activeSection === "templates" && <TemplatesSection />}
        {activeSection === "pages" && <PagesSection />}
        {activeSection === "integrations" && <IntegrationsSection />}
        {activeSection === "domains" && <DomainsSection />}
      </div>
    </div>
  );
}
