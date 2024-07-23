import { drizzle } from 'drizzle-orm/node-postgres';
import postgres from "postgres";
import * as schema from './schema';
import env from "~/env";

export const db = drizzle(
  postgres({
    database: env.DB_NAME,
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    max: env.DB_MAX_CONNECTIONS
  }), {
    schema,
  }
);
