import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, // 🔥 CLAVE ADMIN
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
