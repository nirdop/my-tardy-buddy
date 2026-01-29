import { useState } from "react";
import { Settings, Clock, Bell, Globe, Moon, Sun, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Language } from "@/lib/translations";

const SettingsPage = () => {
  const { language, setLanguage } = useLanguage();
  const [workStartTime, setWorkStartTime] = useState("07:00");
  const [lateThreshold, setLateThreshold] = useState("5");
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const labels = {
    ar: {
      title: "الإعدادات",
      subtitle: "تخصيص إعدادات النظام",
      general: "الإعدادات العامة",
      workTime: "إعدادات وقت الدوام",
      startTime: "وقت بداية الدوام",
      lateThreshold: "حد التأخير (دقائق)",
      lateThresholdDesc: "عدد الدقائق بعد وقت البداية لاعتبار الطالب متأخراً",
      notifications: "الإشعارات",
      enableNotifications: "تفعيل الإشعارات",
      notificationsDesc: "استلام إشعارات عند تسجيل طالب متأخر",
      appearance: "المظهر",
      darkMode: "الوضع الداكن",
      darkModeDesc: "تفعيل الوضع الداكن للواجهة",
      language: "اللغة",
      languageDesc: "اختر لغة الواجهة",
      arabic: "العربية",
      french: "الفرنسية",
      english: "الإنجليزية",
      saveChanges: "حفظ التغييرات",
      saved: "تم الحفظ!",
    },
    fr: {
      title: "Paramètres",
      subtitle: "Personnaliser les paramètres du système",
      general: "Paramètres généraux",
      workTime: "Paramètres de temps de travail",
      startTime: "Heure de début",
      lateThreshold: "Seuil de retard (minutes)",
      lateThresholdDesc: "Minutes après l'heure de début pour considérer un élève en retard",
      notifications: "Notifications",
      enableNotifications: "Activer les notifications",
      notificationsDesc: "Recevoir des notifications lors de l'enregistrement d'un retard",
      appearance: "Apparence",
      darkMode: "Mode sombre",
      darkModeDesc: "Activer le mode sombre de l'interface",
      language: "Langue",
      languageDesc: "Choisir la langue de l'interface",
      arabic: "Arabe",
      french: "Français",
      english: "Anglais",
      saveChanges: "Enregistrer",
      saved: "Enregistré!",
    },
    en: {
      title: "Settings",
      subtitle: "Customize system settings",
      general: "General Settings",
      workTime: "Work Time Settings",
      startTime: "Start Time",
      lateThreshold: "Late Threshold (minutes)",
      lateThresholdDesc: "Minutes after start time to consider a student late",
      notifications: "Notifications",
      enableNotifications: "Enable Notifications",
      notificationsDesc: "Receive notifications when a tardy is recorded",
      appearance: "Appearance",
      darkMode: "Dark Mode",
      darkModeDesc: "Enable dark mode for the interface",
      language: "Language",
      languageDesc: "Choose interface language",
      arabic: "Arabic",
      french: "French",
      english: "English",
      saveChanges: "Save Changes",
      saved: "Saved!",
    },
  };

  const l = labels[language];

  const handleSave = () => {
    // Save settings logic would go here
    console.log("Settings saved:", {
      workStartTime,
      lateThreshold,
      notifications,
      darkMode,
      language,
    });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Settings className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{l.title}</h1>
          <p className="text-sm text-muted-foreground">{l.subtitle}</p>
        </div>
      </div>

      {/* Work Time Settings */}
      <div className="bg-card rounded-xl shadow-soft p-6 space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-border">
          <Clock className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-foreground">{l.workTime}</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>{l.startTime}</Label>
            <Input
              type="time"
              value={workStartTime}
              onChange={(e) => setWorkStartTime(e.target.value)}
              className="max-w-[150px]"
            />
          </div>

          <div className="space-y-2">
            <Label>{l.lateThreshold}</Label>
            <Input
              type="number"
              value={lateThreshold}
              onChange={(e) => setLateThreshold(e.target.value)}
              className="max-w-[150px]"
              min="1"
              max="60"
            />
            <p className="text-sm text-muted-foreground">{l.lateThresholdDesc}</p>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-card rounded-xl shadow-soft p-6 space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-border">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-foreground">{l.notifications}</h2>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground">{l.enableNotifications}</p>
            <p className="text-sm text-muted-foreground">{l.notificationsDesc}</p>
          </div>
          <Switch checked={notifications} onCheckedChange={setNotifications} />
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-card rounded-xl shadow-soft p-6 space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-border">
          {darkMode ? (
            <Moon className="w-5 h-5 text-primary" />
          ) : (
            <Sun className="w-5 h-5 text-primary" />
          )}
          <h2 className="font-bold text-foreground">{l.appearance}</h2>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground">{l.darkMode}</p>
            <p className="text-sm text-muted-foreground">{l.darkModeDesc}</p>
          </div>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        </div>
      </div>

      {/* Language */}
      <div className="bg-card rounded-xl shadow-soft p-6 space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-border">
          <Globe className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-foreground">{l.language}</h2>
        </div>

        <div className="space-y-2">
          <Label>{l.languageDesc}</Label>
          <Select value={language} onValueChange={(val) => setLanguage(val as Language)}>
            <SelectTrigger className="max-w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ar">{l.arabic}</SelectItem>
              <SelectItem value="fr">{l.french}</SelectItem>
              <SelectItem value="en">{l.english}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Save Button */}
      <Button onClick={handleSave} size="lg" className="w-full gap-2">
        <Save className="w-5 h-5" />
        {l.saveChanges}
      </Button>
    </div>
  );
};

export default SettingsPage;
