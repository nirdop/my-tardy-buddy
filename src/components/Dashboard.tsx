import { Users, TrendingUp, AlertTriangle, Clock } from "lucide-react";
import StatCard from "./StatCard";
import TodayTardyCard from "./TodayTardyCard";
import TopTardyCard from "./TopTardyCard";
import { useLanguage } from "@/contexts/LanguageContext";

const Dashboard = () => {
  const { t, language } = useLanguage();
  
  // Mock data
  const stats = {
    totalStudents: 0,
    attendanceToday: 0,
    onTime: 0,
    tardyToday: 0,
    avgDelay: 0,
  };

  const todayTardyStudents: never[] = [];
  const topTardyStudents: never[] = [];

  // Get current date in proper locale
  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  
  const localeMap = {
    ar: "ar-SA",
    fr: "fr-FR",
    en: "en-US",
  };
  
  const formattedDate = today.toLocaleDateString(localeMap[language], dateOptions);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("dashboard")}</h1>
          <p className="text-sm text-muted-foreground mt-1">{formattedDate}</p>
        </div>
        <div className="bg-card rounded-xl px-4 py-3 shadow-soft">
          <p className="text-xs text-muted-foreground">{t("workStartTime")}</p>
          <p className="text-xl font-bold text-primary">07:00</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          title={t("totalStudents")}
          value={stats.totalStudents}
          subtitle={t("registeredStudent")}
          variant="default"
        />
        <StatCard
          icon={TrendingUp}
          title={t("attendanceToday")}
          value={stats.attendanceToday}
          subtitle={`${stats.onTime} ${t("onTime")}`}
          variant="success"
        />
        <StatCard
          icon={AlertTriangle}
          title={t("tardyToday")}
          value={stats.tardyToday}
          subtitle={t("tardyStudent")}
          variant="danger"
        />
        <StatCard
          icon={Clock}
          title={t("avgDelay")}
          value={`${stats.avgDelay} ${language === "ar" ? "د" : "m"}`}
          subtitle={t("minute")}
          variant="default"
        />
      </div>

      {/* Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TodayTardyCard students={todayTardyStudents} />
        <TopTardyCard students={topTardyStudents} />
      </div>
    </div>
  );
};

export default Dashboard;
