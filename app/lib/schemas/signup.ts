import { z } from 'zod';

export const SignupFormSchema = z.object({
    name: z
        .string()
        .min(2, 'Muy corto')
        .max(100, 'Muy largo')
        .trim(),
    email: z
        .email('Invalid email address')
        .toLowerCase()
        .trim(),
    password: z
        .preprocess((value) => (value === null || value === undefined ? '' : value),
            z.string()
                .min(6, 'Password must be at least 6 characters long')
                .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
                .regex(/[0-9]/, { error: 'Contain at least one number.' })
                .regex(/[^a-zA-Z0-9]/, {
                    error: 'Debe contener al menos un carácter especial.',
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