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

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
  { id: "students", label: "الطلاب", icon: Users },
  { id: "attendance", label: "تسجيل الدخول", icon: Clock },
  { id: "records", label: "سجل التأخر", icon: FileText },
  { id: "statistics", label: "الإحصائيات", icon: BarChart3 },
  { id: "settings", label: "الإعدادات", icon: Settings },
];

const Sidebar = ({ activeItem, onItemClick }: SidebarProps) => {
  return (
    <aside className="w-64 bg-sidebar border-l border-sidebar-border h-screen fixed right-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-foreground flex items-center gap-1">
              نظام التأخر
              <Sparkles className="w-4 h-4 text-primary" />
            </h1>
            <p className="text-xs text-muted-foreground">إدارة حضور الطلاب</p>
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
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Status indicator */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>متصل بالخادم</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
