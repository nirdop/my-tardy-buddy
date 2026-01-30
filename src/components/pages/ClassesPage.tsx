import { useState } from "react";
import { FolderOpen, Plus, Edit, Trash2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export interface ClassSection {
  id: string;
  name: string;
  level: string;
  description: string;
}

const ClassesPage = () => {
  const { language } = useLanguage();
  const [classes, setClasses] = useLocalStorage<ClassSection[]>("classes", []);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassSection | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    level: "",
    description: "",
  });

  const labels = {
    ar: {
      title: "إدارة الأقسام",
      addClass: "إضافة قسم",
      name: "اسم القسم",
      level: "المستوى",
      description: "الوصف",
      actions: "الإجراءات",
      save: "حفظ",
      cancel: "إلغاء",
      edit: "تعديل",
      delete: "حذف",
      noClasses: "لا توجد أقسام مسجلة",
      addFirst: "أضف أول قسم للبدء",
      studentCount: "عدد الطلاب",
    },
    fr: {
      title: "Gestion des classes",
      addClass: "Ajouter une classe",
      name: "Nom de la classe",
      level: "Niveau",
      description: "Description",
      actions: "Actions",
      save: "Enregistrer",
      cancel: "Annuler",
      edit: "Modifier",
      delete: "Supprimer",
      noClasses: "Aucune classe enregistrée",
      addFirst: "Ajoutez la première classe pour commencer",
      studentCount: "Nombre d'élèves",
    },
    en: {
      title: "Class Management",
      addClass: "Add Class",
      name: "Class Name",
      level: "Level",
      description: "Description",
      actions: "Actions",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      noClasses: "No classes registered",
      addFirst: "Add the first class to get started",
      studentCount: "Student Count",
    },
  };

  const l = labels[language];

  const handleSubmit = () => {
    if (!formData.name.trim()) return;

    if (editingClass) {
      setClasses(
        classes.map((c) =>
          c.id === editingClass.id ? { ...formData, id: c.id } : c
        )
      );
    } else {
      setClasses([...classes, { ...formData, id: Date.now().toString() }]);
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    setClasses(classes.filter((c) => c.id !== id));
  };

  const handleEdit = (classSection: ClassSection) => {
    setEditingClass(classSection);
    setFormData({
      name: classSection.name,
      level: classSection.level,
      description: classSection.description,
    });
    setIsAddDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({ name: "", level: "", description: "" });
    setEditingClass(null);
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <FolderOpen className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">{l.title}</h1>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              {l.addClass}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingClass ? l.edit : l.addClass}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>{l.name}</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="1A, 2B, 3C..."
                />
              </div>
              <div className="space-y-2">
                <Label>{l.level}</Label>
                <Input
                  value={formData.level}
                  onChange={(e) =>
                    setFormData({ ...formData, level: e.target.value })
                  }
                  placeholder="السنة الأولى، الثانية..."
                />
              </div>
              <div className="space-y-2">
                <Label>{l.description}</Label>
                <Input
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSubmit} className="flex-1">
                  {l.save}
                </Button>
                <Button variant="outline" onClick={resetForm} className="flex-1">
                  {l.cancel}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      {classes.length > 0 ? (
        <div className="bg-card rounded-xl shadow-soft overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{l.name}</TableHead>
                <TableHead>{l.level}</TableHead>
                <TableHead>{l.description}</TableHead>
                <TableHead className="text-center">{l.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((classSection) => (
                <TableRow key={classSection.id}>
                  <TableCell className="font-medium">{classSection.name}</TableCell>
                  <TableCell>{classSection.level}</TableCell>
                  <TableCell>{classSection.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(classSection)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(classSection.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="bg-card rounded-xl shadow-soft p-12 text-center">
          <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-lg font-medium text-muted-foreground">{l.noClasses}</p>
          <p className="text-sm text-muted-foreground mt-1">{l.addFirst}</p>
        </div>
      )}
    </div>
  );
};

export default ClassesPage;
