import { createBrowserClient } from '@supabase/ssr';
// import { createServerClient } from '@supabase/ssr'
// import { cookies } from 'next/headers';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

// function getEnvVars() {
//   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
//   const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

//   if (!supabaseUrl || !supabasePublishableKey) {
//     throw new Error("Faltan variables de entorno de Supabase");
//   }

//   return {supabaseUrl, supabasePublishableKey};
// };

// export async function getSupabaseClient() {
//   const { supabaseUrl, supabasePublishableKey } = getEnvVars();
//   const cookiesStore = await cookies();

//   return createServerClient( supabaseUrl, supabasePublishableKey, {
//     cookies: {
//       getAll() {
//         return cookiesStore.getAll();
//       },
//       setAll(cookiesToSet) {
//         try {
//           cookiesToSet.forEach(
//             ({ name, value, options }) =>
//               cookiesStore.set(name, value, options)
//           );
//         } catch (error) {
//           console.error("Error configurando cookies de Supabase: ", error)
//         }
//       }
//     }
//   })
// }