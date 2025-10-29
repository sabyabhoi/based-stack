import { Hono } from "hono";
import { logger } from "hono/logger";
import { db } from "./db";
import { users } from "./schema";

const app = new Hono();
app.use(logger());

app.get("/", (c) => {
  return c.text("Goodbye sailor");
});

app.get("/users", async (c) => {
  const allUsers = await db.select().from(users);
  return c.json(allUsers);
});

export default app;
