import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { createId } from '@paralleldrive/cuid2';
import env from "./env";
import { db } from "./database/db";
import { clicks } from "./database/schema";
import { count, eq } from "drizzle-orm";
import swagger from "@elysiajs/swagger";
import { ThemeId } from "@elysiajs/swagger/scalar/types";

const app = new Elysia()
  .use(swagger({
    path: "docs",
    scalarConfig: {
      theme: "kepler" as ThemeId
    }
  }))
  .use(cors())
  .guard(
    {
      cookie: t.Cookie({
        deviceId: t.Optional(t.String())
      }),
      // Ensure deviceId is set for the following routes
      beforeHandle({ set, cookie: { deviceId } }) {
        if (!deviceId.value) {
          deviceId.set({
            value: createId(),
            path: "/"
          });
        }
        deviceId.expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
      },
    },
    (app) => app
      .get("/greeting", () => "Hello Elysia!" as const, {
        response: t.Literal("Hello Elysia!", {
          examples: ["Hello Elysia!"]
        })
      })
      .put("/click", async ({ cookie: { deviceId } }) => {
        await db.insert(clicks).values({
          deviceId: deviceId.value!,
          time: new Date()
        });
        const select = await db.select({ count: count() })
          .from(clicks)
          .where(eq(clicks.deviceId, deviceId.value!));
        return select[0].count;
      },
      {
        response: t.Number({
          examples: [1]
        })
      })
      .get("/clicks", async ({ cookie: { deviceId } }) => {
        const select = await db.select({ count: count() })
          .from(clicks)
          .where(eq(clicks.deviceId, deviceId.value!));
        return select[0].count;
      },
      {
        response: t.Number({
          examples: [49]
        })
      })
      .delete("/clicks", async ({ cookie: { deviceId } }) => {
        console.log(`Calling delete with ${deviceId}`);
        await db.delete(clicks).where(eq(clicks.deviceId, deviceId.value!));
      },
      {
        response: t.Void()
      }
    )
  )
  .listen(env.API_PORT);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
