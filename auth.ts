import postgres from 'postgres';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { z } from 'zod';

import type { User } from '@/app/lib/types';

import { authConfig } from './auth.config';
 
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
async function getUser(email: string): Promise<User | undefined> {
  try {
    return await sql.begin( async (sql) => {
      email = email.toLowerCase();
      const personType = await sql<User[]>
      `SELECT type FROM person 
      INNER JOIN contact_point ON person.id = contact_point.person_id
      WHERE value=${email};
      `;

      // ⭐️ COMPROBACIÓN CLAVE: Si el array está vacío, devolvemos undefined
      if (personType.length === 0) {
        console.log('User not found for email:', email);
        return undefined; // Retorna undefined de la transacción (y de getUser)
      }

      const [tabla, columna] = personType[0].type === 'natural'
        ? ['natural_person', 'given_name']
        : ['juridical_person', 'commercial_name'];


      const user = await sql<User[]>
      `SELECT
        cp.person_id AS id,
        cp.value AS email,
        tb.${sql(columna)} AS name,
        p.type AS type,
        p.password
      FROM contact_point AS cp
      INNER JOIN ${sql(tabla)} AS tb ON cp.person_id = tb.id
      INNER JOIN person AS p ON cp.person_id = p.id
      WHERE value=${email};
      `;
      console.log('Fetched user:', user[0]);
      
      return user[0];
    } 
  );
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ 
            email: z.email(), 
            password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }
        
        console.log('credentiales inválidos');
        return null;
      },
    }),
  ],
});