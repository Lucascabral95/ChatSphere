import { create } from "zustand";

interface Friend {
  id: string;
  name: string;
  email: string;
  imagen?: string | null;
}

interface AppState {
  amigos: Friend[];
  cambiante: number;
}

interface AppActions {
  setAmigos: (amigos: Friend[]) => void;
  addAmigo: (amigo: Friend) => void;
  removeAmigo: (amigoId: string) => void;
  setCambiante: (cambiante: number) => void;
  triggerUpdate: () => void;
  clearAmigos: () => void;
}

type AppStore = AppState & AppActions;

export const zustand = create<AppStore>((set) => ({
  amigos: [],
  cambiante: Date.now(),

  setAmigos: (amigos) => set({ amigos }),

  addAmigo: (amigo) =>
    set((state) => ({
      amigos: [...state.amigos, amigo],
    })),

  removeAmigo: (amigoId) =>
    set((state) => ({
      amigos: state.amigos.filter((amigo) => amigo.id !== amigoId),
    })),

  setCambiante: (cambiante) => set({ cambiante }),

  triggerUpdate: () => set({ cambiante: Date.now() }),

  clearAmigos: () => set({ amigos: [] }),
}));
