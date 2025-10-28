import { Hono } from 'hono'
import { logger } from 'hono/logger'

const app = new Hono()
app.use(logger())

app.get('/', (c) => {
  return c.text('Goodbye sailor')
})

export default app
