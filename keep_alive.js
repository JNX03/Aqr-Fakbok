var http = require('http');
http.createServer(function (req, res) {
  res.write("Aqr Project | Dev : Jn03");
  res.end();
}).listen(8080);
