# 🧙‍♂️ Installazione PWA - Grimorio del Necromante

Questa guida ti spiega come installare **Grimorio del Necromante** come Progressive Web App (PWA) sul tuo Mac, rendendola un'applicazione nativa che funziona offline.

## 📋 Prerequisiti

- Browser moderno (Chrome, Edge, Safari, o Firefox)
- Connessione internet per il primo caricamento
- macOS 10.14 o superiore

## 🚀 Metodi di Installazione

### Metodo 1: Chrome o Edge (Consigliato)

1. **Avvia l'applicazione:**
   ```bash
   npm run dev
   ```
   L'app sarà disponibile su `http://localhost:8080`

2. **Apri Chrome o Edge** e vai su `http://localhost:8080`

3. **Installa l'app:**
   - Cerca l'icona **⊕ Installa** nella barra degli indirizzi (a destra)
   - Clicca sull'icona
   - Oppure: Menu (⋮) → "Installa Grimorio del Necromante"
   - Conferma l'installazione

4. **Accedi all'app:**
   - L'app apparirà nel **Launchpad**
   - Oppure cercala in **Spotlight** (⌘ + Spazio)
   - Si comporterà come un'app nativa macOS

### Metodo 2: Safari

1. **Avvia l'applicazione:**
   ```bash
   npm run dev
   ```

2. **Apri Safari** e vai su `http://localhost:8080`

3. **Aggiungi al Dock:**
   - Menu **File** → **Aggiungi a Dock**
   - L'app apparirà nel Dock come icona dedicata

### Metodo 3: Build Statica (Senza Server)

Se vuoi usare l'app senza dover avviare il server di sviluppo:

1. **Crea la build di produzione:**
   ```bash
   npm run build
   ```

2. **Servi i file localmente:**
   ```bash
   npm run preview
   ```
   L'app sarà su `http://localhost:4173`

3. **Installa seguendo il Metodo 1 o 2**

## 🌐 Installazione da Server Remoto

Se hai deployato l'app su un server (Vercel, Netlify, etc.):

1. Visita l'URL pubblico dell'app
2. Segui le stesse istruzioni del Metodo 1 o 2
3. L'app sarà installabile da qualsiasi dispositivo

### Su iPhone/iPad

1. Apri l'URL dell'app in **Safari**
2. Tocca il pulsante **Condividi** (□↑)
3. Scorri e seleziona **"Aggiungi a Home"**
4. Conferma il nome e tocca **"Aggiungi"**
5. L'icona apparirà nella home screen

## ✨ Vantaggi della PWA

Dopo l'installazione, l'app offre:

- ✅ **Funzionamento offline completo** - Nessuna connessione necessaria
- ✅ **Avvio rapido** - Come un'app nativa
- ✅ **Nessuna barra del browser** - Esperienza immersiva
- ✅ **Dati locali** - Tutto salvato sul tuo dispositivo
- ✅ **Aggiornamenti automatici** - Scarica nuove versioni automaticamente
- ✅ **Privacy** - Nessun dato inviato a server esterni
- ✅ **Notifiche** (se abilitate) - Rimani aggiornato

## 🔄 Aggiornamenti

La PWA si aggiorna automaticamente quando:
- Ricarichi l'app
- Una nuova versione è disponibile
- Riapri l'app dopo un periodo di inattività

Gli aggiornamenti avvengono in background senza interrompere l'uso.

## 🗑️ Disinstallazione

### Da Chrome/Edge
1. Vai su `chrome://apps` (o `edge://apps`)
2. Fai click destro sull'icona "Grimorio del Necromante"
3. Seleziona **"Rimuovi da Chrome"** (o Edge)

### Da Safari/macOS
1. Trascina l'icona dal Dock nel Cestino
2. Oppure rimuovila dalla cartella Applicazioni

### Da iPhone/iPad
1. Tieni premuta l'icona sulla home screen
2. Tocca **"Rimuovi app"**
3. Conferma **"Elimina app"**

## 🛠️ Risoluzione Problemi

### L'icona "Installa" non appare

- **Verifica che stai usando HTTPS** (o localhost)
- **Controlla che il browser supporti PWA** (Chrome, Edge, Safari)
- **Prova a ricaricare la pagina** (⌘ + R)
- **Cancella la cache** e riprova

### L'app non funziona offline

- **Ricarica l'app una volta** dopo l'installazione
- **Verifica che il Service Worker sia attivo**:
  - Chrome DevTools → Application → Service Workers
- **Controlla che non sia in modalità Incognito**

### I dati sono scomparsi

I dati sono salvati nel **LocalStorage** del browser:
- Se cancelli i dati del browser, i dati dell'app andranno persi
- **Esporta regolarmente le tue creature** (feature da implementare)
- I dati sono legati al dominio/origine dell'app

### L'app non si aggiorna

1. **Chiudi completamente l'app**
2. **Riapri l'app**
3. **Forza il reload**: ⌘ + Shift + R
4. Se necessario, disinstalla e reinstalla

## 📞 Supporto

Per problemi o domande:
- Apri una Issue su [GitHub](https://github.com/enrico9034/necro-minion-manager/issues)
- Controlla la documentazione tecnica nel README.md

## 🎮 Prossimi Passi

Dopo l'installazione:
1. Evoca la tua prima creatura non-morta
2. Gestisci i punti ferita durante il combattimento
3. Aggiungi equipaggiamento e note personalizzate
4. Usa l'app anche offline durante le sessioni di D&D

Buona evocazione! 🧙‍♂️💀
