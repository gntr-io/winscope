const fastify = require("fastify")({ logger: true });
fastify.register(require("./routes/winscopePlugin"), { prefix: "/winscope" });
fastify.listen({ port: 5000 }, (err) => console.log(err || "Server on 5000"));
