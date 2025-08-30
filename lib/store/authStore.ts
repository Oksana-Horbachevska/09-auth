import { create } from "zustand";
import { User } from "@/types/user";

type AuthStore = {
  isAuthenticated: boolean;
  user: Partial<User> | null;
  setUser: (user: Partial<User>) => void;
  clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: Partial<User>) => {
    set(() => ({ user, isAuthenticated: true }));
  },
  clearIsAuthenticated: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },
}));
