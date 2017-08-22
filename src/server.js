const http = require('http');
const PORT = process.env.PORT || 4000;
const router = require('./router');

http.createServer(router).listen(PORT, () => {
  console.log(`Server Starts At PORT ${PORT}`);
});
