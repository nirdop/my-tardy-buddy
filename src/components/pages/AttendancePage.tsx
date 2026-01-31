import { useState } from "react";
import { Clock, CheckCircle, AlertTriangle, User, Search, XCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";
import { Student } from "./StudentsPage";
import { ClassSection } from "./ClassesPage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export interface AttendanceRecord {
  id: string;
  studentName: string;
  studentId: string;
  class: string;
  time: string;
  date: string;
  status: "present" | "absent" | "late";
  minutesLate?: number;
}

const AttendancePage = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [studentIds, setStudentIds] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [registrationType, setRegistrationType] = useState<"present" | "absent">("absent");
  const [students] = useLocalStorage<Student[]>("students", []);
  const [classes] = useLocalStorage<ClassSection[]>("classes", []);
  const [allRecords, setAllRecords] = useLocalStorage<AttendanceRecord[]>("attendanceRecords", []);
  const workStartTime = "07:00";
  
  // Filter records for today only
  const today = new Date().toISOString().split("T")[0];
  const records = allRecords.filter((r) => r.date === today);

  const labels = {
    ar: {
      title: "تسجيل الحضور والغياب",
      subtitle: "سجل حضور وغياب الطلاب يومياً",
      studentIds: "أرقام الطلاب (افصل بـ - أو , أو ;)",
      registerAttendance: "تسجيل",
      registerAbsence: "تسجيل الغياب",
      registerPresence: "تسجيل الحضور",
      search: "بحث في السجلات...",
      todayRecords: "سجلات اليوم",
      time: "الوقت",
      status: "الحالة",
      present: "حاضر",
      absent: "غائب",
      late: "متأخر",
      minutesLate: "دقيقة تأخير",
      noRecords: "لا توجد سجلات اليوم",
      startRegistering: "ابدأ بتسجيل الحضور أو الغياب",
      workStart: "وقت بداية الدوام",
      selectClass: "اختر القسم",
      allClasses: "جميع الأقسام",
      studentsRegistered: "تم تسجيل",
      student: "طالب",
      notFound: "لم يتم العثور على طالب برقم",
    },
    fr: {
      title: "Enregistrement présence/absence",
      subtitle: "Enregistrez la présence et l'absence quotidiennement",
      studentIds: "Numéros d'élèves (séparer par - , ou ;)",
      registerAttendance: "Enregistrer",
      registerAbsence: "Enregistrer absence",
      registerPresence: "Enregistrer présence",
      search: "Rechercher dans les enregistrements...",
      todayRecords: "Enregistrements d'aujourd'hui",
      time: "Heure",
      status: "Statut",
      present: "Présent",
      absent: "Absent",
      late: "En retard",
      minutesLate: "minutes de retard",
      noRecords: "Aucun enregistrement aujourd'hui",
      startRegistering: "Commencez l'enregistrement",
      workStart: "Heure de début",
      selectClass: "Sélectionner la classe",
      allClasses: "Toutes les classes",
      studentsRegistered: "Enregistré",
      student: "élève(s)",
      notFound: "Élève non trouvé avec le numéro",
    },
    en: {
      title: "Attendance Registration",
      subtitle: "Register student attendance and absence daily",
      studentIds: "Student IDs (separate by - , or ;)",
      registerAttendance: "Register",
      registerAbsence: "Register Absence",
      registerPresence: "Register Presence",
      search: "Search records...",
      todayRecords: "Today's Records",
      time: "Time",
      status: "Status",
      present: "Present",
      absent: "Absent",
      late: "Late",
      minutesLate: "minutes late",
      noRecords: "No records today",
      startRegistering: "Start registering attendance",
      workStart: "Start Time",
      selectClass: "Select class",
      allClasses: "All classes",
      studentsRegistered: "Registered",
      student: "student(s)",
      notFound: "Student not found with ID",
    },
  };

  const l = labels[language];

  // Parse multiple IDs separated by - , or ;
  const parseStudentIds = (input: string): string[] => {
    return input
      .split(/[-,;]/)
      .map((id) => id.trim())
      .filter((id) => id !== "");
  };

  const handleRegister = () => {
    if (!studentIds.trim() || !selectedClass) return;

    const ids = parseStudentIds(studentIds);
    if (ids.length === 0) return;

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

    const newRecords: AttendanceRecord[] = [];
    const notFoundIds: string[] = [];

    ids.forEach((id, index) => {
      // Find student by ID AND class
      const existingStudent = students.find(
        (s) => s.studentId === id && s.class === selectedClass
      );

      if (!existingStudent) {
        notFoundIds.push(id);
        return;
      }

      // Check if already registered today for this class
      const alreadyRegistered = allRecords.some(
        (r) => r.studentId === id && r.class === selectedClass && r.date === today
      );

      if (alreadyRegistered) return;

      let status: "present" | "absent" | "late" = registrationType;
      let minutesLate: number | undefined;

      // If registering presence, check if late
      if (registrationType === "present" && diffMinutes > 0) {
        status = "late";
        minutesLate = diffMinutes;
      }

      const newRecord: AttendanceRecord = {
        id: `${Date.now()}-${index}`,
        studentName: existingStudent.name,
        studentId: id,
        class: selectedClass,
        time: currentTime,
        date: today,
        status,
        minutesLate,
      };

      newRecords.push(newRecord);
    });

    if (newRecords.length > 0) {
      setAllRecords([...newRecords, ...allRecords]);
      toast.success(`${l.studentsRegistered} ${newRecords.length} ${l.student}`);
    }

    if (notFoundIds.length > 0) {
      notFoundIds.forEach((id) => {
        toast.error(`${l.notFound}: ${id}`);
      });
    }

    setStudentIds("");
  };

  const filteredRecords = records.filter(
    (record) =>
      (record.studentName.includes(searchQuery) ||
        record.studentId.includes(searchQuery)) &&
      (selectedClass === "" || record.class === selectedClass)
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
      <div className="bg-card rounded-xl shadow-soft p-6 space-y-4">
        {/* Class Selection */}
        <div className="flex gap-4 flex-wrap items-end">
          <div className="min-w-[200px]">
            <label className="text-sm font-medium text-foreground mb-2 block">
              {l.selectClass}
            </label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder={l.selectClass} />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls.id} value={cls.name}>
                    {cls.name} - {cls.level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Registration Type Toggle */}
          <div className="flex gap-2">
            <Button
              variant={registrationType === "absent" ? "default" : "outline"}
              onClick={() => setRegistrationType("absent")}
              className="h-12"
            >
              <XCircle className="w-4 h-4 me-2" />
              {l.registerAbsence}
            </Button>
            <Button
              variant={registrationType === "present" ? "default" : "outline"}
              onClick={() => setRegistrationType("present")}
              className="h-12"
            >
              <CheckCircle className="w-4 h-4 me-2" />
              {l.registerPresence}
            </Button>
          </div>
        </div>

        {/* Student IDs Input */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[300px]">
            <Input
              placeholder={l.studentIds}
              value={studentIds}
              onChange={(e) => setStudentIds(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRegister()}
              className="text-lg h-12"
              disabled={!selectedClass}
            />
          </div>
          <Button 
            onClick={handleRegister} 
            size="lg" 
            className="h-12 px-8"
            disabled={!selectedClass || !studentIds.trim()}
          >
            {registrationType === "absent" ? (
              <XCircle className="w-5 h-5 me-2" />
            ) : (
              <CheckCircle className="w-5 h-5 me-2" />
            )}
            {l.registerAttendance}
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={l.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ps-10"
          />
        </div>
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={l.allClasses} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">{l.allClasses}</SelectItem>
            {classes.map((cls) => (
              <SelectItem key={cls.id} value={cls.name}>
                {cls.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
                  record.status === "absent" 
                    ? "bg-danger/5" 
                    : record.status === "late" 
                    ? "bg-warning/5" 
                    : "bg-success/5"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      record.status === "absent"
                        ? "bg-danger/10"
                        : record.status === "late"
                        ? "bg-warning/10"
                        : "bg-success/10"
                    )}
                  >
                    <User
                      className={cn(
                        "w-5 h-5",
                        record.status === "absent"
                          ? "text-danger"
                          : record.status === "late"
                          ? "text-warning"
                          : "text-success"
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
                    {record.status === "absent" ? (
                      <>
                        <XCircle className="w-3 h-3 text-danger" />
                        <span className="text-sm text-danger">{l.absent}</span>
                      </>
                    ) : record.status === "late" ? (
                      <>
                        <AlertTriangle className="w-3 h-3 text-warning" />
                        <span className="text-sm text-warning">
                          {record.minutesLate} {l.minutesLate}
                        </span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-3 h-3 text-success" />
                        <span className="text-sm text-success">{l.present}</span>
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
