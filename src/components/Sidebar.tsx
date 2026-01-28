import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  FileText, 
  BarChart3, 
  Settings,
  Sparkles,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { TranslationKey } from "@/lib/translations";

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const menuItems: { id: string; labelKey: TranslationKey; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", labelKey: "dashboard", icon: LayoutDashboard },
  { id: "students", labelKey: "students", icon: Users },
  { id: "attendance", labelKey: "attendance", icon: Clock },
  { id: "records", labelKey: "records", icon: FileText },
  { id: "statistics", labelKey: "statistics", icon: BarChart3 },
  { id: "settings", labelKey: "settings", icon: Settings },
];

const Sidebar = ({ activeItem, onItemClick }: SidebarProps) => {
  const { t, dir } = useLanguage();

  return (
    <aside 
      className={cn(
        "w-64 bg-sidebar border-sidebar-border h-screen fixed top-0 flex flex-col",
        dir === "rtl" ? "right-0 border-l" : "left-0 border-r"
      )}
    >
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-foreground flex items-center gap-1">
              {t("appName")}
              <Sparkles className="w-4 h-4 text-primary" />
            </h1>
            <p className="text-xs text-muted-foreground">{t("appDescription")}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{t(item.labelKey)}</span>
            </button>
          );
        })}
      </nav>

      {/* Language Switcher */}
      <LanguageSwitcher />

      {/* Status indicator */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>{t("connectedToServer")}</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
