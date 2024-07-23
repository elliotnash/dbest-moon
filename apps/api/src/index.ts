import { Elysia, t, getSchemaValidator } from "elysia";
import { cors } from "@elysiajs/cors";
import { createId } from '@paralleldrive/cuid2';
import env from "./env";

const app = new Elysia()
  .use(cors())
  .get("/greeting", () => "Hello Elysia!" as const, {
    response: t.Literal("Hello Elysia!")
  })
  .put("/click", ({ cookie: { deviceId } }) => {
    // Ensure device id cookie is set
    if (!deviceId.value) {
      deviceId.value = createId();
      console.log(`created deviceId ${deviceId}`);
    }
    deviceId.expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    console.log(`device ${deviceId} clicked`);
  }, {
    cookie: t.Cookie({
      deviceId: t.Optional(t.String())
    }),
    response: t.Void()
  })
  .listen(env.API_PORT);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
