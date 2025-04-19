import { AuthService, LoginRequest, RegisterRequest } from "@/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: { role: string } | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: () => boolean;
  getUserRole: () => string;
  isAdmin: () => boolean;
  isBookOwner: () => boolean;
  isReader: () => boolean;
  login: (data: RegisterRequest) => Promise<void>;
  signup: (userData: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
  clearErrors: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,

      isAuthenticated: () => !!get().user,

      getUserRole: () => get().user?.role || "guest",

      isAdmin: () => get().user?.role === "admin",
      isBookOwner: () => get().user?.role === "bookOwner",
      isReader: () => get().user?.role === "reader",

      login: async (data: RegisterRequest) => {
        set({ isLoading: true, error: null });
        try {
          const user = await AuthService.postAuthRegister(data);
          set({ user, isLoading: false });
          return user;
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : String(error),
            isLoading: false,
          });
          throw error;
        }
      },

      signup: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const user = await AuthService.postAuth(userData);
          set({ user, isLoading: false });
          return user;
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : String(error),
            isLoading: false,
          });
          throw error;
        }
      },

      // Logout
      logout: async () => {
        set({ isLoading: true });
        try {
          set({ user: null, isLoading: false, error: null });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : String(error),
            isLoading: false,
          });
        }
      },

      initialize: async () => {
        set({ isLoading: true });
        try {
          const user = await AuthService.postAuthRefresh({
            refreshToken: localStorage.getItem("refreshToken") || "",
            token: ""
          });
          set({ user, isLoading: false });
        } catch {
          set({ isLoading: false });
        }
      },

      // Clear errors
      clearErrors: () => set({ error: null }),
    }),
    {
      name: "bookSwap-auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);

export default useAuthStore;
