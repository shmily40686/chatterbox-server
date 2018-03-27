// var http = require('http');
// var handleRequest = require('./request-handler');
var bodyParser = require('body-parser');
const express = require('express');
const app = express();

var messageData = {results: []};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header('access-control-allow-origin', '*');
  res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('access-control-allow-headers', 'content-type, accept');
  res.header('access-control-max-age', 10);
  res.set('Content-Type', 'text/plain');

  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get('/classes/messages', (req, res) => {
  res.status(200);
  res.send(JSON.stringify(messageData));
});

app.post('/classes/messages', (req, res) => {
  res.status(201);
  messageData.results.push(req.body);
  res.send(JSON.stringify(messageData));
});

app.listen(3000, '127.0.0.1');
  
// if (request.method === 'POST' && request.url === '/classes/messages') {
//   var data = '';
//   request.on('data', function(chunk) {
//     data += chunk;
//   });

//   request.on('end', function() {
//     messageData.results.push(JSON.parse(data));
//     response.writeHead(201, headers);
//     response.end(JSON.stringify(messageData));
//   });
// } else if ((request.method === 'GET' || request.method === 'OPTIONS') && request.url === '/classes/messages') {
//   response.writeHead(200, headers);
//   response.end(JSON.stringify(messageData));

// } else {
//   response.writeHead(404, headers);
//   response.end('404');
// }
// // Every server needs to listen on a port with a unique number. The
// // standard port for HTTP servers is port 80, but that port is
// // normally already claimed by another server and/or not accessible
// // so we'll use a standard testing port like 3000, other common development
// // ports are 8080 and 1337.
// var port = 3000;

// // For now, since you're running this server on your local machine,
// // we'll have it listen on the IP address 127.0.0.1, which is a
// // special address that always refers to localhost.
// var ip = '127.0.0.1';



// // We use node's http module to create a server.
// //
// // The function we pass to http.createServer will be used to handle all
// // incoming requests.
// //
// // After creating the server, we will tell it to listen on the given port and IP. */
// var server = http.createServer(handleRequest.requestHandler);
// console.log('Listening on http://' + ip + ':' + port);
// server.listen(port, ip);

// // To start this server, run:
// //
// //   node basic-server.js
// //
// // on the command line.
// //
// // To connect to the server, load http://127.0.0.1:3000 in your web
// // browser.
// //
// // server.listen() will continue running as long as there is the
// // possibility of serving more requests. To stop your server, hit
// // Ctrl-C on the command line.


// var headers = {
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'content-type, accept',
//   'access-control-max-age': 10, // Seconds.
//   'Content-Type' : 'text/plain'
// };