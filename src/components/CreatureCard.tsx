import { Creature, getDamageBonus } from "@/types/creature";
import { useSettings } from "@/hooks/useSettings";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DiceRollButton } from "@/components/DiceRollButton";
import { Heart, Skull, Swords, Eye, Trash2, Sword } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import React from "react";

interface CreatureCardProps {
  creature: Creature;
  onDelete: (id: string) => void;
  onUpdateHP: (id: string, hp: number) => void;
}

export const CreatureCard = ({ creature, onDelete, onUpdateHP }: CreatureCardProps) => {
  const { settings } = useSettings();
  const [damageResults, setDamageResults] = React.useState<Record<number, { rolls: number[], total: number, rawTotal: number }>>({});
  const hpPercentage = (creature.hpCurrent / creature.hpMax) * 100;
  const getHPColor = () => {
    if (hpPercentage > 66) return "bg-primary";
    if (hpPercentage > 33) return "bg-yellow-500";
    return "bg-destructive";
  };

  const statModifier = (stat: number) => {
    const mod = Math.floor((stat - 10) / 2);
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  // Determina quali azioni mostrare: se ci sono azioni attive, mostra solo quelle, altrimenti le prime 2
  const actionsToShow = creature.activeActionIndex && creature.activeActionIndex.length > 0
    ? creature.actions.filter((_, idx) => creature.activeActionIndex!.includes(idx))
    : creature.actions.slice(0, 2);

  // Aggiungi azioni custom se presenti
  const allActions = [...actionsToShow, ...(creature.customActions || [])];

  return (
    <Card className="card-necro border-border hover:border-primary transition-all duration-300 overflow-hidden group">
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold text-primary glow-necro mb-1">
              {creature.name}
            </h3>
            <p className="text-muted-foreground text-sm uppercase tracking-wider">
              {creature.type} {creature.customType && `(${creature.customType})`}
            </p>
          </div>
          <Skull className="w-8 h-8 text-secondary opacity-50 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* HP Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-destructive" />
              <span className="font-semibold">PF</span>
            </div>
            <span className="font-mono">
              {creature.hpCurrent} / {creature.hpMax}
            </span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full ${getHPColor()} transition-all duration-500`}
              style={{ width: `${Math.max(0, hpPercentage)}%` }}
            />
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onUpdateHP(creature.id, Math.max(0, creature.hpCurrent - 1))}
              className="flex-1"
            >
              -1
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onUpdateHP(creature.id, Math.max(0, creature.hpCurrent - 5))}
              className="flex-1"
            >
              -5
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                onUpdateHP(creature.id, Math.min(creature.hpMax, creature.hpCurrent + 5))
              }
              className="flex-1"
            >
              +5
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onUpdateHP(creature.id, creature.hpMax)}
              className="flex-1"
            >
              Max
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-xs text-muted-foreground uppercase mb-1">CA</p>
            <p className="text-lg font-bold text-foreground">{creature.ac}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground uppercase mb-1">Iniziativa</p>
            <p className="text-lg font-bold text-foreground">
              {creature.initiative >= 0 ? "+" : ""}
              {creature.initiative}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground uppercase mb-1">Velocità</p>
            <p className="text-lg font-bold text-foreground">{creature.speed}</p>
          </div>
        </div>

        {/* Initiative Roll */}
        <div className="pt-2">
          <DiceRollButton
            label="Tira Iniziativa"
            bonus={creature.initiative}
            variant="secondary"
            size="sm"
            className="w-full"
            onRoll={(total, natural) => {
              const isCrit = natural === 20;
              const isFail = natural === 1;
              toast.success(
                `${creature.name} ha tirato ${total} per l'iniziativa!${isCrit ? " 🎯 CRITICO!" : isFail ? " 💀" : ""}`,
                { duration: 3000 }
              );
            }}
          />
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Swords className="w-4 h-4" />
            <span>Azioni</span>
          </div>
          {allActions.map((action, idx) => {
            const damageBonus = getDamageBonus(creature.wizardLevel);
            const totalDamage = action.damageBonus + damageBonus + settings.globalDamageBonus;
            
            // Funzione per parsare i dadi dal damageDice (es: "1d6" -> 1d6)
            const rollDamage = () => {
              const match = action.damageDice.match(/(\d+)d(\d+)/);
              if (!match) return 0;
              
              const numDice = parseInt(match[1]);
              const diceSize = parseInt(match[2]);
              let total = 0;
              const rolls: number[] = [];
              
              for (let i = 0; i < numDice; i++) {
                const roll = Math.floor(Math.random() * diceSize) + 1;
                rolls.push(roll);
                total += roll;
              }
              
              return { rolls, total: total + totalDamage, rawTotal: total };
            };
            
            return (
              <div key={idx} className="text-sm bg-muted/50 p-2 rounded space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{action.name}</p>
                  </div>
                  <DiceRollButton
                    label=""
                    bonus={action.toHit}
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 p-0 shrink-0"
                    showResultInline={true}
                    onRoll={(total, natural) => {
                      // Reset del risultato danni quando si tira per colpire
                      setDamageResults(prev => {
                        const newResults = { ...prev };
                        delete newResults[idx];
                        return newResults;
                      });
                      const isCrit = natural === 20;
                      const isFail = natural === 1;
                      toast.success(
                        `${creature.name} - ${action.name}: ${total}${isCrit ? " 🎯 CRITICO!" : isFail ? " 💀" : ""}`,
                        { duration: 2500 }
                      );
                    }}
                  />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-muted-foreground">
                    Colpire: +{action.toHit} | Danno: {action.damageDice}+{totalDamage}
                  </p>
                  <div className="flex items-center gap-1">
                    {damageResults[idx] && (
                      <span className="text-xs font-mono text-red-600">
                        {damageResults[idx].rawTotal}+{totalDamage} = {damageResults[idx].total}
                      </span>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 p-0 shrink-0"
                      onClick={() => {
                        const result = rollDamage();
                        setDamageResults(prev => ({ ...prev, [idx]: result }));
                        toast.success(
                          `${creature.name} - ${action.name} Danni: ${result.rolls.join('+')}+${totalDamage} = ${result.total}`,
                          { duration: 3000 }
                        );
                      }}
                    >
                      <Sword className="h-3 w-3 text-red-600" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-border">
          <Button asChild variant="outline" className="flex-1">
            <Link to={`/creature/${creature.id}`}>
              <Eye className="w-4 h-4 mr-2" />
              Dettagli
            </Link>
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => {
              if (window.confirm(`Eliminare ${creature.name}?`)) {
                onDelete(creature.id);
              }
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
