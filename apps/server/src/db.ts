import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Connection string format: postgresql://user:password@host:port/database
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/mydb";

const client = postgres(connectionString);
export const db = drizzle(client);
