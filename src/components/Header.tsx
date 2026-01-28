import { Bell, Settings } from "lucide-react";
import TardyMascot from "./TardyMascot";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <TardyMascot size="sm" mood="happy" />
        <div>
          <h1 className="text-xl font-extrabold text-foreground">Tardy Buddy</h1>
          <p className="text-sm text-muted-foreground">Your punctuality pal</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors">
          <Bell className="w-5 h-5 text-secondary-foreground" />
        </button>
        <button className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors">
          <Settings className="w-5 h-5 text-secondary-foreground" />
        </button>
      </div>
    </header>
  );
};

export default Header;
