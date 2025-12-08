import { useState, useEffect } from "react";

export interface NecromancerSettings {
  wizardLevel: number;
  globalHPBonus: number;
  globalDamageBonus: number;
}

const SETTINGS_KEY = "necromancer-settings";

const DEFAULT_SETTINGS: NecromancerSettings = {
  wizardLevel: 1,
  globalHPBonus: 0,
  globalDamageBonus: 0,
};

export const useSettings = () => {
  const [settings, setSettings] = useState<NecromancerSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      try {
        setSettings(JSON.parse(stored));
      } catch (e) {
        // Failed to parse settings, use defaults
        setSettings(DEFAULT_SETTINGS);
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<NecromancerSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  };

  return {
    settings,
    updateSettings,
  };
};
