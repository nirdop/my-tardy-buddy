import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtext?: string;
  variant?: "default" | "success" | "warning";
  className?: string;
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  subtext,
  variant = "default",
  className,
}: StatCardProps) => {
  const variantStyles = {
    default: "bg-card",
    success: "bg-success/5",
    warning: "bg-warning/5",
  };

  const iconBgStyles = {
    default: "bg-primary/10",
    success: "bg-success/15",
    warning: "bg-warning/15",
  };

  const iconStyles = {
    default: "text-primary",
    success: "text-success",
    warning: "text-warning",
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-5 shadow-soft transition-all duration-300 hover:shadow-card",
        variantStyles[variant],
        className
      )}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center mb-3",
          iconBgStyles[variant]
        )}
      >
        <Icon className={cn("w-5 h-5", iconStyles[variant])} />
      </div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-2xl font-extrabold text-foreground mt-1">{value}</p>
      {subtext && (
        <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
      )}
    </div>
  );
};

export default StatCard;
