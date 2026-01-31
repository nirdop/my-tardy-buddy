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
  studentId: string;
  name: string;
  class: string;
  birthDate: string;
  grades: {
    test1: number | null;
    test2: number | null;
    test3: number | null;
  };
  notes: string;
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
    birthDate: "",
    grades: { test1: null as number | null, test2: null as number | null, test3: null as number | null },
    notes: "",
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
      birthDate: "تاريخ الازدياد",
      grades: "النقاط",
      test1: "الفرض 1",
      test2: "الفرض 2",
      test3: "الفرض 3",
      notes: "ملاحظات",
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
      birthDate: "Date de naissance",
      grades: "Notes",
      test1: "Devoir 1",
      test2: "Devoir 2",
      test3: "Devoir 3",
      notes: "Remarques",
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
      birthDate: "Birth Date",
      grades: "Grades",
      test1: "Test 1",
      test2: "Test 2",
      test3: "Test 3",
      notes: "Notes",
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
      birthDate: student.birthDate,
      grades: student.grades,
      notes: student.notes,
      phone: student.phone,
    });
    setIsAddDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({ 
      name: "", 
      class: "", 
      studentId: "", 
      birthDate: "",
      grades: { test1: null, test2: null, test3: null },
      notes: "",
      phone: "" 
    });
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

        // Extract data starting from row 17
        const students: Array<{
          studentId: string;
          name: string;
          birthDate: string;
          grades: { test1: number | null; test2: number | null; test3: number | null };
          notes: string;
        }> = [];
        let row = 17;
        
        while (true) {
          const idCell = worksheet[`C${row}`];
          const nameCell = worksheet[`D${row}`];
          const lastNameCell = worksheet[`E${row}`];
          
          // Stop if no ID or name found
          if ((!idCell || !idCell.v) && (!nameCell || !nameCell.v)) {
            break;
          }
          
          const studentId = idCell?.v ? String(idCell.v).trim() : "";
          const firstName = nameCell?.v ? String(nameCell.v).trim() : "";
          const lastName = lastNameCell?.v ? String(lastNameCell.v).trim() : "";
          const fullName = `${firstName} ${lastName}`.trim();
          
          const birthDateCell = worksheet[`F${row}`];
          const birthDate = birthDateCell?.v ? String(birthDateCell.v).trim() : "";
          
          const grade1Cell = worksheet[`G${row}`];
          const grade2Cell = worksheet[`I${row}`];
          const grade3Cell = worksheet[`K${row}`];
          
          const parseGrade = (cell: any): number | null => {
            if (!cell || cell.v === undefined || cell.v === null || cell.v === "") return null;
            const num = parseFloat(cell.v);
            return isNaN(num) ? null : num;
          };
          
          const notesCell = worksheet[`M${row}`];
          const notes = notesCell?.v ? String(notesCell.v).trim() : "";
          
          if (fullName) {
            students.push({
              studentId,
              name: fullName,
              birthDate,
              grades: {
                test1: parseGrade(grade1Cell),
                test2: parseGrade(grade2Cell),
                test3: parseGrade(grade3Cell),
              },
              notes,
            });
          }
          row++;
        }

        setImportPreview(students.map(s => `${s.studentId} - ${s.name}`));
        
        if (students.length === 0) {
          toast.error(l.noNames);
        } else {
          // Store full student data for import
          (window as any).__importStudents = students;
        }
      } catch (error) {
        console.error("Error reading Excel file:", error);
        toast.error("Error reading file");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleImport = () => {
    const importedStudents = (window as any).__importStudents as Array<{
      studentId: string;
      name: string;
      birthDate: string;
      grades: { test1: number | null; test2: number | null; test3: number | null };
      notes: string;
    }> | undefined;

    if (!importClass || !importedStudents || importedStudents.length === 0) return;

    const newStudents: Student[] = importedStudents.map((s, index) => ({
      id: `${Date.now()}-${index}`,
      studentId: s.studentId || `${Date.now()}-${index}`,
      name: s.name,
      class: importClass,
      birthDate: s.birthDate,
      grades: s.grades,
      notes: s.notes,
      phone: "",
    }));

    setStudents([...students, ...newStudents]);
    toast.success(`${l.importSuccess} (${newStudents.length})`);
    
    // Reset import state
    setImportPreview([]);
    setImportClass("");
    setIsImportDialogOpen(false);
    delete (window as any).__importStudents;
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
              <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
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
                    <Label>{l.birthDate}</Label>
                    <Input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) =>
                        setFormData({ ...formData, birthDate: e.target.value })
                      }
                    />
                  </div>
                </div>
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
                  <Label>{l.grades}</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Label className="text-xs text-muted-foreground">{l.test1}</Label>
                      <Input
                        type="number"
                        step="0.5"
                        min="0"
                        max="20"
                        value={formData.grades.test1 ?? ""}
                        onChange={(e) =>
                          setFormData({ 
                            ...formData, 
                            grades: { 
                              ...formData.grades, 
                              test1: e.target.value ? parseFloat(e.target.value) : null 
                            } 
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">{l.test2}</Label>
                      <Input
                        type="number"
                        step="0.5"
                        min="0"
                        max="20"
                        value={formData.grades.test2 ?? ""}
                        onChange={(e) =>
                          setFormData({ 
                            ...formData, 
                            grades: { 
                              ...formData.grades, 
                              test2: e.target.value ? parseFloat(e.target.value) : null 
                            } 
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">{l.test3}</Label>
                      <Input
                        type="number"
                        step="0.5"
                        min="0"
                        max="20"
                        value={formData.grades.test3 ?? ""}
                        onChange={(e) =>
                          setFormData({ 
                            ...formData, 
                            grades: { 
                              ...formData.grades, 
                              test3: e.target.value ? parseFloat(e.target.value) : null 
                            } 
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{l.notes}</Label>
                  <Input
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
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
                <TableHead>{l.studentId}</TableHead>
                <TableHead>{l.name}</TableHead>
                <TableHead>{l.class}</TableHead>
                <TableHead>{l.birthDate}</TableHead>
                <TableHead className="text-center">{l.grades}</TableHead>
                <TableHead>{l.notes}</TableHead>
                <TableHead className="text-center">{l.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.birthDate}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex gap-1 justify-center text-xs">
                      <span className="px-1.5 py-0.5 bg-muted rounded">
                        {student.grades?.test1 ?? "-"}
                      </span>
                      <span className="px-1.5 py-0.5 bg-muted rounded">
                        {student.grades?.test2 ?? "-"}
                      </span>
                      <span className="px-1.5 py-0.5 bg-muted rounded">
                        {student.grades?.test3 ?? "-"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate" title={student.notes}>
                    {student.notes}
                  </TableCell>
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
