import { create } from "zustand";

export const zustand = create((set) => ({
    amigos: [],
    setAmigos: (amigos) => set(() => ({ amigos })),

    cambiante: Date.now(),
    setCambiante: (cambiante) => set(() => ({ cambiante })),
}));