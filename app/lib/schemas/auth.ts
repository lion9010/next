import { z } from 'zod';

export const EmailSchema = z
        .email('Correo inválido')
        .toLowerCase()
        .trim();

export const UpdatePasswordSchema = z.object({
    password: z
        .preprocess((value) => (value === null || value === undefined ? '' : value),
            z.string()
                .min(6, 'El password debe tener al menos 6 carácteres')
                .regex(/[a-zA-Z]/, { error: 'Debe contener al menos 1 letra.' })
                .regex(/[0-9]/, { error: 'Debe contener al menos 1 número.' })
                .regex(/[^a-zA-Z0-9]/, {
                    error: 'Debe contener al menos 1 carácter especial.',
                })
                .trim()
        ),
    confirmPassword: z
        .preprocess((value) => (value === null || value === undefined ? '' : value),
            z.string()
                .trim()
        ),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: 'El password y la confirmación no coinciden.',
        path: ['confirmPassword'],

    });

export const SignupFormSchema = z.object({
    name: z
        .string()
        .min(3, 'Muy corto')
        .max(100, 'Muy largo')
        .trim(),
    email: EmailSchema
}).and(UpdatePasswordSchema);