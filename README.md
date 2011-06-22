Node.js Module for the SMSified API
=========================

A Node.js module for interaction with the [SMSified](http://smsified.com) API.

SMSified API Overview
---------------------

SMSified is a simple REST SMS API, built to uniquely enable developers to create powerful SMS services with minimum effort. Through SMSified, developers can both send and receive SMS messages, as well as track usage and message history through a powerful reporting dashboard. You can use either standard phone numbers or short codes, and best of all, SMSified is backed by Voxeo - the world's largest real-time application cloud.

When you sign up, you automatically receive $20 in credit and one free phone number; this allows you to both receive and send free SMS messages while testing. When the credit runs out, just add a credit card for billing and you're live - but you get to keep the phone number for free! Check out our pricing page for more information.

More info here: [SMSified API Docs](http://www.smsified.com/sms-api-documentation)

Installation
------------

	npm install smsified


Usage Examples
--------------

The following simple example will send an outbound SMS message from (407) 554-1234 to (518) 476-1234 and write out the JSON response from SMSified to the console:

```js
var sys = require('sys');
var smsified = require('smsified');

var sms = new SMSified('username', 'password');
var options = {senderAddress: '4075541234', address: '15184761234', message: 'Hello world from Node.js'};
sms.sendMessage(options, function(result) {
	sys.puts(sys.inspect(result));
});
```

Send an outbound SMS message and set a callback URL:

```js
var sms = new SMSified('username', 'password');
var options = {senderAddress: '4075541234', address: '15184761234', message: 'Hello from Node.js with another callback', notifyURL: 'http://path-to-somewhere/'};
sms.sendMessage(options, function(result) {
	sys.puts(sys.inspect(result));
});
```

Process an inbound SMS message:

```js
var sys = require('sys');
var http = require('http');
var smsified = require('../lib/smsified');
var port = 8000 || process.ARGS[1];

// Create a new HTTP server to listen for incoming messages.
var server = http.createServer(function(req, res) {

        req.addListener('data', function(data){
        var json = JSON.parse(data);
        var inbound = new InboundMessage(json);
        sys.puts('Inbound message: ' + inbound.message);
        });

        res.writeHead(200);
        res.end();

}).listen(port);
sys.puts('Server listening on port ' + port);
```

Check the status of an SMS message:

```js
var sms = new SMSified('username', 'password');
sms.checkStatus('4075541234', '43d2f75b2bda27006200003e9b7dcf3b', function(result) {
	sys.puts(sys.inspect(result.deliveryInfoList.deliveryInfo));
});
```

Create a subscription for an account phone number:

```js
var sms = new SMSified('username', 'password');
sms.createSubscription('4075541234', 'outbound', 'http://path-to-somewhere', function(result) {
	sys.puts(sys.inspect(result));
});
```

View all active subscriptions:

```js
var sms = new SMSified('username', 'password');
sms.viewSubscriptions('4075541234', 'outbound', function(result) {
	sys.puts('Number of subscriptions: ' + result.outboundSubscriptionList.numberOfSubscriptions);
	sys.puts(sys.inspect(result.outboundSubscriptionList.outboundSubscription));
});
```

Delete a subscription:

```js
var sms = new SMSified('username', 'password');
sms.deleteSubscriptions('6267217aae394b5dc656ba4216082304', 'outbound', function(result) {
	if(result = '204') {
		sys.puts('Subscription delted.');
	}
	else {
		sys.puts('Could not delete subscription.');
	}	
});
```

Retrieve delivery information on a message:

```js
var sms = new SMSified('username', 'password');
sms.getMessages('02b45e3072ae5e157a12d0408bcede65', null, function(result) {
	sys.puts(sys.inspect(result));
});
```

Retrieve delivery information on a set of messages, using filters to specify messages:

```js
var sms = new SMSified('username', 'password');
sms.getMessages(null, {status: 'success', direction: 'in'}, function(result) {
	sys.puts(sys.inspect(result));
});
```
