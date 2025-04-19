import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fakeAuthService } from "@/services/authService";

interface AuthState {
  user: { role: string } | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: () => boolean;
  getUserRole: () => string;
  isAdmin: () => boolean;
  isBookOwner: () => boolean;
  isReader: () => boolean;
  login: (email: string, password: string) => Promise<{ role: string }>;
  signup: (userData: { firstName: string; lastName: string; email: string; password: string; role: "bookOwner" | "reader" }) => Promise<{ role: "bookOwner" | "reader" }>;
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

      // Check if user is authenticated
      isAuthenticated: () => !!get().user,

      // Get user role
      getUserRole: () => get().user?.role || "guest",

      // Role-based checks
      isAdmin: () => get().user?.role === "admin",
      isBookOwner: () => get().user?.role === "bookOwner",
      isReader: () => get().user?.role === "reader",

      // Login
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const user = await fakeAuthService.login(email, password);
          set({ user, isLoading: false });
          return user;
        } catch (error) {
          set({ error: error instanceof Error ? error.message : String(error), isLoading: false });
          throw error;
        }
      },

      // Signup
      signup: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const { firstName, lastName, email, password, role } = userData;
          const user = await fakeAuthService.signup({ firstName, lastName, email, password, role: role as "bookOwner" | "reader" });
          // Only set the user if they're auto-approved (readers)
          if (user.role === "reader") {
            set({ user, isLoading: false });
          } else {
            set({ isLoading: false });
          }
          return user;
        } catch (error) {
          set({ error: error instanceof Error ? error.message : String(error), isLoading: false });
          throw error;
        }
      },

      // Logout
      logout: async () => {
        set({ isLoading: true });
        try {
          await fakeAuthService.logout();
          set({ user: null, isLoading: false, error: null });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : String(error), isLoading: false });
        }
      },

      // Initialize - check if user is already logged in
      initialize: async () => {
        set({ isLoading: true });
        try {
          const user = await fakeAuthService.getCurrentUser();
          set({ user, isLoading: false });
        } catch {
          set({ isLoading: false });
        }
      },

      // Clear errors
      clearErrors: () => set({ error: null }),
    }),
    {
      name: "bookswap-auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);

export default useAuthStore;
