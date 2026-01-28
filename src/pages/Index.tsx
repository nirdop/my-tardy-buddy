import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const Index = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const { t, dir } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      
      <main className={cn("p-6", dir === "rtl" ? "mr-64" : "ml-64")}>
        {activeItem === "dashboard" && <Dashboard />}
        {activeItem === "students" && (
          <div className="text-center py-20">
            <h2 className="text-xl font-bold text-foreground">
              {t("comingSoon")} - {t("studentManagement")}
            </h2>
          </div>
        )}
        {activeItem === "attendance" && (
          <div className="text-center py-20">
            <h2 className="text-xl font-bold text-foreground">
              {t("comingSoon")} - {t("attendanceRegistration")}
            </h2>
          </div>
        )}
        {activeItem === "records" && (
          <div className="text-center py-20">
            <h2 className="text-xl font-bold text-foreground">
              {t("comingSoon")} - {t("tardyRecords")}
            </h2>
          </div>
        )}
        {activeItem === "statistics" && (
          <div className="text-center py-20">
            <h2 className="text-xl font-bold text-foreground">
              {t("comingSoon")} - {t("statisticsPage")}
            </h2>
          </div>
        )}
        {activeItem === "settings" && (
          <div className="text-center py-20">
            <h2 className="text-xl font-bold text-foreground">
              {t("comingSoon")} - {t("settingsPage")}
            </h2>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
