
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
