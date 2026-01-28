import { cn } from "@/lib/utils";

interface TardyMascotProps {
  size?: "sm" | "md" | "lg";
  mood?: "happy" | "encouraging" | "celebrating";
  className?: string;
}

const TardyMascot = ({ size = "md", mood = "happy", className }: TardyMascotProps) => {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const moodEmoji = {
    happy: "🐢",
    encouraging: "🐢",
    celebrating: "🎉",
  };

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          sizeClasses[size],
          "rounded-full bg-gradient-hero flex items-center justify-center shadow-glow animate-float"
        )}
      >
        <span className={cn(
          size === "sm" ? "text-2xl" : size === "md" ? "text-4xl" : "text-5xl"
        )}>
          {moodEmoji[mood]}
        </span>
      </div>
      {mood === "celebrating" && (
        <div className="absolute -top-2 -right-2 text-2xl animate-wiggle">✨</div>
      )}
    </div>
  );
};

export default TardyMascot;
