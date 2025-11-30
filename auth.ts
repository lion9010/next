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
    const user = await sql<User[]>
    `SELECT
      cp.person_id AS id,
      cp.value AS email,
      np.given_name AS name,
      p.password
    FROM contact_point AS cp
    INNER JOIN natural_person AS np ON cp.person_id = np.id
    INNER JOIN person AS p ON cp.person_id = p.id
    WHERE value=${email};
    `;
    console.log('Fetched user:', user);
    return user[0];
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