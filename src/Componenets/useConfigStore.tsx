/*
 *   Copyright (c) 2025 Rogue Solutions LLC
 *   All rights reserved.
 */
import { create } from "zustand";

export interface ConfigStore {
  firmware: string;
  setFirmware: (firmware: string) => void;
  serial: string;
  setSerial: (serial: string) => void;
  dexterity: boolean;
  setDexterity: (dexterity: boolean) => void;
  inactivity: boolean;
  setInactivity: (inactivity: boolean) => void;
  pitchEnable: boolean;
  setPitchEnable: (pitchEnable: boolean) => void;
  orientation: number;
  setOrientation: (orientation: number) => void;
  pitch: number;
  setPitch: (pitch: number) => void;
  powerTimeout: number;
  setPowerTimeout: (powerTimeout: number) => void;
  inactivityTimeout: number;
  setInactivityTimeout: (inactivityTimeout: number) => void;
}

export const useConfigStore = create<ConfigStore>((set) => ({
  firmware: "1.0",
  setFirmware: (firmware: string) => set(() => ({ firmware })),
  serial: "WWYY00001",
  setSerial: (serial: string) => set(() => ({ serial })),
  dexterity: false,
  setDexterity: (dexterity: boolean) => set(() => ({ dexterity })),
  inactivity: false,
  setInactivity: (inactivity: boolean) => set(() => ({ inactivity })),
  pitchEnable: false,
  setPitchEnable: (pitchEnable: boolean) =>
    set(() => ({ pitchEnable: pitchEnable })),
  orientation: 0,
  setOrientation: (orientation: number) => set(() => ({ orientation })),
  pitch: 45,
  setPitch: (pitch: number) => set(() => ({ pitch })),
  powerTimeout: 60,
  setPowerTimeout: (powerTimeout: number) => set(() => ({ powerTimeout })),
  inactivityTimeout: 60,
  setInactivityTimeout: (inactivityTimeout: number) =>
    set(() => ({ inactivityTimeout })),
}));
