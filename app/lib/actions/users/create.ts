'use server';

import { z } from 'zod';
import { SignupFormSchema } from '@/app/lib/schemas/index';
import { SignupFormState } from '@/app/lib/types/index';
import bcrypt from 'bcrypt';
import { sql } from '@/app/lib/data';
import { UUID } from 'crypto';
import { parsePgError } from '@/app/lib/actions/errors';
import { PostgresError } from 'postgres';


export async function signup(state: SignupFormState, formData: FormData) {

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
    try {
        const data = await sql <{ id: UUID }[]>`
        INSERT INTO users (name, email, password)
        VALUES (${name}, ${email}, ${hashedPassword})
        RETURNING id`;

        return { success: true, id: data[0].id };
    } catch (error: PostgresError | any) {
        return {
            errorDB: parsePgError(error),
            formErrors: {
                name,
                email,
                password,
                confirmPassword: formData.get('confirmPassword')?.toString() || '',
            },
        };
    }
}