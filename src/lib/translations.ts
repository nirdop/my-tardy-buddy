export const translations = {
  ar: {
    // App
    appName: "نظام التأخر",
    appDescription: "إدارة حضور الطلاب",
    connectedToServer: "متصل بالخادم",
    
    // Navigation
    dashboard: "لوحة التحكم",
    classes: "الأقسام",
    students: "الطلاب",
    attendance: "تسجيل الدخول",
    records: "سجل التأخر",
    statistics: "الإحصائيات",
    settings: "الإعدادات",
    
    // Dashboard
    workStartTime: "وقت بداية الدوام",
    totalStudents: "إجمالي الطلاب",
    registeredStudent: "طالب مسجل",
    attendanceToday: "الحضور اليوم",
    onTime: "في الوقت المحدد",
    tardyToday: "المتأخرون اليوم",
    tardyStudent: "طالب متأخر",
    avgDelay: "متوسط التأخير",
    minute: "دقيقة",
    minutes: "دقيقة",
    times: "مرات",
    
    // Cards
    todayTardy: "المتأخرون اليوم",
    topTardy: "أكثر الطلاب تأخراً",
    noTardyToday: "لا يوجد طلاب متأخرون اليوم",
    excellentPerformance: "أداء ممتاز! 🎉",
    noTardyRecords: "لا توجد سجلات تأخير",
    startRecording: "ابدأ بتسجيل الحضور",
    
    // Coming soon
    comingSoon: "قريباً",
    studentManagement: "إدارة الطلاب",
    attendanceRegistration: "تسجيل الدخول",
    tardyRecords: "سجل التأخر",
    statisticsPage: "الإحصائيات",
    settingsPage: "الإعدادات",
    
    // Language
    language: "اللغة",
    arabic: "العربية",
    french: "الفرنسية",
    english: "الإنجليزية",
  },
  
  fr: {
    // App
    appName: "Système de Retard",
    appDescription: "Gestion de présence des élèves",
    connectedToServer: "Connecté au serveur",
    
    // Navigation
    dashboard: "Tableau de bord",
    classes: "Classes",
    students: "Élèves",
    attendance: "Enregistrement",
    records: "Registre des retards",
    statistics: "Statistiques",
    settings: "Paramètres",
    
    // Dashboard
    workStartTime: "Heure de début",
    totalStudents: "Total des élèves",
    registeredStudent: "élève inscrit",
    attendanceToday: "Présence aujourd'hui",
    onTime: "à l'heure",
    tardyToday: "Retardataires",
    tardyStudent: "élève en retard",
    avgDelay: "Retard moyen",
    minute: "minute",
    minutes: "minutes",
    times: "fois",
    
    // Cards
    todayTardy: "Retardataires aujourd'hui",
    topTardy: "Élèves les plus en retard",
    noTardyToday: "Aucun élève en retard aujourd'hui",
    excellentPerformance: "Excellente performance! 🎉",
    noTardyRecords: "Aucun enregistrement de retard",
    startRecording: "Commencez l'enregistrement",
    
    // Coming soon
    comingSoon: "Bientôt",
    studentManagement: "Gestion des élèves",
    attendanceRegistration: "Enregistrement de présence",
    tardyRecords: "Registre des retards",
    statisticsPage: "Statistiques",
    settingsPage: "Paramètres",
    
    // Language
    language: "Langue",
    arabic: "Arabe",
    french: "Français",
    english: "Anglais",
  },
  
  en: {
    // App
    appName: "Tardy System",
    appDescription: "Student Attendance Management",
    connectedToServer: "Connected to server",
    
    // Navigation
    dashboard: "Dashboard",
    classes: "Classes",
    students: "Students",
    attendance: "Attendance",
    records: "Tardy Records",
    statistics: "Statistics",
    settings: "Settings",
    
    // Dashboard
    workStartTime: "Start Time",
    totalStudents: "Total Students",
    registeredStudent: "registered student",
    attendanceToday: "Attendance Today",
    onTime: "on time",
    tardyToday: "Tardy Today",
    tardyStudent: "tardy student",
    avgDelay: "Avg. Delay",
    minute: "minute",
    minutes: "minutes",
    times: "times",
    
    // Cards
    todayTardy: "Tardy Today",
    topTardy: "Most Tardy Students",
    noTardyToday: "No tardy students today",
    excellentPerformance: "Excellent performance! 🎉",
    noTardyRecords: "No tardy records",
    startRecording: "Start recording attendance",
    
    // Coming soon
    comingSoon: "Coming Soon",
    studentManagement: "Student Management",
    attendanceRegistration: "Attendance Registration",
    tardyRecords: "Tardy Records",
    statisticsPage: "Statistics",
    settingsPage: "Settings",
    
    // Language
    language: "Language",
    arabic: "Arabic",
    french: "French",
    english: "English",
  },
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.ar;
