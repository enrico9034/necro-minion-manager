import { useCreatures } from "@/hooks/useCreatures";
import { CreatureCard } from "@/components/CreatureCard";
import { AddCreatureDialog } from "@/components/AddCreatureDialog";
import { Skull, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const { creatures, addCreature, deleteCreature, updateCreatureHP } = useCreatures();

  const skeletons = creatures.filter((c) => c.type === "SCHELETRO");
  const zombies = creatures.filter((c) => c.type === "ZOMBIE");
  const others = creatures.filter((c) => c.type === "CUSTOM");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <header className="border-b border-border bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
                <Skull className="w-12 h-12 text-primary" />
                <h1 className="text-5xl font-bold text-primary glow-necro">
                  Grimorio del Necromante
                </h1>
              </div>
              <p className="text-muted-foreground text-lg">
                Gestisci il tuo esercito di non-morti • {creatures.length} creature evocate
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="outline" size="lg">
                <Link to="/docs">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Documentazione
                </Link>
              </Button>
              <AddCreatureDialog onAdd={addCreature} />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {creatures.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Skull className="w-24 h-24 text-muted-foreground mb-6 opacity-50" />
            <h2 className="text-3xl font-bold mb-3">Il Tuo Esercito È Vuoto</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Evoca le tue prime creature non-morte per iniziare a costruire il tuo esercito oscuro.
            </p>
            <AddCreatureDialog onAdd={addCreature} />
          </div>
        ) : (
          <div className="space-y-12">
            {/* Skeletons */}
            {skeletons.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-primary glow-necro">Scheletri</span>
                  <span className="text-muted-foreground text-xl">({skeletons.length})</span>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skeletons.map((creature) => (
                    <CreatureCard
                      key={creature.id}
                      creature={creature}
                      onDelete={deleteCreature}
                      onUpdateHP={updateCreatureHP}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Zombies */}
            {zombies.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-primary glow-necro">Zombi</span>
                  <span className="text-muted-foreground text-xl">({zombies.length})</span>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {zombies.map((creature) => (
                    <CreatureCard
                      key={creature.id}
                      creature={creature}
                      onDelete={deleteCreature}
                      onUpdateHP={updateCreatureHP}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Custom Creatures */}
            {others.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-primary glow-necro">Altre Creature</span>
                  <span className="text-muted-foreground text-xl">({others.length})</span>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {others.map((creature) => (
                    <CreatureCard
                      key={creature.id}
                      creature={creature}
                      onDelete={deleteCreature}
                      onUpdateHP={updateCreatureHP}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
