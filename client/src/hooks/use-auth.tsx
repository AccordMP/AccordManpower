import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService, User } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = authService.getToken();
    if (token) {
      // You might want to verify the token with the server here
      // For now, we'll assume it's valid if it exists
      // In a real app, you'd make a request to validate the token
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const { user: userData } = await authService.login(username, password);
    setUser(userData);
  };

  const register = async (userData: any) => {
    const { user: newUser } = await authService.register(userData);
    setUser(newUser);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
