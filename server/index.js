const fastify = require('fastify')({})

fastify.register(require('./routes/winscopePlugin'), { prefix: '/winscope' })

fastify.listen({ port: 5000 }, (err) => {
  if (err) {
    console.error('❌ Server failed to start:', err)
    process.exit(1)
  }

  const now = new Date()
  const timeString = now.toLocaleTimeString()
  const dateString = now.toLocaleDateString()

  console.log(`🟢 Server running on port 5000`)
  console.log(`⚡ Started at ${timeString} on ${dateString}`)
  console.log(`🚀 Ready at http://localhost:5000`)
})
