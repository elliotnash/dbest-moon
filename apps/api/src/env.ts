import { t } from "elysia";
import { parse } from "./util";

export const envSchema = t.Object({
  // Http server settings
  HTTP_PORT: t.Numeric({ default: 8080 }),

  // Database credentials
  DB_NAME: t.Optional(t.String()),
  DB_HOST: t.Optional(t.String()),
  DB_USER: t.Optional(t.String()),
  DB_PASSWORD: t.Optional(t.String()),
  DB_PORT: t.Numeric({ default: 5432 }),
});

export default parse(envSchema, process.env);
