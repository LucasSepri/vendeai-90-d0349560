
import { LucideIcon } from "lucide-react";

export interface Template {
  id: string;
  name: string;
  category: string;
  image: string;
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  connected: boolean;
  color: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface DragElement {
  id: string;
  type: "text" | "image" | "button" | "form" | "section" | "container";
  content: string;
  style?: Record<string, string>;
  children?: DragElement[];
}

export interface EditorSection {
  id: string;
  name: string;
  elements: DragElement[];
}

export interface AnalyticsData {
  views: number;
  conversionRate: number;
  sales: number;
  salesGoal: number;
  elementPerformance: Record<string, number>;
}
