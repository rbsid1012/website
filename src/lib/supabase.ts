import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Read environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create client safely
let supabase: SupabaseClient | null = null;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase environment variables are missing. Supabase client not initialized.'
  );
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

// ----------------------------
// Type definitions
// ----------------------------

export interface HackathonRegistration {
  id?: string;
  user_id?: string;
  name: string;
  email: string;
  phone: string;
  team_name: string;
  experience: string;
  project_idea: string;
  created_at?: string;
}

export interface CareerApplication {
  id?: string;
  role_id: string;
  role_title: string;
  name: string;
  phone: string;
  email: string;
  resume_url: string;
  how_heard: string;
  why_join: string;
  product_changes: string;
  created_at?: string;
}