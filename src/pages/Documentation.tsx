import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Plus, FileCode } from "lucide-react";
import { Link } from "react-router-dom";

const Documentation = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="icon">
              <Link to="/">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-primary glow-necro">Documentazione</h1>
              <p className="text-muted-foreground">Guida completa per gestire il tuo esercito</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Introduction */}
          <Card className="card-necro border-border p-8">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Introduzione</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Benvenuto nel <strong>Grimorio del Necromante</strong>! Questa applicazione ti permette di
              gestire facilmente il tuo esercito di creature non-morte in Dungeons & Dragons 5e. Traccia i
              punti ferita, gestisci l'inventario e consulta rapidamente le statistiche durante le sessioni
              di gioco.
            </p>
          </Card>

          {/* Basic Usage */}
          <Card className="card-necro border-border p-8">
            <div className="flex items-center gap-3 mb-4">
              <Plus className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Utilizzo Base</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  1. Evocare una Nuova Creatura
                </h3>
                <p className="text-muted-foreground mb-2">
                  Clicca sul pulsante <strong>"Evoca Non-Morto"</strong> nella dashboard principale.
                  Inserisci un nome per la tua creatura, seleziona il tipo (Scheletro o Zombi), e specifica
                  il tuo livello da mago. L'app calcolerà automaticamente i PF massimi e i bonus ai danni
                  basandosi sul template della creatura e sul tuo livello.
                </p>
                <div className="bg-primary/10 border border-primary/30 p-3 rounded mt-2 text-sm">
                  <p className="font-semibold text-primary mb-1">⚡ Servitori Non Morti (Livello 6+)</p>
                  <p className="text-muted-foreground">
                    Se sei almeno livello 6, le tue creature ottengono automaticamente il tuo bonus di 
                    competenza ai danni con le armi, secondo le regole di D&D 5e. Questo bonus viene 
                    calcolato e visualizzato automaticamente.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">2. Gestire i Punti Ferita</h3>
                <p className="text-muted-foreground">
                  Ogni card creatura mostra una barra dei PF con controlli rapidi. Usa i pulsanti
                  <code className="mx-1 px-2 py-1 bg-muted rounded text-sm">-1</code>,
                  <code className="mx-1 px-2 py-1 bg-muted rounded text-sm">-5</code>,
                  <code className="mx-1 px-2 py-1 bg-muted rounded text-sm">+5</code> e
                  <code className="mx-1 px-2 py-1 bg-muted rounded text-sm">Max</code> per modificare i PF
                  durante il combattimento. Nella pagina dettagliata sono disponibili controlli aggiuntivi
                  per incrementi di ±10.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">3. Visualizzare i Dettagli</h3>
                <p className="text-muted-foreground">
                  Clicca sul pulsante <strong>"Dettagli"</strong> su qualsiasi card per accedere alla scheda
                  completa della creatura. Qui troverai tutte le statistiche, azioni, capacità speciali,
                  sensi, immunità e vulnerabilità. Puoi anche gestire l'inventario e aggiungere note
                  personalizzate.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">4. Gestire l'Inventario</h3>
                <p className="text-muted-foreground">
                  Nella pagina dettagli di ogni creatura, trovi la sezione <strong>"Inventario"</strong>.
                  Puoi aggiungere oggetti equipaggiati, armi speciali, o qualsiasi altro item. Ogni oggetto
                  può avere un nome e una descrizione opzionale. Gli oggetti possono essere rimossi
                  facilmente quando non più necessari.
                </p>
              </div>
            </div>
          </Card>

          {/* Adding Custom Creatures */}
          <Card className="card-necro border-border p-8">
            <div className="flex items-center gap-3 mb-4">
              <FileCode className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Aggiungere Nuovi Tipi di Mostri</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Attualmente l'app supporta nativamente <strong>Scheletri</strong> e <strong>Zombi</strong>.
                Per aggiungere nuovi tipi di creature personalizzate, dovrai modificare il codice sorgente.
              </p>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  File da Modificare: <code className="text-sm">src/types/creature.ts</code>
                </h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>
                    Aggiungi il nuovo tipo al type <code>CreatureType</code>:
                    <pre className="bg-muted p-4 rounded mt-2 text-sm overflow-x-auto">
                      {`export type CreatureType = "SCHELETRO" | "ZOMBIE" | "GHOUL" | "CUSTOM";`}
                    </pre>
                  </li>
                  <li>
                    Crea un nuovo template seguendo il formato di <code>SKELETON_TEMPLATE</code> o{" "}
                    <code>ZOMBIE_TEMPLATE</code>:
                    <pre className="bg-muted p-4 rounded mt-2 text-sm overflow-x-auto">
                      {`export const GHOUL_TEMPLATE: Omit<Creature, "id" | "name" | "wizardLevel" | "hpMax" | "hpCurrent"> = {
  type: "GHOUL",
  baseHp: 22,
  ac: 12,
  speed: "9m",
  initiative: 2,
  stats: {
    strength: 13,
    dexterity: 15,
    constitution: 10,
    intelligence: 7,
    wisdom: 10,
    charisma: 6,
  },
  senses: ["Scurovisione 18m", "Percezione Passiva 10"],
  vulnerabilities: [],
  immunities: ["Veleno", "Condizione di Avvelenato"],
  actions: [
    {
      name: "Morso",
      type: "melee",
      toHit: 2,
      damageDice: "2d6",
      damageBonus: 2,
      damageType: "Perforanti",
    },
    {
      name: "Artigli",
      type: "melee",
      toHit: 4,
      damageDice: "2d4",
      damageBonus: 2,
      damageType: "Taglienti",
    },
  ],
  specialAbilities: [
    {
      name: "Paralisi",
      description: "Il bersaglio deve superare un TS su Costituzione CD 10 o essere paralizzato per 1 minuto.",
    },
  ],
  items: [],
};`}
                    </pre>
                  </li>
                  <li>
                    Aggiorna il componente <code>AddCreatureDialog.tsx</code> per includere il nuovo tipo nel
                    select e gestire il template appropriato.
                  </li>
                </ol>
              </div>

              <div className="bg-secondary/20 border border-secondary p-4 rounded">
                <p className="text-sm">
                  <strong>Nota:</strong> Se non ti senti a tuo agio con la modifica del codice, puoi usare
                  la tipologia <strong>CUSTOM</strong> e modificare manualmente le statistiche nella pagina
                  dettagli (funzionalità da implementare in futuro).
                </p>
              </div>
            </div>
          </Card>

          {/* Installation as PWA */}
          <Card className="card-necro border-border p-8">
            <h2 className="text-2xl font-bold mb-4">Installare come App</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                Questa applicazione è una <strong>Progressive Web App (PWA)</strong> e può essere installata
                sul tuo dispositivo per un accesso rapido e uso offline.
              </p>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Su Desktop (Chrome/Edge)</h3>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>Clicca sull'icona di installazione nella barra degli indirizzi (a destra)</li>
                  <li>Seleziona "Installa" o "Aggiungi a..."</li>
                  <li>L'app apparirà come applicazione standalone</li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Su Mobile (iOS/Android)</h3>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>
                    <strong>iOS Safari:</strong> Tocca il pulsante Condividi, poi "Aggiungi a Home"
                  </li>
                  <li>
                    <strong>Android Chrome:</strong> Apri il menu (⋮) e seleziona "Aggiungi a Home" o
                    "Installa app"
                  </li>
                </ol>
              </div>
            </div>
          </Card>

          {/* Tips & Tricks */}
          <Card className="card-necro border-border p-8">
            <h2 className="text-2xl font-bold mb-4">Consigli & Trucchi</h2>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>
                Dai nomi unici e memorabili alle tue creature per identificarle rapidamente durante il
                combattimento.
              </li>
              <li>
                Usa la sezione Note per tracciare eventi importanti o modificatori temporanei applicati alla
                creatura.
              </li>
              <li>
                L'inventario è ottimo per tenere traccia di armi speciali, armature, o oggetti magici
                equipaggiati.
              </li>
              <li>
                I dati sono salvati localmente nel browser. Per sincronizzare tra dispositivi, considera di
                esportare/importare i dati (funzionalità futura).
              </li>
              <li>
                Organizza le tue creature per tipologia - la dashboard le separa automaticamente in
                categorie.
              </li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Documentation;
