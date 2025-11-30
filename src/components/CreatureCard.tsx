import { Creature, getDamageBonus } from "@/types/creature";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Skull, Swords, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface CreatureCardProps {
  creature: Creature;
  onDelete: (id: string) => void;
  onUpdateHP: (id: string, hp: number) => void;
}

export const CreatureCard = ({ creature, onDelete, onUpdateHP }: CreatureCardProps) => {
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

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Swords className="w-4 h-4" />
            <span>Azioni</span>
          </div>
          {creature.actions.slice(0, 2).map((action, idx) => {
            const damageBonus = getDamageBonus(creature.wizardLevel);
            const totalDamage = action.damageBonus + damageBonus;
            return (
              <div key={idx} className="text-sm bg-muted/50 p-2 rounded">
                <p className="font-semibold text-foreground">{action.name}</p>
                <p className="text-xs text-muted-foreground">
                  Colpire: +{action.toHit} | Danno: {action.damageDice}+{totalDamage}
                </p>
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
