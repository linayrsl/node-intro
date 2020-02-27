const http = require('http');
const fs = require('fs');
const url = require('url');
const rollDice = require('./roll-dice');

http.createServer((request, response)=> {
   response.writeHead(200, {'content-type': 'text/html'});

   if (request.url.includes('/write')) {
       const username = url.parse(request.url, true).query.username;
       fs.writeFile('./users.txt', username, (err) => {
            if (err) {
                console.log(err);
            }
            response.end();
       });
   }

   if (request.url === '/read') {
       fs.readFile('./users.txt', 'utf-8', (err, content) => {
           response.write(content);
           response.end();
       });
   }

   if (request.url === '/delete') {
       fs.writeFile('./users.txt', '', (err) => {
           if (err) {
               console.log(err);
           } else {
               response.write(`The content of ./users was deletd`);
           }
           response.end();
       });
   }

   if (request.url === '/roll') {
       rollDice().then((num) => {
           if (num === 4) {
               response.write('You won!');
           } else {
               response.write('You lose!');
           }
           response.end();
       });
   }

}).listen(4000);

console.log('Listening on: http://localhost:4000');