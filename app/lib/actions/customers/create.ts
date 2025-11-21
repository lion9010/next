'use server';

import { z } from 'zod';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'El nombre es obligatorio'),
    email: z.email('Introduce un correo electrónico válido'),
    imageUrl: z.url('Introduce una URL válida para la imagen').optional(),
});

const CreateCustomer = FormSchema.omit({ id: true });

export type State = {
    errors?: {
        name?: string[];
        email?: string[];
        imageUrl?: string[];
    };
    message?: string | null;
};

export async function createCustomer(prevState: State, formData: FormData) {
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

