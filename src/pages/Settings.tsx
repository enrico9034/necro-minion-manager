import { useSettings } from "@/hooks/useSettings";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Settings, Sparkles, Heart, Swords, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { settings, updateSettings } = useSettings();
  const [wizardLevel, setWizardLevel] = useState(settings.wizardLevel);
  const [globalHPBonus, setGlobalHPBonus] = useState(settings.globalHPBonus);
  const [globalDamageBonus, setGlobalDamageBonus] = useState(settings.globalDamageBonus);

  const handleSave = () => {
    updateSettings({
      wizardLevel: Math.max(1, Math.min(20, wizardLevel)),
      globalHPBonus: Math.max(0, globalHPBonus),
      globalDamageBonus: Math.max(0, globalDamageBonus),
    });
    toast.success("Impostazioni salvate!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-3">
              <Settings className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-4xl font-bold text-primary glow-necro">Impostazioni Necromante</h1>
                <p className="text-muted-foreground mt-1">Configura il tuo personaggio e i bonus globali</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          {/* Livello Necromante */}
          <Card className="card-necro border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Livello Necromante</h2>
            </div>
            <div className="space-y-3">
              <Label htmlFor="wizardLevel" className="text-sm text-muted-foreground">
                Il tuo livello da Mago/Stregone verrà usato come default quando evochi creature
              </Label>
              <Input
                id="wizardLevel"
                type="number"
                min="1"
                max="20"
                value={wizardLevel}
                onChange={(e) => setWizardLevel(Number(e.target.value))}
                className="bg-muted border-border text-2xl font-bold text-center"
              />
              <p className="text-xs text-muted-foreground">
                Livello 1-20 • Determina i PF e i danni base delle creature evocate
              </p>
            </div>
          </Card>

          {/* Bonus PF Globale */}
          <Card className="card-necro border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-destructive" />
              <h2 className="text-xl font-bold">Bonus Punti Ferita Globale</h2>
            </div>
            <div className="space-y-3">
              <Label htmlFor="globalHPBonus" className="text-sm text-muted-foreground">
                Bonus fisso ai PF massimi per tutte le creature (es. talento, oggetto magico, abilità di classe)
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">+</span>
                <Input
                  id="globalHPBonus"
                  type="number"
                  min="0"
                  value={globalHPBonus}
                  onChange={(e) => setGlobalHPBonus(Number(e.target.value))}
                  className="bg-muted border-border text-2xl font-bold text-center"
                />
                <span className="text-sm text-muted-foreground">PF</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Questo bonus si applicherà a tutte le creature evocate
              </p>
            </div>
          </Card>

          {/* Bonus Danni Globale */}
          <Card className="card-necro border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Swords className="w-5 h-5 text-destructive" />
              <h2 className="text-xl font-bold">Bonus Danni Globale</h2>
            </div>
            <div className="space-y-3">
              <Label htmlFor="globalDamageBonus" className="text-sm text-muted-foreground">
                Bonus fisso ai danni di tutte le creature (es. aura, incantesimo, abilità speciale)
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">+</span>
                <Input
                  id="globalDamageBonus"
                  type="number"
                  min="0"
                  value={globalDamageBonus}
                  onChange={(e) => setGlobalDamageBonus(Number(e.target.value))}
                  className="bg-muted border-border text-2xl font-bold text-center"
                />
                <span className="text-sm text-muted-foreground">Danni</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Questo bonus si somma ai danni di tutte le azioni delle creature
              </p>
            </div>
          </Card>

          {/* Riepilogo */}
          <Card className="card-necro border-primary/20 border-2 p-6 bg-primary/5">
            <h3 className="font-bold mb-3 text-primary">📊 Riepilogo Modificatori</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Livello Necromante:</span>
                <span className="font-bold">Livello {wizardLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bonus PF alle Creature:</span>
                <span className="font-bold">
                  {wizardLevel >= 6 ? `+${wizardLevel}` : "+0"} (livello)
                  {globalHPBonus > 0 && ` + ${globalHPBonus} (globale)`}
                  {" = "}
                  <span className="text-primary">
                    +{(wizardLevel >= 6 ? wizardLevel : 0) + globalHPBonus} PF totali
                  </span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bonus Danni alle Creature:</span>
                <span className="font-bold">
                  {wizardLevel >= 6 ? `+${Math.floor(wizardLevel / 2)}` : "+0"} (livello)
                  {globalDamageBonus > 0 && ` + ${globalDamageBonus} (globale)`}
                  {" = "}
                  <span className="text-primary">
                    +{(wizardLevel >= 6 ? Math.floor(wizardLevel / 2) : 0) + globalDamageBonus} danni totali
                  </span>
                </span>
              </div>
            </div>
          </Card>

          {/* Pulsante Salva */}
          <Button onClick={handleSave} size="lg" className="w-full">
            <Settings className="w-5 h-5 mr-2" />
            Salva Impostazioni
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
