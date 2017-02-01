// HTTP Portion
var http = require('http');
var fs = require('fs'); // Using the filesystem module
var httpServer = http.createServer(requestHandler);
var url = require('url');
httpServer.listen(8080); //this will be part of the url when we access our page

function requestHandler(req, res) {

	var parsedUrl = url.parse(req.url);
	console.log("The Request is: " + parsedUrl.pathname);
		
	fs.readFile(__dirname + parsedUrl.pathname, 
		// Callback function for reading
		function (err, data) {
			// if there is an error
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + parsedUrl.pathname);
			}
			// Otherwise, send the data, the contents of the file
			res.writeHead(200);
			res.end(data);
  		}
  	);
  	
  	/*
  	res.writeHead(200);
  	res.end("Life is wonderful");
  	*/
}

// WebSocket Portion
// WebSockets work with the HTTP server

// This is where we send and receive events
var io = require('socket.io').listen(httpServer);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection', 

	// We are given a websocket object in our function
	function (socket) {
		// THIS IS WHERE EVERYTHING HAPPENS
		// this is where we listen for messages
		// this is also where we send messages
	
		// All message sending back and forth happens here
		console.log("We have a new client: " + socket.id);
		
		// When this user emits, client side: socket.emit('otherevent',some data);
		// this is how socket.on will look
		socket.on('chatmessage', function(data) {
			// Data comes in as whatever was sent, including objects
			console.log("Received: 'chatmessage' " + data);
			
			// Send it to all of the clients
			io.sockets.emit('chatmessage', data);
			
		});
		
		
		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});
	}
);