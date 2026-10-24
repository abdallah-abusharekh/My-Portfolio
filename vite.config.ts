import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Serves api/chat.ts during `npm run dev`, so the chat works without `vercel dev`.
// Runs only in the Node dev server; the key never reaches the browser bundle.
function devApi(): Plugin {
  return {
    name: 'dev-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        try {
          const { default: handler } = await server.ssrLoadModule('/api/chat.ts')

          const chunks: Buffer[] = []
          for await (const chunk of req) chunks.push(chunk as Buffer)
          const hasBody = req.method !== 'GET' && req.method !== 'HEAD'

          const response: Response = await handler.fetch(
            new Request(`http://localhost${req.originalUrl ?? '/api/chat'}`, {
              method: req.method,
              headers: { 'content-type': req.headers['content-type'] ?? '' },
              body: hasBody ? Buffer.concat(chunks) : undefined,
            }),
          )

          res.statusCode = response.status
          response.headers.forEach((value, key) => res.setHeader(key, value))
          res.end(Buffer.from(await response.arrayBuffer()))
        } catch (err) {
          server.config.logger.error(`dev-api: ${String(err)}`)
          res.statusCode = 500
          res.setHeader('content-type', 'application/json')
          res.end(JSON.stringify({ error: 'Local API error, see the terminal.' }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  // Expose GEMINI_API_KEY to the dev API handler (server-side process.env only)
  process.env.GEMINI_API_KEY ??= loadEnv(mode, process.cwd(), '').GEMINI_API_KEY

  return {
    plugins: [react(), devApi()],
  }
})
