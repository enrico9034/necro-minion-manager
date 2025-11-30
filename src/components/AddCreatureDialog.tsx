import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Creature, SKELETON_TEMPLATE, ZOMBIE_TEMPLATE, CreatureType, getDamageBonus } from "@/types/creature";
import { toast } from "sonner";

interface AddCreatureDialogProps {
  onAdd: (creature: Creature) => void;
}

export const AddCreatureDialog = ({ onAdd }: AddCreatureDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState<CreatureType>("SCHELETRO");
  const [wizardLevel, setWizardLevel] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Inserisci un nome per la creatura!");
      return;
    }

    const template = type === "SCHELETRO" ? SKELETON_TEMPLATE : ZOMBIE_TEMPLATE;
    const hpMax = template.baseHp + wizardLevel;

    const newCreature: Creature = {
      ...template,
      id: crypto.randomUUID(),
      name: name.trim(),
      wizardLevel,
      hpMax,
      hpCurrent: hpMax,
    };

    onAdd(newCreature);
    toast.success(`${name} è stato evocato!`);
    setOpen(false);
    setName("");
    setType("SCHELETRO");
    setWizardLevel(1);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Plus className="w-5 h-5" />
          Evoca Non-Morto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary glow-necro">
            Evoca una Nuova Creatura
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Es: Guerriero Scheletrico"
              className="bg-muted border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo di Creatura</Label>
            <Select value={type} onValueChange={(v) => setType(v as CreatureType)}>
              <SelectTrigger className="bg-muted border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SCHELETRO">Scheletro</SelectItem>
                <SelectItem value="ZOMBIE">Zombie</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wizardLevel">Livello Mago</Label>
            <Input
              id="wizardLevel"
              type="number"
              min="1"
              max="20"
              value={wizardLevel}
              onChange={(e) => setWizardLevel(Number(e.target.value))}
              className="bg-muted border-border"
            />
          </div>

          <div className="bg-muted/50 p-3 rounded text-sm space-y-2">
            <p className="text-muted-foreground">
              PF Massimi:{" "}
              <span className="font-bold text-foreground">
                {(type === "SCHELETRO" ? 13 : 22) + wizardLevel}
              </span>
            </p>
            {wizardLevel >= 6 && (
              <p className="text-xs text-primary">
                ✓ Bonus ai danni: +{getDamageBonus(wizardLevel)} (Servitori Non Morti)
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Evoca Creatura
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
