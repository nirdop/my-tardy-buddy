import { Clock, MapPin, AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface UpcomingEventProps {
  title: string;
  time: string;
  location: string;
  minutesUntilLeave: number;
  className?: string;
}

const UpcomingEvent = ({
  title,
  time,
  location,
  minutesUntilLeave,
  className,
}: UpcomingEventProps) => {
  const isUrgent = minutesUntilLeave <= 10 && minutesUntilLeave > 0;
  const hasTime = minutesUntilLeave > 10;
  const shouldHaveLeft = minutesUntilLeave <= 0;

  return (
    <div
      className={cn(
        "rounded-2xl p-5 shadow-card transition-all duration-300 hover:scale-[1.02] bg-card",
        isUrgent && "ring-2 ring-accent ring-offset-2 ring-offset-background",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-foreground">{title}</h3>
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">{time}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{location}</span>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "px-4 py-2 rounded-xl text-center min-w-[100px]",
            hasTime && "bg-success/10",
            isUrgent && "bg-accent/10 animate-pulse-soft",
            shouldHaveLeft && "bg-destructive/10"
          )}
        >
          {shouldHaveLeft ? (
            <>
              <AlertCircle className="w-5 h-5 mx-auto text-destructive" />
              <p className="text-xs font-bold text-destructive mt-1">Leave now!</p>
            </>
          ) : isUrgent ? (
            <>
              <p className="text-2xl font-extrabold text-accent">{minutesUntilLeave}</p>
              <p className="text-xs font-semibold text-accent">min to go!</p>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 mx-auto text-success" />
              <p className="text-xs font-bold text-success mt-1">{minutesUntilLeave} min</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvent;
