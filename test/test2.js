const http = require('http');
var fs = require('fs');
const hostname = '127.0.0.1';
const port = 3000;

fs.readFile('./index.html', function (err, html) {

    if (err) throw err;    

    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.write(html.toString());  
        res.end();
      });
      
      server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
      });
});

