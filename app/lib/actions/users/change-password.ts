'use server';

import { EmailSchema } from "../../schemas/index";
import { createClient } from "../../supabase/server";
import { ForgotPasswordFormState } from "../../types";
import { z } from 'zod';

export async function changePassword(state: ForgotPasswordFormState, formData: FormData): Promise<ForgotPasswordFormState> {

    const validatedFields = EmailSchema.safeParse(
        formData.get('email')
    )
    if (!validatedFields.success) {
        const tree = z.treeifyError(validatedFields.error)
        const fieldErrors = {
            email: tree.errors
        }

        return {
            status: "error",
            message: "Por favor arregla el error",
            fieldErrors: fieldErrors,
        }
    }

    const email = validatedFields.data;
    const supabase = await createClient();
    supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:3000/auth/update-password'
    })

    return {
        status: "success",
        email
    }
}