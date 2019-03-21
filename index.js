require('dotenv').config();
const server = require('./server');

const port = process.env.PORT || 5000;
const greeting = process.env.GREETING;

server.listen(5000, () => {
  console.log(`\n* ${greeting}, Server Running on http://localhost:${port} *\n`);
});
