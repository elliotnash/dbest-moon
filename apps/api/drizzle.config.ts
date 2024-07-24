// drizzle.config.ts
import { defineConfig } from "drizzle-kit";
import env from "~/env";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/database/schema.ts",
  out: `./drizzle/${env.DB_NAME}`,
  dbCredentials: {
    database: env.DB_NAME,
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
    ssl: false,
  }
});
