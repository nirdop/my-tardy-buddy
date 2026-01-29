import { useState } from "react";
import { Clock, CheckCircle, AlertTriangle, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface AttendanceRecord {
  id: string;
  studentName: string;
  studentId: string;
  class: string;
  time: string;
  status: "onTime" | "late";
  minutesLate?: number;
}

const AttendancePage = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [studentId, setStudentId] = useState("");
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const workStartTime = "07:00";

  const labels = {
    ar: {
      title: "تسجيل الحضور",
      subtitle: "سجل حضور الطلاب يومياً",
      studentId: "رقم الطالب",
      registerAttendance: "تسجيل الحضور",
      search: "بحث في السجلات...",
      todayRecords: "سجلات اليوم",
      time: "الوقت",
      status: "الحالة",
      onTime: "في الوقت",
      late: "متأخر",
      minutesLate: "دقيقة تأخير",
      noRecords: "لا توجد سجلات اليوم",
      startRegistering: "ابدأ بتسجيل الحضور",
      workStart: "وقت بداية الدوام",
    },
    fr: {
      title: "Enregistrement de présence",
      subtitle: "Enregistrez la présence des élèves quotidiennement",
      studentId: "Numéro d'élève",
      registerAttendance: "Enregistrer",
      search: "Rechercher dans les enregistrements...",
      todayRecords: "Enregistrements d'aujourd'hui",
      time: "Heure",
      status: "Statut",
      onTime: "À l'heure",
      late: "En retard",
      minutesLate: "minutes de retard",
      noRecords: "Aucun enregistrement aujourd'hui",
      startRegistering: "Commencez l'enregistrement",
      workStart: "Heure de début",
    },
    en: {
      title: "Attendance Registration",
      subtitle: "Register student attendance daily",
      studentId: "Student ID",
      registerAttendance: "Register",
      search: "Search records...",
      todayRecords: "Today's Records",
      time: "Time",
      status: "Status",
      onTime: "On Time",
      late: "Late",
      minutesLate: "minutes late",
      noRecords: "No records today",
      startRegistering: "Start registering attendance",
      workStart: "Start Time",
    },
  };

  const l = labels[language];

  const handleRegister = () => {
    if (!studentId.trim()) return;

    const now = new Date();
    const currentTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const [workHour, workMinute] = workStartTime.split(":").map(Number);
    const workStart = new Date();
    workStart.setHours(workHour, workMinute, 0, 0);

    const diffMs = now.getTime() - workStart.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);

    const isLate = diffMinutes > 0;

    const newRecord: AttendanceRecord = {
      id: Date.now().toString(),
      studentName: `طالب ${studentId}`,
      studentId: studentId,
      class: "الفصل 1",
      time: currentTime,
      status: isLate ? "late" : "onTime",
      minutesLate: isLate ? diffMinutes : undefined,
    };

    setRecords([newRecord, ...records]);
    setStudentId("");
  };

  const filteredRecords = records.filter(
    (record) =>
      record.studentName.includes(searchQuery) ||
      record.studentId.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{l.title}</h1>
            <p className="text-sm text-muted-foreground">{l.subtitle}</p>
          </div>
        </div>
        <div className="bg-card rounded-xl px-4 py-3 shadow-soft">
          <p className="text-xs text-muted-foreground">{l.workStart}</p>
          <p className="text-xl font-bold text-primary">{workStartTime}</p>
        </div>
      </div>

      {/* Registration Form */}
      <div className="bg-card rounded-xl shadow-soft p-6">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder={l.studentId}
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRegister()}
              className="text-lg h-12"
            />
          </div>
          <Button onClick={handleRegister} size="lg" className="h-12 px-8">
            <CheckCircle className="w-5 h-5 me-2" />
            {l.registerAttendance}
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder={l.search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="ps-10"
        />
      </div>

      {/* Records */}
      <div className="bg-card rounded-xl shadow-soft p-6">
        <h2 className="font-bold text-foreground mb-4">{l.todayRecords}</h2>

        {filteredRecords.length > 0 ? (
          <div className="space-y-3">
            {filteredRecords.map((record) => (
              <div
                key={record.id}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg",
                  record.status === "late" ? "bg-danger/5" : "bg-success/5"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      record.status === "late" ? "bg-danger/10" : "bg-success/10"
                    )}
                  >
                    <User
                      className={cn(
                        "w-5 h-5",
                        record.status === "late" ? "text-danger" : "text-success"
                      )}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {record.studentName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {record.studentId} • {record.class}
                    </p>
                  </div>
                </div>
                <div className="text-end">
                  <p className="font-medium text-foreground">{record.time}</p>
                  <div className="flex items-center gap-1 justify-end">
                    {record.status === "late" ? (
                      <>
                        <AlertTriangle className="w-3 h-3 text-danger" />
                        <span className="text-sm text-danger">
                          {record.minutesLate} {l.minutesLate}
                        </span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-3 h-3 text-success" />
                        <span className="text-sm text-success">{l.onTime}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-lg font-medium text-muted-foreground">
              {l.noRecords}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {l.startRegistering}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;
