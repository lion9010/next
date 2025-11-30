import bcrypt from 'bcrypt';
import { invoices, customers, revenue, users } from '../lib/placeholder-data';
import { sql } from '../lib/data';
import { ta } from 'zod/locales';

// async function seedUsers() {

//   const insertedUsers = await Promise.all(
//     users.map(async (user) => {
//       const hashedPassword = await bcrypt.hash(user.password, 10);
//       let table: string,
//         columnName: string;
//       if (user.type === 'natural') {
//         table = 'natural_person';
//         columnName = 'given_name';
//       } else {
//         table = 'juridical_person';
//         columnName = 'commercial_name';
//       };
//       console.log(table, columnName);
//       try {
//         // INICIA LA TRANSACCIÓN
//         await sql.begin(async (sql) => { // Usar sql.begin() o pool.connect()

//             // 1. INSERT: person
//             await sql`
//                 INSERT INTO person (id, type, password)
//                 VALUES (${user.id}, ${user.type}, ${hashedPassword})
//                 ON CONFLICT (id) DO NOTHING;
//             `;

//             // 2. INSERT: contact_point
//             await sql`
//                 INSERT INTO contact_point (person_id, contact_type, value)
//                 VALUES (${user.id}, ${user.contactType}, ${user.email})
//                 ON CONFLICT (value) DO NOTHING;
//             `;

//             // 3. INSERT: tabla específica
//             await sql`
//                 INSERT INTO ${sql(table)} (id, ${sql(columnName)})
//                 VALUES (${user.id}, ${user.name})
//                 ON CONFLICT (id) DO NOTHING;
//             `;
//             // Si todo funciona, la librería hará automáticamente el COMMIT aquí.
//         });

//     } catch (error) {
//         // Si algo falla, la librería hará automáticamente el ROLLBACK
//         console.error(`Fallo al insertar usuario ${user.id} en la transacción:`, error);
//         throw error; // Re-lanza el error para que Promise.all lo capture
//     }
//     }),
//   );

//   return insertedUsers;
// }

async function seedInvoices() {
  // await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // await sql`
  //   CREATE TABLE IF NOT EXISTS invoices (
  //     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  //     customer_id UUID NOT NULL,
  //     amount INT NOT NULL,
  //     status VARCHAR(255) NOT NULL,
  //     date DATE NOT NULL
  //   );
  // `;

  const insertedInvoices = await Promise.all(
    invoices.map(
      (invoice) => sql`
        INSERT INTO invoice (
          issuer_legal_representative_id, 
          total_amount, 
          status, 
          created_at
        )
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedInvoices;
}

async function seedCustomers() {
  // await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // await sql`
  //   CREATE TABLE IF NOT EXISTS customers (
  //     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  //     name VARCHAR(255) NOT NULL,
  //     email VARCHAR(255) NOT NULL,
  //     image_url VARCHAR(255) NOT NULL
  //   );
  // `;

  const insertedCustomers = await Promise.all(
    customers.map(
      (customer) => sql`
        INSERT INTO customers (
          id,
          name,
          email, 
          image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCustomers;
}

async function seedRevenue() {
  await sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

  const insertedRevenue = await Promise.all(
    revenue.map(
      (rev) => sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
    ),
  );

  return insertedRevenue;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      // seedUsers(),
      seedCustomers(),
      seedInvoices(),
      seedRevenue(),
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
