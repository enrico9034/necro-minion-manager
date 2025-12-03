import { useParams, useNavigate } from "react-router-dom";
import { useCreatures } from "@/hooks/useCreatures";
import { useSettings } from "@/hooks/useSettings";
import { getDamageBonus } from "@/types/creature";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Heart, Shield, Zap, Eye, Skull, Swords, Sparkles, Package, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CreatureDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { creatures, updateCreature, deleteCreature, updateCreatureHP } = useCreatures();
  const { settings } = useSettings();
  const creature = creatures.find((c) => c.id === id);

  const [newItemName, setNewItemName] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");

  if (!creature) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 text-center">
          <Skull className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Creatura Non Trovata</h2>
          <p className="text-muted-foreground mb-4">Questa creatura non esiste più nel tuo esercito.</p>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Torna al Grimorio
          </Button>
        </Card>
      </div>
    );
  }

  const statModifier = (stat: number) => {
    const mod = Math.floor((stat - 10) / 2);
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  const addItem = () => {
    if (!newItemName.trim()) {
      toast.error("Inserisci un nome per l'oggetto!");
      return;
    }

    const newItem = {
      id: crypto.randomUUID(),
      name: newItemName.trim(),
      description: newItemDesc.trim(),
    };

    updateCreature(creature.id, {
      items: [...creature.items, newItem],
    });

    toast.success(`${newItemName} aggiunto a ${creature.name}!`);
    setNewItemName("");
    setNewItemDesc("");
  };

  const removeItem = (itemId: string) => {
    updateCreature(creature.id, {
      items: creature.items.filter((item) => item.id !== itemId),
    });
    toast.success("Oggetto rimosso!");
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
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-primary glow-necro mb-1">{creature.name}</h1>
              <p className="text-muted-foreground uppercase tracking-wider">
                {creature.type} {creature.customType && `(${creature.customType})`}
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={() => {
                if (window.confirm(`Sei sicuro di voler eliminare ${creature.name}?`)) {
                  deleteCreature(creature.id);
                  navigate("/");
                  toast.success(`${creature.name} è stato bandito!`);
                }
              }}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Elimina
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* HP Management */}
            <Card className="card-necro border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-destructive" />
                <h2 className="text-xl font-bold">Punti Ferita</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="text-muted-foreground">PF Attuali</span>
                  <span className="font-mono font-bold text-2xl">
                    {creature.hpCurrent} / {creature.hpMax}
                  </span>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${(creature.hpCurrent / creature.hpMax) * 100}%` }}
                  />
                </div>
                <div className="grid grid-cols-6 gap-2">
                  <Button
                    variant="outline"
                    onClick={() => updateCreatureHP(creature.id, Math.max(0, creature.hpCurrent - 1))}
                  >
                    -1
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => updateCreatureHP(creature.id, Math.max(0, creature.hpCurrent - 5))}
                  >
                    -5
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => updateCreatureHP(creature.id, Math.max(0, creature.hpCurrent - 10))}
                  >
                    -10
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => updateCreatureHP(creature.id, Math.min(creature.hpMax, creature.hpCurrent + 1))}
                  >
                    +1
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => updateCreatureHP(creature.id, Math.min(creature.hpMax, creature.hpCurrent + 5))}
                  >
                    +5
                  </Button>
                  <Button variant="outline" onClick={() => updateCreatureHP(creature.id, creature.hpMax)}>
                    Max
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Base: {creature.baseHp} + Livello Mago: {creature.wizardLevel}
                </p>
              </div>
            </Card>

            {/* Combat Stats */}
            <Card className="card-necro border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">Statistiche di Combattimento</h2>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted/50 p-4 rounded text-center">
                  <p className="text-sm text-muted-foreground mb-1">Classe Armatura</p>
                  <p className="text-3xl font-bold text-foreground">{creature.ac}</p>
                </div>
                <div className="bg-muted/50 p-4 rounded text-center">
                  <p className="text-sm text-muted-foreground mb-1">Velocità</p>
                  <p className="text-3xl font-bold text-foreground">{creature.speed}</p>
                </div>
                <div className="bg-muted/50 p-4 rounded text-center">
                  <p className="text-sm text-muted-foreground mb-1">Iniziativa</p>
                  <p className="text-3xl font-bold text-foreground">
                    {creature.initiative >= 0 ? "+" : ""}
                    {creature.initiative}
                  </p>
                </div>
              </div>
            </Card>

            {/* Ability Scores */}
            <Card className="card-necro border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-secondary" />
                <h2 className="text-xl font-bold">Caratteristiche</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {Object.entries(creature.stats).map(([key, value]) => (
                  <div key={key} className="bg-muted/50 p-4 rounded text-center">
                    <p className="text-xs text-muted-foreground uppercase mb-1">
                      {key === "strength"
                        ? "FOR"
                        : key === "dexterity"
                        ? "DES"
                        : key === "constitution"
                        ? "COS"
                        : key === "intelligence"
                        ? "INT"
                        : key === "wisdom"
                        ? "SAG"
                        : "CAR"}
                    </p>
                    <p className="text-xl font-bold text-foreground">{value}</p>
                    <p className="text-sm text-primary font-semibold">{statModifier(value)}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Actions */}
            <Card className="card-necro border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Swords className="w-5 h-5 text-destructive" />
                <h2 className="text-xl font-bold">Azioni</h2>
              </div>
              <div className="space-y-3">
                {creature.actions.map((action, idx) => {
                  const damageBonus = getDamageBonus(creature.wizardLevel);
                  const totalDamage = action.damageBonus + damageBonus + settings.globalDamageBonus;
                  return (
                    <div key={idx} className="bg-muted/50 p-4 rounded space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg text-foreground">{action.name}</h3>
                        <span className="text-xs uppercase bg-primary/20 text-primary px-2 py-1 rounded">
                          {action.type === "melee" ? "Mischia" : "Distanza"}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Tiro per Colpire:</span>
                          <span className="ml-2 font-semibold text-foreground">+{action.toHit}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Danni:</span>
                          <span className="ml-2 font-semibold text-foreground">
                            {action.damageDice} + {totalDamage}
                            {(creature.wizardLevel >= 6 || settings.globalDamageBonus > 0) && (
                              <span className="text-xs text-primary ml-1">
                                ({action.damageBonus}
                                {damageBonus > 0 && `+${damageBonus}`}
                                {settings.globalDamageBonus > 0 && `+${settings.globalDamageBonus}`})
                              </span>
                            )}
                          </span>
                        </div>
                        {action.range && (
                          <div className="col-span-2">
                            <span className="text-muted-foreground">Gittata:</span>
                            <span className="ml-2 font-semibold text-foreground">{action.range}</span>
                          </div>
                        )}
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Tipo di Danno:</span>
                          <span className="ml-2 font-semibold text-foreground">{action.damageType}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Special Abilities */}
            {creature.specialAbilities.length > 0 && (
              <Card className="card-necro border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  <h2 className="text-xl font-bold">Capacità Speciali</h2>
                </div>
                <div className="space-y-3">
                  {creature.specialAbilities.map((ability, idx) => (
                    <div key={idx} className="bg-muted/50 p-4 rounded">
                      <h3 className="font-bold text-foreground mb-2">{ability.name}</h3>
                      <p className="text-sm text-muted-foreground">{ability.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Senses & Immunities */}
            <Card className="card-necro border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">Sensi</h2>
              </div>
              <ul className="space-y-2 text-sm">
                {creature.senses.map((sense, idx) => (
                  <li key={idx} className="text-muted-foreground">
                    • {sense}
                  </li>
                ))}
              </ul>

              {creature.vulnerabilities.length > 0 && (
                <>
                  <h3 className="font-semibold mt-4 mb-2 text-destructive">Vulnerabilità</h3>
                  <ul className="space-y-1 text-sm">
                    {creature.vulnerabilities.map((vuln, idx) => (
                      <li key={idx} className="text-muted-foreground">
                        • {vuln}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <h3 className="font-semibold mt-4 mb-2 text-primary">Immunità</h3>
              <ul className="space-y-1 text-sm">
                {creature.immunities.map((immune, idx) => (
                  <li key={idx} className="text-muted-foreground">
                    • {immune}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Items/Equipment */}
            <Card className="card-necro border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">Inventario</h2>
              </div>

              <div className="space-y-3 mb-4">
                {creature.items.length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">Nessun oggetto equipaggiato</p>
                ) : (
                  creature.items.map((item) => (
                    <div key={item.id} className="bg-muted/50 p-3 rounded group">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{item.name}</h4>
                          {item.description && (
                            <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-2 pt-4 border-t border-border">
                <Label htmlFor="newItemName" className="text-sm">
                  Aggiungi Oggetto
                </Label>
                <Input
                  id="newItemName"
                  placeholder="Nome oggetto"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="bg-muted border-border"
                />
                <Textarea
                  placeholder="Descrizione (opzionale)"
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  className="bg-muted border-border resize-none"
                  rows={2}
                />
                <Button onClick={addItem} className="w-full" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Aggiungi
                </Button>
              </div>
            </Card>

            {/* Notes */}
            <Card className="card-necro border-border p-6">
              <Label htmlFor="notes" className="text-lg font-bold mb-3 block">
                Note
              </Label>
              <Textarea
                id="notes"
                placeholder="Aggiungi note sulla creatura..."
                value={creature.notes || ""}
                onChange={(e) => updateCreature(creature.id, { notes: e.target.value })}
                className="bg-muted border-border min-h-[120px]"
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatureDetail;
