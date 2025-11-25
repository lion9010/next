'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@/app/lib/data';
import { InvoiceFormSchema } from '@/app/lib/schemas/invoice';
import { InvoiceFormState } from '@/app/lib/types/invoices';

const CreateInvoice = InvoiceFormSchema.omit({ id: true, date: true });

export async function createInvoice(prevState: InvoiceFormState, formData: FormData) {
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Arregla los errores en el formulario.',
        }
    };

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format

    try {
        await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
    } catch (errors) {
        // We'll log the error to the console for now
        return {
            message: 'Error al crear la factura. Por favor revise los datos e inténtalo de nuevo más tarde.',
        };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}