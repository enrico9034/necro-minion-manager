# 🧙‍♂️ Grimorio del Necromante

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/demo-live-success)](https://enrico9034.github.io/necro-minion-manager/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-blue)](https://react.dev/)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow?logo=buy-me-a-coffee)](https://buymeacoffee.com/enrico9034r)

Gestisci il tuo esercito di creature non-morte in Dungeons & Dragons 5e. Traccia punti ferita, statistiche, inventario e abilità speciali per Scheletri, Zombie e altre creature.

🎮 **[Prova la Demo Live](https://enrico9034.github.io/necro-minion-manager/)**

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

L'app sarà disponibile su `http://localhost:8080/necro-minion-manager/`.

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

```sh
npm run deploy
```

Poi configura GitHub Pages nelle impostazioni del repository per usare il branch `gh-pages`.

## 🤝 Contribuire

I contributi sono benvenuti! Leggi [CONTRIBUTING.md](CONTRIBUTING.md) per le linee guida.

1. Fork del progetto
2. Crea il tuo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📝 Licenza

Questo progetto è rilasciato sotto licenza MIT - vedi il file [LICENSE](LICENSE) per i dettagli.

## 👤 Autore

**Enrico**

- GitHub: [@enrico9034](https://github.com/enrico9034)
## ⭐ Supporta il Progetto

Se questo progetto ti è stato utile, lascia una stella ⭐️ su GitHub!

Oppure offrimi un caffè ☕:

<a href="https://buymeacoffee.com/enrico9034r" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

## 🙏 Ringraziamenti

- [shadcn/ui](https://ui.shadcn.com/) per i componenti UI
- [Lucide](https://lucide.dev/) per le icone
- Wizards of the Coast per D&D 5e

