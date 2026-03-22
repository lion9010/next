'use server';

// import { signIn } from 'next-auth/react';
// import { createClient } from './supabase/server';
// import  AuthError  from 'next-auth';

// export async function authenticate(
//     prevState: string | undefined,
//     formData: FormData,
// ) {
//     const supabase = await createClient();
//     try {
//         await signIn('db-interna', {
//             email: formData.get("email"),
//             password: formData.get("password"),
//             redirect: true,
//         });
//         return undefined
//     } catch (error) {
//     if (error instanceof AuthError) {
//       return "Credenciales inválidas";
//     }
//     throw error;
//   }
//     }

import { createClient } from './supabase/server';
// import { isRedirectError } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    const supabase = await createClient();
    
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const hashedPassword = await bcrypt.hash(password, 10);

    // 1. Llamada a Supabase
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password: hashedPassword,
    });

    // 2. Manejo de errores de Supabase
    if (error) {
        // Puedes personalizar el mensaje según el tipo de error
        if (error.status === 400) {
            return "Credenciales inválidas. Revisa tu email o contraseña.";
        }
        if (error.status === 401) {
                return "Credenciales inválidas. El correo o la contraseña no coinciden.";
            }
        return "Hubo un problema al iniciar sesión. Inténtalo de nuevo.";
    }

    // 3. Redirección en caso de éxito
    // Usamos un try/catch específico para redirect() porque Next.js 
    // lanza un error interno para manejar las redirecciones.
   
    
    return undefined;
}
