export type CreatureType = "SCHELETRO" | "ZOMBIE" | "CUSTOM";

export interface Stats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface Action {
  name: string;
  type: "melee" | "ranged";
  toHit: number;
  damageDice: string;
  damageBonus: number;
  damageType: string;
  range?: string;
}

export interface SpecialAbility {
  name: string;
  description: string;
}

export interface Item {
  id: string;
  name: string;
  description: string;
}

export interface Creature {
  id: string;
  name: string;
  type: CreatureType;
  customType?: string;
  hpMax: number;
  hpCurrent: number;
  baseHp: number;
  wizardLevel: number;
  ac: number;
  speed: string;
  initiative: number;
  stats: Stats;
  senses: string[];
  vulnerabilities: string[];
  immunities: string[];
  actions: Action[];
  specialAbilities: SpecialAbility[];
  items: Item[];
  notes?: string;
  activeActionIndex?: number[]; // Indici delle azioni attive (per scheletri con più armi)
  customActions?: Action[]; // Attacchi custom aggiunti dall'utente
}

export const calculateProficiencyBonus = (wizardLevel: number): number => {
  return Math.floor((wizardLevel - 1) / 4) + 2;
};

export const getDamageBonus = (wizardLevel: number): number => {
  return wizardLevel >= 6 ? calculateProficiencyBonus(wizardLevel) : 0;
};

export const SKELETON_TEMPLATE: Omit<Creature, "id" | "name" | "wizardLevel" | "hpMax" | "hpCurrent"> = {
  type: "SCHELETRO",
  baseHp: 13,
  ac: 13,
  speed: "9m",
  initiative: 2,
  stats: {
    strength: 10,
    dexterity: 14,
    constitution: 15,
    intelligence: 6,
    wisdom: 8,
    charisma: 5,
  },
  senses: ["Scurovisione 18m", "Percezione Passiva 9"],
  vulnerabilities: ["Danni Contundenti"],
  immunities: ["Veleno", "Condizione di Avvelenato", "Indebolimento"],
  actions: [
    {
      name: "Spada Corta",
      type: "melee",
      toHit: 4,
      damageDice: "1d6",
      damageBonus: 2,
      damageType: "Taglienti",
    },
    {
      name: "Arco Corto",
      type: "ranged",
      toHit: 4,
      damageDice: "1d6",
      damageBonus: 2,
      damageType: "Perforanti",
      range: "24/96m",
    },
  ],
  specialAbilities: [],
  items: [],
};

export const ZOMBIE_TEMPLATE: Omit<Creature, "id" | "name" | "wizardLevel" | "hpMax" | "hpCurrent"> = {
  type: "ZOMBIE",
  baseHp: 22,
  ac: 8,
  speed: "6m",
  initiative: -2,
  stats: {
    strength: 13,
    dexterity: 6,
    constitution: 16,
    intelligence: 3,
    wisdom: 6,
    charisma: 5,
  },
  senses: ["Scurovisione 18m", "Percezione Passiva 8"],
  vulnerabilities: [],
  immunities: ["Veleno", "Condizione di Avvelenato"],
  actions: [
    {
      name: "Schianto",
      type: "melee",
      toHit: 3,
      damageDice: "1d6",
      damageBonus: 1,
      damageType: "Contundenti",
    },
  ],
  specialAbilities: [
    {
      name: "Fortitudine Non Morta",
      description: "Se scende a 0 PF, fa TS Costituzione (CD 5 + danno). Successo = scende a 1 PF invece che 0. (Non funziona con danni Radiosi o Critici).",
    },
  ],
  items: [],
};
