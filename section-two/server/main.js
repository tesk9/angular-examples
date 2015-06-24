var http = require("http");
var fs = require("fs");

var PORT = 8080;

var renderHome = function(request, response) {
  fs.readFile(__dirname + "/../client/index.html", function(err, data) {
    if(err) {
      response.writeHead(404);
      response.end(JSON.stringify(err));
    } else {
      response.writeHead(302);
      response.end(data);
    }
  });
};

var serveStatic = function(request, response) {
  var path = request.url.split("/public")[1];
  fs.readFile(__dirname + "/../client" + path, function(err, data) {
    if(err) {
      response.writeHead(404);
      response.end("File not found at " + path);
    } else {
      response.writeHead(200);
      response.end(data);
    }
  });
};

var handleRequest = function(request, response) {
  console.log(request.method, request.url);
  if(request.url.match(/public/)) {
    serveStatic(request, response);
  } else {
    renderHome(request, response);
  }
};


var server = http.createServer(handleRequest);

server.listen(PORT, function() {
  console.log("Server listening on http://localhost:", PORT);
});