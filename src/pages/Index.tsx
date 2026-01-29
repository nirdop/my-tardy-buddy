import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import StudentsPage from "@/components/pages/StudentsPage";
import AttendancePage from "@/components/pages/AttendancePage";
import RecordsPage from "@/components/pages/RecordsPage";
import StatisticsPage from "@/components/pages/StatisticsPage";
import SettingsPage from "@/components/pages/SettingsPage";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const Index = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const { dir } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      
      <main className={cn("p-6", dir === "rtl" ? "mr-64" : "ml-64")}>
        {activeItem === "dashboard" && <Dashboard />}
        {activeItem === "students" && <StudentsPage />}
        {activeItem === "attendance" && <AttendancePage />}
        {activeItem === "records" && <RecordsPage />}
        {activeItem === "statistics" && <StatisticsPage />}
        {activeItem === "settings" && <SettingsPage />}
      </main>
    </div>
  );
};

export default Index;
