import { NavLink as RouterNavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface AppNavLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
}

const AppNavLink = ({ to, icon: Icon, label }: AppNavLinkProps) => (
  <RouterNavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      )
    }
  >
    <Icon size={18} />
    {label}
  </RouterNavLink>
);

export default AppNavLink;
