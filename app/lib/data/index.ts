import postgres from "postgres";

export const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });
export const ITEMS_PER_PAGE = 6;

export * from "./dashboard";
export * from "./invoices";
export * from "./customers";