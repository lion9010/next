'use server'

import z from "zod";
import { UpdatePasswordSchema } from "../../schemas";
import { UpdatePasswordFormState } from "../../types";
import { createClient } from "../../supabase/server";

export async function updatePassword(state: UpdatePasswordFormState, formData: FormData): Promise<UpdatePasswordFormState> {
    const validatedFields = UpdatePasswordSchema.safeParse({
        password: formData.get('newPassword'),
        confirmPassword: formData.get('confirmPassword'),
    })
    if (!validatedFields.success){
        const tree = z.treeifyError(validatedFields.error)
        const fieldErrors = {
            newPassword: tree.properties?.password?.errors,
            confirmPassword: tree.properties?.confirmPassword?.errors,
        }
        const formDataObj: { [key: string]: string | null } = {};
        formData.forEach((value, key) => {
            formDataObj[key] = value?.toString() || null;
        });

        return {
            status: "error",
            message: "Por favor arregla los errores de la contraseña",
            fieldErrors: fieldErrors,
            formErrors: formDataObj
        }
    }

    const newPassword = validatedFields.data.password;
    const supabase = await createClient();
    supabase.auth.updateUser({password: newPassword})

    return { status: "success" }
}