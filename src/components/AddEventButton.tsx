import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddEventButtonProps {
  onClick?: () => void;
  className?: string;
}

const AddEventButton = ({ onClick, className }: AddEventButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full py-4 rounded-2xl border-2 border-dashed border-primary/30",
        "flex items-center justify-center gap-2",
        "text-primary font-semibold",
        "hover:border-primary hover:bg-primary/5 transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
        className
      )}
    >
      <Plus className="w-5 h-5" />
      <span>Add new event</span>
    </button>
  );
};

export default AddEventButton;
