import { createClient } from "@supabase/supabase-js";

// Load env vars (db.ts already loads dotenv, but ensure here if file imported early)
import dotenv from "dotenv";
dotenv.config({ path: process.cwd() + "/.env" });

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY as string;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE as string;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE) {
  throw new Error("Supabase environment variables are not set correctly");
}

// Public client for client-side interactions (anon)
export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Service-role client for privileged server ops
export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export async function ensureAdminUser(email: string, password: string) {
  // Check if the user already exists (Supabase admin API lacks direct lookup by email)
  const { data: list, error: listErr } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 100 });
  if (listErr) throw listErr;
  const existing = list?.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
  if (existing) return existing;

  // Create the admin user (ignore "user already registered" error)
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role: "admin" },
    app_metadata: { role: "admin" },
  });
  if (error) {
    // 400 + error.message includes "User already registered" when race condition
    if (error.message.includes("registered")) {
      return (await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 100 })).data?.users.find((u) => u.email === email);
    }
    throw error;
  }
  return data.user;
}
