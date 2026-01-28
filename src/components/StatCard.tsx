import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  subtitle: string;
  variant?: "default" | "success" | "danger" | "warning";
  className?: string;
}

const StatCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  variant = "default",
  className,
}: StatCardProps) => {
  const variantStyles = {
    default: {
      bg: "bg-card",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    success: {
      bg: "bg-success/5",
      iconBg: "bg-success/15",
      iconColor: "text-success",
    },
    danger: {
      bg: "bg-danger/5",
      iconBg: "bg-danger/15",
      iconColor: "text-danger",
    },
    warning: {
      bg: "bg-warning/5",
      iconBg: "bg-warning/15",
      iconColor: "text-warning",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        "rounded-xl p-5 shadow-soft transition-all duration-200 hover:shadow-card",
        styles.bg,
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        </div>
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            styles.iconBg
          )}
        >
          <Icon className={cn("w-6 h-6", styles.iconColor)} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
