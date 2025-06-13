import { apiRequest } from "./queryClient";

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  async login(username: string, password: string): Promise<AuthResponse> {
    const response = await apiRequest("POST", "/api/auth/login", {
      username,
      password,
    });
    const data = await response.json();
    
    // Store token in localStorage
    localStorage.setItem("auth_token", data.token);
    
    return data;
  },

  async register(userData: {
    username: string;
    email: string;
    password: string;
    role?: string;
  }): Promise<AuthResponse> {
    const response = await apiRequest("POST", "/api/auth/register", userData);
    const data = await response.json();
    
    // Store token in localStorage
    localStorage.setItem("auth_token", data.token);
    
    return data;
  },

  logout() {
    localStorage.removeItem("auth_token");
  },

  getToken(): string | null {
    return localStorage.getItem("auth_token");
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  getAuthHeaders() {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};
