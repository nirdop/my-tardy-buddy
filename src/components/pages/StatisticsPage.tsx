import { BarChart3, TrendingUp, TrendingDown, Users, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const StatisticsPage = () => {
  const { language } = useLanguage();

  const labels = {
    ar: {
      title: "الإحصائيات",
      subtitle: "تحليل بيانات الحضور والتأخر",
      weeklyTardy: "التأخر الأسبوعي",
      tardyByClass: "التأخر حسب الفصل",
      summary: "ملخص الإحصائيات",
      totalTardies: "إجمالي التأخيرات",
      avgDaily: "المتوسط اليومي",
      mostTardyDay: "أكثر يوم تأخراً",
      improvement: "نسبة التحسن",
      thisWeek: "هذا الأسبوع",
      students: "طالب",
      sunday: "الأحد",
      monday: "الإثنين",
      tuesday: "الثلاثاء",
      wednesday: "الأربعاء",
      thursday: "الخميس",
      noData: "لا توجد بيانات كافية",
      addStudentsFirst: "أضف طلاباً وسجل الحضور للحصول على إحصائيات",
    },
    fr: {
      title: "Statistiques",
      subtitle: "Analyse des données de présence et de retard",
      weeklyTardy: "Retards hebdomadaires",
      tardyByClass: "Retards par classe",
      summary: "Résumé des statistiques",
      totalTardies: "Total des retards",
      avgDaily: "Moyenne quotidienne",
      mostTardyDay: "Jour le plus tardif",
      improvement: "Taux d'amélioration",
      thisWeek: "Cette semaine",
      students: "élèves",
      sunday: "Dimanche",
      monday: "Lundi",
      tuesday: "Mardi",
      wednesday: "Mercredi",
      thursday: "Jeudi",
      noData: "Pas assez de données",
      addStudentsFirst: "Ajoutez des élèves et enregistrez la présence",
    },
    en: {
      title: "Statistics",
      subtitle: "Analyze attendance and tardiness data",
      weeklyTardy: "Weekly Tardiness",
      tardyByClass: "Tardiness by Class",
      summary: "Statistics Summary",
      totalTardies: "Total Tardies",
      avgDaily: "Daily Average",
      mostTardyDay: "Most Tardy Day",
      improvement: "Improvement Rate",
      thisWeek: "This week",
      students: "students",
      sunday: "Sunday",
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      noData: "Not enough data",
      addStudentsFirst: "Add students and record attendance to get statistics",
    },
  };

  const l = labels[language];

  // Mock data for charts
  const weeklyData = [
    { day: l.sunday, count: 0 },
    { day: l.monday, count: 0 },
    { day: l.tuesday, count: 0 },
    { day: l.wednesday, count: 0 },
    { day: l.thursday, count: 0 },
  ];

  const classData = [
    { name: "الفصل 1", value: 0, color: "hsl(var(--primary))" },
    { name: "الفصل 2", value: 0, color: "hsl(var(--success))" },
    { name: "الفصل 3", value: 0, color: "hsl(var(--warning))" },
    { name: "الفصل 4", value: 0, color: "hsl(var(--danger))" },
  ];

  const hasData = weeklyData.some((d) => d.count > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{l.title}</h1>
          <p className="text-sm text-muted-foreground">{l.subtitle}</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl shadow-soft p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-danger/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-danger" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{l.totalTardies}</p>
              <p className="text-2xl font-bold text-foreground">0</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl shadow-soft p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{l.avgDaily}</p>
              <p className="text-2xl font-bold text-foreground">0</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl shadow-soft p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{l.mostTardyDay}</p>
              <p className="text-2xl font-bold text-foreground">-</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl shadow-soft p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{l.improvement}</p>
              <p className="text-2xl font-bold text-foreground">0%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Chart */}
        <div className="bg-card rounded-xl shadow-soft p-6">
          <h3 className="font-bold text-foreground mb-4">{l.weeklyTardy}</h3>
          {hasData ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground/30 mb-2" />
                <p className="text-muted-foreground">{l.noData}</p>
              </div>
            </div>
          )}
        </div>

        {/* Class Distribution */}
        <div className="bg-card rounded-xl shadow-soft p-6">
          <h3 className="font-bold text-foreground mb-4">{l.tardyByClass}</h3>
          {hasData ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={classData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {classData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground/30 mb-2" />
                <p className="text-muted-foreground">{l.noData}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
