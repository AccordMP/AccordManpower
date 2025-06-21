import { supabase } from './supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

// Re-exporting SupabaseUser as our app's User type for consistency
export type User = SupabaseUser;

export const authService = {
  async login(email: string, password: string): Promise<{ user: User | null; error: any }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { user: data.user, error };
  },

  async logout(): Promise<{ error: any }> {
    return await supabase.auth.signOut();
  },

  onAuthStateChange(callback: (user: User | null) => void): () => void {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user ?? null);
    });
    return () => authListener?.subscription.unsubscribe();
  },

  async getCurrentUser(): Promise<User | null> {
    const { data } = await supabase.auth.getUser();
    return data.user;
  },

  async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
  },

  async getAuthHeaders() {
    const session = await this.getSession();
    return session ? { Authorization: `Bearer ${session.access_token}` } : {};
  },
};
