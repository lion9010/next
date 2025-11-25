import { z } from 'zod';

export const CustomerFormSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'El nombre es obligatorio'),
    email: z.email('Introduce un correo electrónico válido'),
    imageUrl: z.url('Introduce una URL válida para la imagen').optional(),
});