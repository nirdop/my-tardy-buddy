import { TrendingUp } from "lucide-react";

interface TardyRecord {
  id: string;
  name: string;
  class: string;
  totalTardies: number;
}

interface TopTardyCardProps {
  students: TardyRecord[];
}

const TopTardyCard = ({ students }: TopTardyCardProps) => {
  const hasStudents = students.length > 0;

  return (
    <div className="bg-card rounded-xl shadow-soft p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-primary" />
        </div>
        <h3 className="font-bold text-foreground">أكثر الطلاب تأخراً</h3>
      </div>

      {hasStudents ? (
        <div className="space-y-3">
          {students.map((student, index) => (
            <div
              key={student.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-foreground">{student.name}</p>
                  <p className="text-xs text-muted-foreground">{student.class}</p>
                </div>
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-foreground">
                  {student.totalTardies} مرات
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
          <p className="text-muted-foreground font-medium">
            لا توجد سجلات تأخير
          </p>
          <p className="text-sm text-muted-foreground mt-1">ابدأ بتسجيل الحضور</p>
        </div>
      )}
    </div>
  );
};

export default TopTardyCard;
