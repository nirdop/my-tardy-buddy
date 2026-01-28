import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      
      <main className="mr-64 p-6">
        {activeItem === "dashboard" && <Dashboard />}
        {activeItem === "students" && (
          <div className="text-center py-20">
            <h2 className="text-xl font-bold text-foreground">قريباً - إدارة الطلاب</h2>
          </div>
        )}
        {activeItem === "attendance" && (
          <div className="text-center py-20">
            <h2 className="text-xl font-bold text-foreground">قريباً - تسجيل الدخول</h2>
          </div>
        )}
        {activeItem === "records" && (
          <div className="text-center py-20">
            <h2 className="text-xl font-bold text-foreground">قريباً - سجل التأخر</h2>
          </div>
        )}
        {activeItem === "statistics" && (
          <div className="text-center py-20">
            <h2 className="text-xl font-bold text-foreground">قريباً - الإحصائيات</h2>
          </div>
        )}
        {activeItem === "settings" && (
          <div className="text-center py-20">
            <h2 className="text-xl font-bold text-foreground">قريباً - الإعدادات</h2>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
