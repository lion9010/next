'use server';

import { z } from 'zod';
import { SignupFormSchema } from '@/app/lib/schemas/index';
import { SignupFormState } from '@/app/lib/types/index';
import bcrypt from 'bcrypt';
import { sql } from '@/app/lib/data';
import { parsePgError } from '@/app/lib/actions/errors';
import { PostgresError } from 'postgres';
import { capitalizeSentence } from '../../utils';
import { signIn } from '@/auth';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';


export async function signup(state: SignupFormState, formData: FormData) {

    const validatedFields = SignupFormSchema.safeParse({
        personType: formData.get('personType'),
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
    const capitalizedName = capitalizeSentence(name);
    const hashedPassword = await bcrypt.hash(password, 10);
    const type = formData.get('personType') === 'on' ? 'juridical' : 'natural';

    const config = {
        juridical: {
            table: 'juridical_person',
            columnName: 'commercial_name',
        },
        natural: {
            table: 'natural_person',
            columnName: 'given_name',
        },
        // Otros tipos futuros aquí...
    };

    const { table, columnName } = config[type];
    try {
        // INICIA LA TRANSACCIÓN
        await sql.begin(async (sql) => { // Usar sql.begin() o pool.connect()

            // 1. INSERT: person
            const id = await sql`
                INSERT INTO person ( type, password)
                VALUES (${type}, ${hashedPassword})
                RETURNING id;
            `;

            // 2. INSERT: contact_point
            await sql`
                INSERT INTO contact_point (person_id, contact_type, value)
                VALUES (${id[0].id}, 'email', ${email});
            `;

            // 3. INSERT: tabla específica
            await sql`
                INSERT INTO ${sql(table)} (id, ${sql(columnName)})
                VALUES (${id[0].id}, ${capitalizedName});
            `;
            // Si todo funciona, la librería hará automáticamente el COMMIT aquí.
            // return { success: true, id: id[0].id };
        });

        // Después de la creación, iniciar sesión automáticamente
        await signIn('credentials', {
            redirect: false,
            email: email,
            password: password,
        });
        
        
    } catch (error: PostgresError | any) {
        
        // 1. 🛑 PRIORIDAD: RELANZAR LA REDIRECCIÓN DE NEXT.JS
        // Si el error es la excepción lanzada por `redirect()` (ej. si el signIn fallara y llamara a redirect)
        // o si accidentalmente la llamada a `redirect` estuviera dentro del try/catch anidado.
        if (error.message.includes('NEXT_REDIRECT')) {
            throw error;
        }

        // 2. MANEJO DE ERRORES DE AUTENTICACIÓN (Auth.js)
        if (error instanceof AuthError) {
             // Esto captura fallos específicos del signIn, aunque es improbable si el usuario acaba de ser creado
             return { error: 'Failed to automatically sign in after registration.' };
        }
        
        // 3. MANEJO DE ERRORES DE NEGOCIO Y BASE DE DATOS (Tu lógica original)
        // Si la creación de la cuenta falla (ej. restricción de unicidad de email)
        return {
            errorDB: parsePgError(error), // Asume que esta función parsea errores de Postgres
            formErrors: {
                name,
                email,
                password,
                confirmPassword: formData.get('confirmPassword')?.toString() || '',
            },
        };
    }
    redirect('/dashboard');
}