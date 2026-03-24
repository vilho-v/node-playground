// Node.js käytätä commonJS moduulijärkkää
// tää tuo 'http' moduulin koodiin ja ottaa käyttöön (kuten using)
const http = require('http');

// iha vaan portti
const port = 3000;



// metodi joka luo palvelimen o_O(request,response)
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Node.js');
});

server.listen(port,() => {
  console.log('Server is running at port ' + port);
});