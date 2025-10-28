import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { auth } from './auth'
import { db } from './db'
import { user } from './db/schema'

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null
  }
}>()

app.use(logger())

// CORS for auth routes
app.use("/api/auth/*", cors({
  origin: "http://localhost:5173", // your client URL (Vite dev server)
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["POST", "GET", "OPTIONS"],
  credentials: true,
}))

// Auth handler
app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw)
})

// Auth middleware
app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers })
  if (!session) {
    c.set("user", null)
    c.set("session", null)
    return next()
  }
  c.set("user", session.user)
  c.set("session", session.session)
  return next()
})

app.get('/', (c) => {
  return c.text('Goodbye sailor')
})

app.get('/session', (c) => {
  const session = c.get("session")
  const user = c.get("user")

  if (!user) return c.body(null, 401)

  return c.json({ session, user })
})

app.get('/db-test', async (c) => {
  try {
    const result = await db.select().from(user).limit(1)
    return c.json({ message: 'DB connected', count: result.length })
  } catch (error) {
    return c.json({ error: 'DB connection failed', details: error }, 500)
  }
})

export default app
