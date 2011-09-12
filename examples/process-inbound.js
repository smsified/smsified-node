/**
 * Process an inbound SMS message.
 */
var util = require('util');
var http = require('http');
var smsified = require('../lib/smsified');
var port = 8000 || process.ARGS[1];

// Create a new HTTP server to listen for incoming messages.
var server = http.createServer(function(req, res) {

        req.addListener('data', function(data){
        	// Parse the incoming JSON from SMSified.
        	var json = JSON.parse(data);
        	
        	// Create a new Inbound Message object.
        	var inbound = new InboundMessage(json);
        	
        	// Access desired property of Inbound Message object.
        	util.puts('Inbound message: ' + inbound.message);
        });

        res.writeHead(200);
        res.end();

}).listen(port);
util.puts('Server listening on port ' + port);
