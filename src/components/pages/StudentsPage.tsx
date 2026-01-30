import { useState, useRef } from "react";
import { Users, Plus, Search, Edit, Trash2, UserPlus, Upload, FileSpreadsheet } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ClassSection } from "./ClassesPage";
import * as XLSX from "xlsx";
import { toast } from "sonner";

export interface Student {
  id: string;
  name: string;
  class: string;
  studentId: string;
  phone: string;
}

const StudentsPage = () => {
  const { language } = useLanguage();
  const [students, setStudents] = useLocalStorage<Student[]>("students", []);
  const [classes] = useLocalStorage<ClassSection[]>("classes", []);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    studentId: "",
    phone: "",
  });
  const [importClass, setImportClass] = useState("");
  const [importPreview, setImportPreview] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const labels = {
    ar: {
      title: "إدارة الطلاب",
      addStudent: "إضافة طالب",
      importFromExcel: "استيراد من Excel",
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
      selectClass: "اختر الفصل",
      selectFile: "اختر ملف Excel",
      importTitle: "استيراد طلاب من Excel",
      preview: "معاينة الأسماء",
      importBtn: "استيراد",
      noClasses: "يرجى إضافة أقسام أولاً",
      studentsFound: "طالب تم العثور عليه",
      importSuccess: "تم استيراد الطلاب بنجاح",
      noNames: "لم يتم العثور على أسماء",
    },
    fr: {
      title: "Gestion des élèves",
      addStudent: "Ajouter un élève",
      importFromExcel: "Importer depuis Excel",
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
      selectClass: "Sélectionner la classe",
      selectFile: "Sélectionner un fichier Excel",
      importTitle: "Importer des élèves depuis Excel",
      preview: "Aperçu des noms",
      importBtn: "Importer",
      noClasses: "Veuillez d'abord ajouter des classes",
      studentsFound: "élèves trouvés",
      importSuccess: "Élèves importés avec succès",
      noNames: "Aucun nom trouvé",
    },
    en: {
      title: "Student Management",
      addStudent: "Add Student",
      importFromExcel: "Import from Excel",
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
      selectClass: "Select class",
      selectFile: "Select Excel file",
      importTitle: "Import students from Excel",
      preview: "Preview names",
      importBtn: "Import",
      noClasses: "Please add classes first",
      studentsFound: "students found",
      importSuccess: "Students imported successfully",
      noNames: "No names found",
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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Extract names starting from row 17, column D
        const names: string[] = [];
        let row = 17;
        
        while (true) {
          const cellAddress = `D${row}`;
          const cell = worksheet[cellAddress];
          
          if (!cell || !cell.v || String(cell.v).trim() === "") {
            break;
          }
          
          const name = String(cell.v).trim();
          if (name) {
            names.push(name);
          }
          row++;
        }

        setImportPreview(names);
        
        if (names.length === 0) {
          toast.error(l.noNames);
        }
      } catch (error) {
        console.error("Error reading Excel file:", error);
        toast.error("Error reading file");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleImport = () => {
    if (!importClass || importPreview.length === 0) return;

    const newStudents: Student[] = importPreview.map((name, index) => ({
      id: `${Date.now()}-${index}`,
      name: name,
      class: importClass,
      studentId: `${Date.now()}-${index}`,
      phone: "",
    }));

    setStudents([...students, ...newStudents]);
    toast.success(`${l.importSuccess} (${newStudents.length})`);
    
    // Reset import state
    setImportPreview([]);
    setImportClass("");
    setIsImportDialogOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetImport = () => {
    setImportPreview([]);
    setImportClass("");
    setIsImportDialogOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
        <div className="flex gap-2">
          {/* Import from Excel */}
          <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Upload className="w-4 h-4" />
                {l.importFromExcel}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5" />
                  {l.importTitle}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {/* Select Class */}
                <div className="space-y-2">
                  <Label>{l.class}</Label>
                  {classes.length > 0 ? (
                    <Select value={importClass} onValueChange={setImportClass}>
                      <SelectTrigger>
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
                  ) : (
                    <p className="text-sm text-muted-foreground">{l.noClasses}</p>
                  )}
                </div>

                {/* File Input */}
                <div className="space-y-2">
                  <Label>{l.selectFile}</Label>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileSelect}
                    className="cursor-pointer"
                  />
                </div>

                {/* Preview */}
                {importPreview.length > 0 && (
                  <div className="space-y-2">
                    <Label>{l.preview} ({importPreview.length} {l.studentsFound})</Label>
                    <div className="max-h-48 overflow-y-auto bg-muted rounded-lg p-3 space-y-1">
                      {importPreview.map((name, index) => (
                        <div key={index} className="text-sm py-1 border-b border-border last:border-0">
                          {index + 1}. {name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={handleImport} 
                    className="flex-1"
                    disabled={!importClass || importPreview.length === 0}
                  >
                    {l.importBtn}
                  </Button>
                  <Button variant="outline" onClick={resetImport} className="flex-1">
                    {l.cancel}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Add Student */}
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
                  {classes.length > 0 ? (
                    <Select 
                      value={formData.class} 
                      onValueChange={(value) => setFormData({ ...formData, class: value })}
                    >
                      <SelectTrigger>
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
                  ) : (
                    <Input
                      value={formData.class}
                      onChange={(e) =>
                        setFormData({ ...formData, class: e.target.value })
                      }
                    />
                  )}
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
          <UserPlus className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-lg font-medium text-muted-foreground">{l.noStudents}</p>
          <p className="text-sm text-muted-foreground mt-1">{l.addFirst}</p>
        </div>
      )}
    </div>
  );
};

export default StudentsPage;
