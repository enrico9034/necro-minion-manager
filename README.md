# 🧙‍♂️ Grimorio del Necromante

Gestisci il tuo esercito di creature non-morte in Dungeons & Dragons 5e. Traccia punti ferita, statistiche, inventario e abilità speciali per Scheletri, Zombie e altre creature.

## 🎮 Caratteristiche

- ✨ Evoca e gestisci creature non-morte
- ❤️ Traccia i punti ferita in tempo reale
- ⚔️ Visualizza statistiche di combattimento complete
- 🎒 Gestisci inventario e equipaggiamento
- 📝 Aggiungi note personalizzate
- 💾 Salvataggio automatico locale (nessun server richiesto)
- 📱 PWA installabile - funziona offline
- 🌙 Interfaccia dark con tema necromante

## 🚀 Come Usare

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)


### Installazione

```sh
# Clona il repository
git clone https://github.com/enrico9034/necro-minion-manager.git

# Entra nella directory
cd necro-minion-manager

# Installa le dipendenze
npm install

# Avvia in modalità sviluppo
npm run dev
```

L'app sarà disponibile su `http://localhost:8080`

### Build per Produzione

```sh
# Crea la build ottimizzata
npm run build

# Preview della build
npm run preview
```

## 📱 Installazione come PWA

L'app può essere installata come Progressive Web App sul tuo dispositivo:

**Su Mac/PC (Chrome/Edge):**
1. Apri l'app nel browser
2. Clicca sull'icona "Installa" nella barra degli indirizzi
3. L'app apparirà come applicazione nativa

**Su Mac (Safari):**
1. File → "Aggiungi a Dock"

Vedi `INSTALL.md` per istruzioni dettagliate.

## 🛠️ Tecnologie

- **Vite** - Build tool e dev server
- **React 18** - UI framework
- **TypeScript** - Type safety
- **shadcn/ui** - Componenti UI
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Lucide React** - Icone
- **Sonner** - Toast notifications
- **LocalStorage** - Persistenza dati

## 📦 Deploy

### Vercel (Consigliato)
```sh
npm install -g vercel
vercel
```

### Netlify
```sh
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages
Basta abilitare GitHub Pages nelle impostazioni del repository e puntare alla cartella `dist/`.

## 📝 Licenza

Questo progetto è open source e disponibile per uso personale.

