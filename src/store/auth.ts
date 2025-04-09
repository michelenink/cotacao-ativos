import { create } from "zustand";

interface AuthState {
  email: string | null;
  setEmail: (email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: null,
  setEmail: (email) => set({ email }),
  logout: () => set({ email: null }),
}));
