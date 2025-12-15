'use server';

import { signIn } from 'next-auth/react';
import  AuthError  from 'next-auth';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('db-interna', {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: true,
        });
        return undefined
    } catch (error) {
    if (error instanceof AuthError) {
      return "Credenciales inválidas";
    }
    throw error;
  }
    }
