import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";
import api from "@/lib/axios";
import { RegisterRequest, LoginRequest, MeResponse } from "@/types/api";
import { useNavigate } from "react-router-dom";

interface AuthState {
  user: MeResponse | null;
  token: string | null;
  isLoading: boolean;

  login: (
    data: LoginRequest,
    navigate: ReturnType<typeof useNavigate>
  ) => Promise<void>;
  register: (
    data: RegisterRequest,
    navigate: ReturnType<typeof useNavigate>
  ) => Promise<void>;
  me: () => Promise<void>;
  logout: () => Promise<void>;

  setToken: (token: string) => void;
  clearToken: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,

      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null, user: null }),

      login: async (data, navigate) => {
        set({ isLoading: true });
        try {
          const res = await api("post", "/auth", { data });
          const { token, ...user } = res;

          if (!token) throw new Error("No token received");

          set({ token, user });
          if (user.role === "Admin") {
            navigate("/admin");
          } else {
            navigate("/books");
          }
          toast.success("Logged in successfully");
        } catch (err) {
          toast.error((err as Error).message || "Login failed");
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (data, navigate) => {
        set({ isLoading: true });
        try {
          const res = await api("post", "/auth/register", { data });
          const { token, ...user } = res;

          if (data.role === "BookOwner") {
            toast.success(res.message || "Registration successful");
            return;
          }

          set({ token, user });
          navigate("/login");
          toast.success("Registered successfully");
        } catch (err) {
          toast.error((err as Error).message || "Registration failed");
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          set({ token: null, user: null });
          toast.success("Logged out successfully");
        } catch (err) {
          toast.error((err as Error).message || "Logout failed");
        } finally {
          set({ isLoading: false });
        }
      },

      me: async () => {
        set({ isLoading: true });
        try {
          const res = await api("get", "/auth/me");
          set({ user: res });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token }),
    }
  )
);

export default useAuthStore;
