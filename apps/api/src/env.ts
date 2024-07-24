import { t } from "elysia";
import { parse } from "./util";

export const envSchema = t.Object({
  // Http server settings
  API_PORT: t.Numeric({ default: 8080 }),

  // Database credentials
  DB_NAME: t.String(),
  DB_HOST: t.String(),
  DB_USER: t.String(),
  DB_PASSWORD: t.String(),
  DB_PORT: t.Numeric({ default: 5432 }),

  // Database options
  DB_MAX_CONNECTIONS: t.Numeric({ default: 10 })
});

export default parse(envSchema, { ...process.env });
