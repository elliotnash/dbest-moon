import { Elysia, t, getSchemaValidator } from "elysia";
import { cors } from "@elysiajs/cors";
import { createId } from '@paralleldrive/cuid2';
import env from "./env";
import { db } from "./database/db";
import { clicks } from "./database/schema";
import { count, eq } from "drizzle-orm";

const app = new Elysia()
  .use(cors())
  .get("/greeting", () => "Hello Elysia!" as const, {
    response: t.Literal("Hello Elysia!")
  })
  .put("/click", async ({ cookie: { deviceId } }) => {
    // Ensure device id cookie is set
    if (!deviceId.value) {
      deviceId.set({
        value: createId(),
        path: "/"
      });
      console.log(`created deviceId in click ${deviceId}`);
    }
    deviceId.expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    
    await db.insert(clicks).values({
      deviceId: deviceId.value!,
      time: new Date()
    });
  },
  {
    cookie: t.Cookie({
      deviceId: t.Optional(t.String())
    }),
    response: t.Void()
  })
  .get("/clicks", async ({ cookie: { deviceId } }) => {
    // Ensure device id cookie is set

    if (!deviceId.value) {
      deviceId.set({
        value: createId(),
        path: "/"
      });
      console.log(`created deviceId in clicks ${deviceId}`);
    }
    deviceId.expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

    const select = await db.select({ count: count() })
      .from(clicks)
      .where(eq(clicks.deviceId, deviceId.value!));
    return select[0].count;
  },
  {
    cookie: t.Cookie({
      deviceId: t.Optional(t.String())
    }),
    response: t.Number()
  })
  .listen(env.API_PORT);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
