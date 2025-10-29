import { hc } from 'hono/client'

const client = hc('http://localhost:3000')

export { client }
