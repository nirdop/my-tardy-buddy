import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakCardProps {
  streak: number;
  className?: string;
}

const StreakCard = ({ streak, className }: StreakCardProps) => {
  const isOnFire = streak >= 7;

  return (
    <div
      className={cn(
        "rounded-2xl p-6 shadow-card transition-all duration-300 hover:shadow-glow",
        isOnFire ? "bg-gradient-accent" : "bg-card",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center",
            isOnFire ? "bg-accent-foreground/20" : "bg-gradient-accent"
          )}
        >
          <Flame
            className={cn(
              "w-7 h-7",
              isOnFire ? "text-accent-foreground animate-wiggle" : "text-accent-foreground"
            )}
          />
        </div>
        <div>
          <p
            className={cn(
              "text-sm font-medium",
              isOnFire ? "text-accent-foreground/80" : "text-muted-foreground"
            )}
          >
            On-time streak
          </p>
          <p
            className={cn(
              "text-3xl font-extrabold",
              isOnFire ? "text-accent-foreground" : "text-foreground"
            )}
          >
            {streak} days
          </p>
        </div>
      </div>
      {isOnFire && (
        <p className="mt-3 text-sm font-semibold text-accent-foreground/90">
          🔥 You're on fire! Keep it going!
        </p>
      )}
    </div>
  );
};

export default StreakCard;
