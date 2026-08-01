export interface User {
  id: string;
  username: string;
  email: string;
  role: "admin" | "user";
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface Permission {
  resource: string;
  action: string;
}

export interface MenuItem {
  title: string;
  url: string;
  icon: string;
  permission?: string;
  children?: MenuItem[];
}
