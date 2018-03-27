var sampleData = {results: [{roomname: 'room', text: 'message', username: 'user'}]};


module.exports.requestHandler = function(request, response) {

  // The outgoing status.
  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'text/plain';
  
  if (request.method === 'POST' && request.url === '/classes/messages') {
    statusCode = 201;
    var data = '';
    request.on('data', function(chunk) {
      data += chunk;
    });

    request.on('end', function() {
      sampleData.results.push(JSON.parse(data));
      response.writeHead(201, headers);
      response.end(JSON.stringify(sampleData));
    });
  } else if ((request.method === 'GET' || request.method === 'OPTIONS') && request.url === '/classes/messages') {
    response.writeHead(200, headers);
    response.end(JSON.stringify(sampleData));

  } else {
    response.writeHead(404, headers);
    response.end('404');
  }
};

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

