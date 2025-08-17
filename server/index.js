const fastify = require('fastify')({})
fastify.register(require('@fastify/cors'), {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
})
fastify.register(require('./routes/winscopePlugin'), { prefix: '/winscope' })

const PORT = 5000

fastify.listen({ port: PORT }, (err) => {
  if (err) {
    console.error('❌ Server failed to start:', err)
    process.exit(1)
  }

  const now = new Date()
  const timeString = now.toLocaleTimeString()
  const dateString = now.toLocaleDateString()

  console.log(`🟢 Server running on port ${PORT}`)
  console.log(`⚡ Started at ${timeString} on ${dateString}`)
  console.log(`🚀 Ready at http://localhost:5000`)
})
