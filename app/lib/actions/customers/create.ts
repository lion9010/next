'use server';

import postgres from 'postgres';
import { CustomerFormSchema } from '@/app/lib/schemas';
import { CustomerFormState } from '@/app/lib/types';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const CreateCustomer = CustomerFormSchema.omit({ id: true });

export async function createCustomer(prevState: CustomerFormState, formData: FormData) {
    const validatedFields = CreateCustomer.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        imageUrl: formData.get('imageUrl'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.cause,
            message: 'Arregla los errores en el formulario.',
        };
    }

    const { name, email, imageUrl } = validatedFields.data;

    try {
        await sql`
      INSERT INTO customers (name, email, image_url)
      VALUES (${name}, ${email}, ${imageUrl || null})
    `;
    } catch (errors) {
        // We'll log the error to the console for now
        return {
            message: 'Error al crear el cliente. Por favor revise los datos e inténtalo de nuevo más tarde.',
        };
    }
};

