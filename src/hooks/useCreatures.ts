import { useState, useEffect } from "react";
import { Creature } from "@/types/creature";

const STORAGE_KEY = "necromancer-creatures";

export const useCreatures = () => {
  const [creatures, setCreatures] = useState<Creature[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setCreatures(JSON.parse(stored));
    }
  }, []);

  const saveCreatures = (newCreatures: Creature[]) => {
    setCreatures(newCreatures);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCreatures));
  };

  const addCreature = (creature: Creature) => {
    saveCreatures([...creatures, creature]);
  };

  const updateCreature = (id: string, updates: Partial<Creature>) => {
    saveCreatures(
      creatures.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const deleteCreature = (id: string) => {
    saveCreatures(creatures.filter((c) => c.id !== id));
  };

  const updateCreatureHP = (id: string, hpCurrent: number) => {
    updateCreature(id, { hpCurrent });
  };

  return {
    creatures,
    addCreature,
    updateCreature,
    deleteCreature,
    updateCreatureHP,
  };
};
