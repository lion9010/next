import { z } from 'zod';

export const InvoiceFormSchema = z.object({
    id: z.string(),
    customerId: z.string().min(1, 'Selecciona un cliente'),
    amount: z.coerce.number().gt(0, { message: 'El monto debe ser mayor a 0' }),
    status: z.enum(['pending', 'paid'], { message: 'Selecciona un estado válido' }),
    date: z.string(),
}); 