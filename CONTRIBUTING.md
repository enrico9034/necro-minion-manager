# 🤝 Contribuire al Grimorio del Necromante

Grazie per il tuo interesse nel contribuire! Questo documento fornisce linee guida per contribuire al progetto.

## 📋 Come Contribuire

### Segnalare Bug

Se trovi un bug, apri una [Issue](https://github.com/enrico9034/necro-minion-manager/issues) includendo:

- Descrizione chiara del problema
- Passi per riprodurre il bug
- Comportamento atteso vs comportamento attuale
- Screenshot (se applicabile)
- Versione del browser e sistema operativo

### Proporre Nuove Funzionalità

Per proporre una nuova funzionalità:

1. Controlla se esiste già una Issue simile
2. Apri una nuova Issue con etichetta `enhancement`
3. Descrivi chiaramente la funzionalità e il suo valore
4. Discuti l'implementazione con i maintainer prima di iniziare

### Pull Request

1. **Fork del repository**
   ```bash
   # Clona il tuo fork
   git clone https://github.com/TUO_USERNAME/necro-minion-manager.git
   cd necro-minion-manager
   ```

2. **Crea un branch per le tue modifiche**
   ```bash
   git checkout -b feature/nome-funzionalita
   # oppure
   git checkout -b fix/nome-bug
   ```

3. **Sviluppo**
   ```bash
   # Installa le dipendenze
   npm install
   
   # Avvia il dev server
   npm run dev
   ```

4. **Segui le convenzioni del codice**
   - Usa TypeScript con tipi espliciti
   - Segui le convenzioni di naming esistenti
   - Mantieni i componenti piccoli e riusabili
   - Aggiungi commenti per logica complessa

5. **Testa le modifiche**
   ```bash
   # Verifica che il lint passi
   npm run lint
   
   # Testa la build di produzione
   npm run build
   npm run preview
   ```

6. **Commit delle modifiche**
   ```bash
   git add .
   git commit -m "feat: descrizione breve della modifica"
   ```
   
   Usa i [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` nuova funzionalità
   - `fix:` correzione bug
   - `docs:` modifiche alla documentazione
   - `style:` formattazione, punto e virgola mancanti, ecc.
   - `refactor:` refactoring del codice
   - `test:` aggiunta o modifica di test
   - `chore:` aggiornamento dipendenze, task di build, ecc.

7. **Push e Pull Request**
   ```bash
   git push origin feature/nome-funzionalita
   ```
   Quindi apri una Pull Request su GitHub.

## 📝 Linee Guida per il Codice

### Struttura dei Componenti

```tsx
// Imports
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Types/Interfaces
interface MyComponentProps {
  title: string;
  onAction: () => void;
}

// Component
export const MyComponent = ({ title, onAction }: MyComponentProps) => {
  const [state, setState] = useState<string>("");

  return (
    <div>
      <h2>{title}</h2>
      <Button onClick={onAction}>Action</Button>
    </div>
  );
};
```

### Gestione dello Stato

- Usa `localStorage` per la persistenza (tramite hooks personalizzati)
- Evita prop drilling - usa context se necessario
- Mantieni lo stato il più locale possibile

### Styling

- Usa Tailwind CSS per lo styling
- Usa i componenti shadcn/ui quando possibile
- Mantieni coerenza con il tema dark esistente

### Performance

- Evita re-render non necessari
- Usa `useMemo` e `useCallback` quando appropriato
- Ottimizza le immagini e gli asset

## 🧪 Testing

Attualmente il progetto non ha test automatizzati. Contributi per aggiungere test sono benvenuti!

Test manuali da effettuare:
- [ ] Aggiungere una creatura
- [ ] Modificare PF di una creatura
- [ ] Eliminare una creatura
- [ ] Navigazione tra le pagine
- [ ] Funzionamento offline (dopo il primo caricamento)
- [ ] Persistenza dei dati (ricarica la pagina)
- [ ] Responsive su mobile

## 🎨 Design e UX

- Mantieni l'interfaccia pulita e intuitiva
- Usa icone di Lucide React
- Testa su schermi di diverse dimensioni
- Assicurati che sia accessibile (aria-labels, keyboard navigation)

## 📚 Documentazione

Se aggiungi nuove funzionalità:
- Aggiorna il README.md
- Aggiorna INSTALL.md se cambia il processo di installazione
- Aggiungi commenti nel codice per spiegare logica complessa

## 🤔 Domande?

Se hai domande, apri una Issue con l'etichetta `question` o contatta i maintainer.

## 📜 Licenza

Contribuendo a questo progetto, accetti che i tuoi contributi saranno rilasciati sotto la [Licenza MIT](LICENSE).

---

Grazie per il tuo contributo! 🧙‍♂️💀
