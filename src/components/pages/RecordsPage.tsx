import { useState } from "react";
import { FileText, Search, Calendar, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface TardyRecord {
  id: string;
  studentName: string;
  studentId: string;
  class: string;
  date: string;
  arrivalTime: string;
  minutesLate: number;
}

const RecordsPage = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterClass, setFilterClass] = useState("all");
  const [records] = useState<TardyRecord[]>([]);

  const labels = {
    ar: {
      title: "سجل التأخر",
      subtitle: "عرض جميع سجلات التأخر",
      search: "بحث عن طالب...",
      filterByClass: "تصفية حسب الفصل",
      allClasses: "جميع الفصول",
      exportData: "تصدير البيانات",
      studentName: "اسم الطالب",
      studentId: "رقم الطالب",
      class: "الفصل",
      date: "التاريخ",
      arrivalTime: "وقت الوصول",
      delay: "التأخير",
      minutes: "دقيقة",
      noRecords: "لا توجد سجلات تأخير",
      recordsWillAppear: "ستظهر السجلات هنا عند تسجيل التأخير",
    },
    fr: {
      title: "Registre des retards",
      subtitle: "Voir tous les enregistrements de retard",
      search: "Rechercher un élève...",
      filterByClass: "Filtrer par classe",
      allClasses: "Toutes les classes",
      exportData: "Exporter les données",
      studentName: "Nom de l'élève",
      studentId: "Numéro d'élève",
      class: "Classe",
      date: "Date",
      arrivalTime: "Heure d'arrivée",
      delay: "Retard",
      minutes: "minutes",
      noRecords: "Aucun enregistrement de retard",
      recordsWillAppear: "Les enregistrements apparaîtront ici",
    },
    en: {
      title: "Tardy Records",
      subtitle: "View all tardy records",
      search: "Search for a student...",
      filterByClass: "Filter by class",
      allClasses: "All classes",
      exportData: "Export Data",
      studentName: "Student Name",
      studentId: "Student ID",
      class: "Class",
      date: "Date",
      arrivalTime: "Arrival Time",
      delay: "Delay",
      minutes: "minutes",
      noRecords: "No tardy records",
      recordsWillAppear: "Records will appear here when tardiness is recorded",
    },
  };

  const l = labels[language];

  const classes = ["الفصل 1", "الفصل 2", "الفصل 3", "الفصل 4"];

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.studentId.includes(searchQuery);
    const matchesClass =
      filterClass === "all" || record.class === filterClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{l.title}</h1>
            <p className="text-sm text-muted-foreground">{l.subtitle}</p>
          </div>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          {l.exportData}
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={l.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ps-10"
          />
        </div>
        <Select value={filterClass} onValueChange={setFilterClass}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 me-2" />
            <SelectValue placeholder={l.filterByClass} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{l.allClasses}</SelectItem>
            {classes.map((cls) => (
              <SelectItem key={cls} value={cls}>
                {cls}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {filteredRecords.length > 0 ? (
        <div className="bg-card rounded-xl shadow-soft overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{l.studentName}</TableHead>
                <TableHead>{l.studentId}</TableHead>
                <TableHead>{l.class}</TableHead>
                <TableHead>{l.date}</TableHead>
                <TableHead>{l.arrivalTime}</TableHead>
                <TableHead>{l.delay}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">
                    {record.studentName}
                  </TableCell>
                  <TableCell>{record.studentId}</TableCell>
                  <TableCell>{record.class}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.arrivalTime}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        record.minutesLate > 15
                          ? "bg-danger/10 text-danger"
                          : "bg-warning/10 text-warning"
                      )}
                    >
                      {record.minutesLate} {l.minutes}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="bg-card rounded-xl shadow-soft p-12 text-center">
          <Calendar className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-lg font-medium text-muted-foreground">
            {l.noRecords}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {l.recordsWillAppear}
          </p>
        </div>
      )}
    </div>
  );
};

export default RecordsPage;
