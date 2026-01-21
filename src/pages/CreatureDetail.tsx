import { useParams, useNavigate } from "react-router-dom";
import { useCreatures } from "@/hooks/useCreatures";
import { useSettings } from "@/hooks/useSettings";
import { getDamageBonus, calculateProficiencyBonus } from "@/types/creature";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DiceRollButton } from "@/components/DiceRollButton";
import { ArrowLeft, Heart, Shield, Zap, Eye, Skull, Swords, Sparkles, Package, Plus, Trash2, RefreshCw } from "lucide-react";
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

  const updateStats = () => {
    if (creature.wizardLevel < 6) {
      toast.error("Il livello del mago deve essere 6 o superiore per aggiornare le statistiche!");
      return;
    }

    const profBonus = calculateProficiencyBonus(creature.wizardLevel);
    const newHpMax = creature.baseHp + creature.wizardLevel;
    
    // Aggiorna HP massimi e mantieni la proporzione degli HP correnti
    const hpRatio = creature.hpCurrent / creature.hpMax;
    const newHpCurrent = Math.floor(newHpMax * hpRatio);
    
    // Aggiorna il bonus per colpire per tutte le azioni
    const updatedActions = creature.actions.map(action => ({
      ...action,
      toHit: profBonus + 2, // Bonus competenza + modificatore (tipicamente +2 per DEX)
    }));

    updateCreature(creature.id, {
      hpMax: newHpMax,
      hpCurrent: newHpCurrent,
      actions: updatedActions,
    });

    toast.success(
      `Statistiche aggiornate! HP: ${newHpMax}, Bonus Competenza: +${profBonus}, Bonus Danni: +${profBonus}`,
      { duration: 4000 }
    );
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
                {creature.wizardLevel >= 6 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={updateStats}
                    className="ml-auto"
                    title="Aggiorna HP massimi e statistiche in base al livello"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Aggiorna Statistiche
                  </Button>
                )}
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
                  {creature.wizardLevel >= 6 && (
                    <span className="text-primary ml-2">
                      (Bonus Competenza: +{calculateProficiencyBonus(creature.wizardLevel)}, Bonus Danni: +{getDamageBonus(creature.wizardLevel)})
                    </span>
                  )}
                </p>
              </div>
            </Card>

            {/* Combat Stats */}
            <Card className="card-necro border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">Statistiche di Combattimento</h2>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-muted/50 p-4 rounded text-center">
                  <p className="text-sm text-muted-foreground mb-2">Livello Mago</p>
                  <Input
                    type="number"
                    min="1"
                    max="20"
                    value={creature.wizardLevel}
                    onChange={(e) => {
                      const newLevel = Math.max(1, Math.min(20, Number(e.target.value)));
                      updateCreature(creature.id, { wizardLevel: newLevel });
                      toast.success(`Livello aggiornato a ${newLevel}!`);
                    }}
                    className="text-3xl font-bold text-center bg-background border-border h-16"
                  />
                </div>
                <div className="bg-muted/50 p-4 rounded text-center">
                  <p className="text-sm text-muted-foreground mb-2">Classe Armatura</p>
                  <Input
                    type="number"
                    value={creature.ac}
                    onChange={(e) => updateCreature(creature.id, { ac: Number(e.target.value) })}
                    className="text-3xl font-bold text-center bg-background border-border h-16"
                  />
                </div>
                <div className="bg-muted/50 p-4 rounded text-center">
                  <p className="text-sm text-muted-foreground mb-2">Velocità</p>
                  <Input
                    type="text"
                    value={creature.speed}
                    onChange={(e) => updateCreature(creature.id, { speed: e.target.value })}
                    className="text-3xl font-bold text-center bg-background border-border h-16"
                  />
                </div>
                <div className="bg-muted/50 p-4 rounded text-center">
                  <p className="text-sm text-muted-foreground mb-2">Iniziativa</p>
                  <Input
                    type="number"
                    value={creature.initiative}
                    onChange={(e) => updateCreature(creature.id, { initiative: Number(e.target.value) })}
                    className="text-3xl font-bold text-center bg-background border-border h-16"
                  />
                </div>
              </div>
            </Card>

            {/* Ability Scores */}
            <Card className="card-necro border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-secondary" />
                <h2 className="text-xl font-bold">Caratteristiche</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-4">
                {Object.entries(creature.stats).map(([key, value]) => {
                  const modifier = Math.floor((value - 10) / 2);
                  const modifierColor = modifier > 0 ? "text-green-500" : modifier < 0 ? "text-red-500" : "text-yellow-500";
                  return (
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
                      <p className={`text-sm font-semibold ${modifierColor}`}>{statModifier(value)}</p>
                    </div>
                  );
                })}
              </div>
              <DiceRollButton
                label="Tiro d20 Secco"
                bonus={0}
                variant="secondary"
                className="w-full"
                onRoll={(total) => {
                  toast.success(`${creature.name} ha tirato ${total}!`, { duration: 2500 });
                }}
              />
            </Card>

            {/* Actions */}
            <Card className="card-necro border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Swords className="w-5 h-5 text-destructive" />
                  <h2 className="text-xl font-bold">Azioni</h2>
                </div>
                {creature.actions.length > 1 && (
                  <div className="flex gap-2">
                    {creature.actions.map((action, idx) => {
                      const isActive = creature.activeActionIndex?.includes(idx) ?? false;
                      return (
                        <Button
                          key={idx}
                          variant={isActive ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            const current = creature.activeActionIndex || [];
                            const updated = isActive
                              ? current.filter(i => i !== idx)
                              : [...current, idx];
                            updateCreature(creature.id, { activeActionIndex: updated });
                            toast.success(isActive ? `${action.name} rimossa` : `${action.name} aggiunta`);
                          }}
                        >
                          {action.name}
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="space-y-3">
                {creature.actions.map((action, idx) => {
                  const damageBonus = getDamageBonus(creature.wizardLevel);
                  const totalDamage = action.damageBonus + damageBonus + settings.globalDamageBonus;
                  return (
                    <div key={idx} className="bg-muted/50 p-4 rounded space-y-3">
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
                      <DiceRollButton
                        label={`Tiro per Colpire - ${action.name}`}
                        bonus={action.toHit}
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onRoll={(total, natural) => {
                          const isCrit = natural === 20;
                          const isFail = natural === 1;
                          toast.success(
                            `${action.name}: ${total} per colpire!${isCrit ? " 🎯 CRITICO! Raddoppia i dadi!" : isFail ? " 💀 FALLIMENTO!" : ""}`,
                            { duration: 3000 }
                          );
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Custom Actions */}
            <Card className="card-necro border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Swords className="w-5 h-5 text-secondary" />
                  <h2 className="text-xl font-bold">Attacchi Personalizzati</h2>
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    const newAction = {
                      name: "Nuovo Attacco",
                      type: "melee" as const,
                      toHit: 2,
                      damageDice: "1d6",
                      damageBonus: 0,
                      damageType: "Perforante",
                    };
                    updateCreature(creature.id, {
                      customActions: [...(creature.customActions || []), newAction],
                    });
                    toast.success("Attacco aggiunto!");
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Aggiungi Attacco
                </Button>
              </div>
              {(!creature.customActions || creature.customActions.length === 0) ? (
                <p className="text-sm text-muted-foreground italic">Nessun attacco personalizzato</p>
              ) : (
                <div className="space-y-3">
                  {creature.customActions.map((action, idx) => (
                    <div key={idx} className="bg-muted/50 p-4 rounded space-y-3">
                      <div className="flex items-center justify-between">
                        <Input
                          value={action.name}
                          onChange={(e) => {
                            const updated = [...(creature.customActions || [])];
                            updated[idx] = { ...action, name: e.target.value };
                            updateCreature(creature.id, { customActions: updated });
                          }}
                          className="font-bold text-lg bg-background max-w-xs"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => {
                            const updated = (creature.customActions || []).filter((_, i) => i !== idx);
                            updateCreature(creature.id, { customActions: updated });
                            toast.success("Attacco rimosso!");
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs">Tipo</Label>
                          <select
                            value={action.type}
                            onChange={(e) => {
                              const updated = [...(creature.customActions || [])];
                              updated[idx] = { ...action, type: e.target.value as "melee" | "ranged" };
                              updateCreature(creature.id, { customActions: updated });
                            }}
                            className="w-full p-2 rounded bg-background border border-border text-sm"
                          >
                            <option value="melee">Mischia</option>
                            <option value="ranged">Distanza</option>
                          </select>
                        </div>
                        <div>
                          <Label className="text-xs">Tiro per Colpire</Label>
                          <Input
                            type="number"
                            value={action.toHit}
                            onChange={(e) => {
                              const updated = [...(creature.customActions || [])];
                              updated[idx] = { ...action, toHit: Number(e.target.value) };
                              updateCreature(creature.id, { customActions: updated });
                            }}
                            className="bg-background"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Dadi Danno</Label>
                          <Input
                            value={action.damageDice}
                            onChange={(e) => {
                              const updated = [...(creature.customActions || [])];
                              updated[idx] = { ...action, damageDice: e.target.value };
                              updateCreature(creature.id, { customActions: updated });
                            }}
                            placeholder="1d6"
                            className="bg-background"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Bonus Danno Base</Label>
                          <Input
                            type="number"
                            value={action.damageBonus}
                            onChange={(e) => {
                              const updated = [...(creature.customActions || [])];
                              updated[idx] = { ...action, damageBonus: Number(e.target.value) };
                              updateCreature(creature.id, { customActions: updated });
                            }}
                            className="bg-background"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Tipo di Danno</Label>
                          <Input
                            value={action.damageType}
                            onChange={(e) => {
                              const updated = [...(creature.customActions || [])];
                              updated[idx] = { ...action, damageType: e.target.value };
                              updateCreature(creature.id, { customActions: updated });
                            }}
                            className="bg-background"
                          />
                        </div>
                        {action.type === "ranged" && (
                          <div>
                            <Label className="text-xs">Gittata</Label>
                            <Input
                              value={action.range || ""}
                              onChange={(e) => {
                                const updated = [...(creature.customActions || [])];
                                updated[idx] = { ...action, range: e.target.value };
                                updateCreature(creature.id, { customActions: updated });
                              }}
                              placeholder="24/96m"
                              className="bg-background"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
