import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://pcbvdnudargsvtdlrium.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjYnZkbnVkYXJnc3Z0ZGxyaXVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNjUxMzIsImV4cCI6MjA1Njc0MTEzMn0.XjWNpDe92oD4aTvxAFZnh8gkCSF2VNBghFxcDGGAaEE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
