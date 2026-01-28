import { Users, TrendingUp, AlertTriangle, Clock } from "lucide-react";
import StatCard from "./StatCard";
import TodayTardyCard from "./TodayTardyCard";
import TopTardyCard from "./TopTardyCard";

const Dashboard = () => {
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

  // Get current date in Arabic
  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const arabicDate = today.toLocaleDateString("ar-SA", dateOptions);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">لوحة التحكم</h1>
          <p className="text-sm text-muted-foreground mt-1">{arabicDate}</p>
        </div>
        <div className="bg-card rounded-xl px-4 py-3 shadow-soft">
          <p className="text-xs text-muted-foreground">وقت بداية الدوام</p>
          <p className="text-xl font-bold text-primary">07:00</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          title="إجمالي الطلاب"
          value={stats.totalStudents}
          subtitle="طالب مسجل"
          variant="default"
        />
        <StatCard
          icon={TrendingUp}
          title="الحضور اليوم"
          value={stats.attendanceToday}
          subtitle={`${stats.onTime} في الوقت المحدد`}
          variant="success"
        />
        <StatCard
          icon={AlertTriangle}
          title="المتأخرون اليوم"
          value={stats.tardyToday}
          subtitle="طالب متأخر"
          variant="danger"
        />
        <StatCard
          icon={Clock}
          title="متوسط التأخير"
          value={`${stats.avgDelay} د`}
          subtitle="دقيقة"
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
