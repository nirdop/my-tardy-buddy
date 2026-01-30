import { useState } from "react";
import { Users, Plus, Search, Edit, Trash2, UserPlus } from "lucide-react";
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

export interface Student {
  id: string;
  name: string;
  class: string;
  studentId: string;
  phone: string;
}

const StudentsPage = () => {
  const { t, language } = useLanguage();
  const [students, setStudents] = useLocalStorage<Student[]>("students", []);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    studentId: "",
    phone: "",
  });

  const labels = {
    ar: {
      title: "إدارة الطلاب",
      addStudent: "إضافة طالب",
      search: "بحث عن طالب...",
      name: "الاسم",
      class: "الفصل",
      studentId: "رقم الطالب",
      phone: "رقم الهاتف",
      actions: "الإجراءات",
      save: "حفظ",
      cancel: "إلغاء",
      edit: "تعديل",
      delete: "حذف",
      noStudents: "لا يوجد طلاب مسجلين",
      addFirst: "أضف أول طالب للبدء",
    },
    fr: {
      title: "Gestion des élèves",
      addStudent: "Ajouter un élève",
      search: "Rechercher un élève...",
      name: "Nom",
      class: "Classe",
      studentId: "Numéro d'élève",
      phone: "Téléphone",
      actions: "Actions",
      save: "Enregistrer",
      cancel: "Annuler",
      edit: "Modifier",
      delete: "Supprimer",
      noStudents: "Aucun élève inscrit",
      addFirst: "Ajoutez le premier élève pour commencer",
    },
    en: {
      title: "Student Management",
      addStudent: "Add Student",
      search: "Search for a student...",
      name: "Name",
      class: "Class",
      studentId: "Student ID",
      phone: "Phone",
      actions: "Actions",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      noStudents: "No students registered",
      addFirst: "Add the first student to get started",
    },
  };

  const l = labels[language];

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.includes(searchQuery)
  );

  const handleSubmit = () => {
    if (editingStudent) {
      setStudents(
        students.map((s) =>
          s.id === editingStudent.id ? { ...formData, id: s.id } : s
        )
      );
    } else {
      setStudents([...students, { ...formData, id: Date.now().toString() }]);
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      class: student.class,
      studentId: student.studentId,
      phone: student.phone,
    });
    setIsAddDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({ name: "", class: "", studentId: "", phone: "" });
    setEditingStudent(null);
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">{l.title}</h1>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              {l.addStudent}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingStudent ? l.edit : l.addStudent}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>{l.name}</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>{l.class}</Label>
                <Input
                  value={formData.class}
                  onChange={(e) =>
                    setFormData({ ...formData, class: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>{l.studentId}</Label>
                <Input
                  value={formData.studentId}
                  onChange={(e) =>
                    setFormData({ ...formData, studentId: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>{l.phone}</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
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

      {/* Table */}
      {filteredStudents.length > 0 ? (
        <div className="bg-card rounded-xl shadow-soft overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{l.name}</TableHead>
                <TableHead>{l.class}</TableHead>
                <TableHead>{l.studentId}</TableHead>
                <TableHead>{l.phone}</TableHead>
                <TableHead className="text-center">{l.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(student)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(student.id)}
                      >
                        <Trash2 className="w-4 h-4 text-danger" />
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
          <UserPlus className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-lg font-medium text-muted-foreground">{l.noStudents}</p>
          <p className="text-sm text-muted-foreground mt-1">{l.addFirst}</p>
        </div>
      )}
    </div>
  );
};

export default StudentsPage;
