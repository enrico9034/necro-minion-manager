import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dices } from "lucide-react";
import { cn } from "@/lib/utils";

interface DiceRollButtonProps {
  label: string;
  bonus: number;
  onRoll?: (result: number, natural: number) => void;
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showResultInline?: boolean;
}

export const DiceRollButton = ({ 
  label, 
  bonus, 
  onRoll, 
  variant = "outline", 
  size = "default",
  className,
  showResultInline = false
}: DiceRollButtonProps) => {
  const [isRolling, setIsRolling] = useState(false);
  const [lastRoll, setLastRoll] = useState<{ natural: number; total: number } | null>(null);

  const rollDice = () => {
    setIsRolling(true);
    
    // Animazione di rolling
    setTimeout(() => {
      const natural = Math.floor(Math.random() * 20) + 1;
      const total = natural + bonus;
      
      setLastRoll({ natural, total });
      setIsRolling(false);
      
      if (onRoll) {
        onRoll(total, natural);
      }
    }, 300);
  };

  const isCritical = lastRoll?.natural === 20;
  const isCriticalFail = lastRoll?.natural === 1;
  const isIconOnly = !label || size === "icon";
  const shouldShowResult = lastRoll && (!isIconOnly || showResultInline);

  return (
    <div className={cn("flex gap-1", isIconOnly && showResultInline ? "flex-row-reverse items-center" : "flex-col")}>
      <Button
        variant={variant}
        size={size}
        onClick={rollDice}
        disabled={isRolling}
        className={cn(
          "transition-all",
          isRolling && "animate-pulse",
          className
        )}
      >
        <Dices className={cn("w-4 h-4", !isIconOnly && "mr-2", isRolling && "animate-spin")} />
        {label}
      </Button>
      
      {shouldShowResult && (
        <div className={cn(
          "text-center text-sm font-bold transition-all animate-in fade-in zoom-in duration-300",
          isIconOnly && "text-xs",
          isCritical && "text-yellow-500",
          isCriticalFail && "text-red-500",
          !isCritical && !isCriticalFail && "text-primary"
        )}>
          {!isIconOnly && <span className="text-xs text-muted-foreground">d20: </span>}
          <span className={cn(
            isCritical && "text-yellow-500",
            isCriticalFail && "text-red-500"
          )}>
            {lastRoll.natural}
          </span>
          {bonus !== 0 && (
            <>
              <span className="text-muted-foreground"> {bonus >= 0 ? '+' : ''}{bonus} = </span>
              <span className={cn(isIconOnly ? "text-base" : "text-lg")}>{lastRoll.total}</span>
            </>
          )}
          {!isIconOnly && isCritical && <span className="ml-1">🎯 CRITICO!</span>}
          {!isIconOnly && isCriticalFail && <span className="ml-1">💀 FALLIMENTO!</span>}
          {isIconOnly && isCritical && <span className="ml-1">🎯</span>}
          {isIconOnly && isCriticalFail && <span className="ml-1">💀</span>}
        </div>
      )}
    </div>
  );
};
