'use server';

import { SignupFormSchema, FormState } from './definitions';

import { error } from 'console';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import * as z from 'zod';
import bcrypt from 'bcrypt';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function signup(state: FormState, formData: FormData) {

    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    })
    if (!validatedFields.success) {
        const tree = z.treeifyError(validatedFields.error);
        const fieldErrors = {
            name: tree.properties?.name?.errors,
            email: tree.properties?.email?.errors,
            password: tree.properties?.password?.errors,
            confirmPassword: tree.properties?.confirmPassword?.errors,
        };
        const formDataObj: { [key: string]: string | null } = {};
        formData.forEach((value, key) => {
            formDataObj[key] = value?.toString() || null;
        });


        return {
            errors: fieldErrors,
            formErrors: formDataObj,
            message: 'Please fix the errors in the form.',
        }
    }

    const { name, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
}