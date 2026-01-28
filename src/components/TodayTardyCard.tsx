import { Clock, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TardyStudent {
  id: string;
  name: string;
  class: string;
  minutesLate: number;
}

interface TodayTardyCardProps {
  students: TardyStudent[];
}

const TodayTardyCard = ({ students }: TodayTardyCardProps) => {
  const { t } = useLanguage();
  const hasStudents = students.length > 0;

  return (
    <div className="bg-card rounded-xl shadow-soft p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-danger/10 flex items-center justify-center">
          <AlertTriangle className="w-4 h-4 text-danger" />
        </div>
        <h3 className="font-bold text-foreground">{t("todayTardy")}</h3>
      </div>

      {hasStudents ? (
        <div className="space-y-3">
          {students.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
            >
              <div>
                <p className="font-medium text-foreground">{student.name}</p>
                <p className="text-xs text-muted-foreground">{student.class}</p>
              </div>
              <div className="text-end">
                <p className="text-sm font-bold text-danger">
                  {student.minutesLate} {t("minute")}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
          <p className="text-muted-foreground font-medium">
            {t("noTardyToday")}
          </p>
          <p className="text-sm text-muted-foreground mt-1">{t("excellentPerformance")}</p>
        </div>
      )}
    </div>
  );
};

export default TodayTardyCard;
