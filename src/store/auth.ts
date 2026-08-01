import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState, LoginCredentials, User } from "@/types";
import { checkPermission, getRolesForUser } from "@/services/casbin";

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  hasPermission: (resource: string, action: string) => Promise<boolean>;
  checkAuth: () => Promise<void>;
}

const mockUsers: Record<string, { password: string; user: User }> = {
  alice: {
    password: "alice123",
    user: {
      id: "1",
      username: "alice",
      email: "alice@example.com",
      role: "admin",
    },
  },
  bob: {
    password: "bob123",
    user: {
      id: "2",
      username: "bob",
      email: "bob@example.com",
      role: "user",
    },
  },
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const userRecord = mockUsers[credentials.username];
        if (userRecord && userRecord.password === credentials.password) {
          const roles = await getRolesForUser(credentials.username);
          if (roles.length > 0) {
            set({
              user: userRecord.user,
              isAuthenticated: true,
              isLoading: false,
            });
            return true;
          }
        }

        set({ isLoading: false });
        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      hasPermission: async (resource: string, action: string) => {
        const { user } = get();
        if (!user) return false;
        return await checkPermission(user.username, resource, action);
      },

      checkAuth: async () => {
        const { user } = get();
        if (user) {
          const roles = await getRolesForUser(user.username);
          if (roles.length === 0) {
            set({ user: null, isAuthenticated: false });
          }
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
