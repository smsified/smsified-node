/**
 * A Node.js module or interacting with the SMSified API.
 */

var https = require('https');

SMSified = function(username, password) {
	this.host = 'api.smsified.com';
	this.version = 'v1',
	this.username = username;
	this.password = password;
	this.responseBody;
};

// Send an outbmound SMS message.
SMSified.prototype.sendMessage = function(options, callback) {
	path = '/' + this.version + '/smsmessaging/outbound/' + options.senderAddress + '/requests?address=' + options.address + '&message=' + encodeURI(options.message);
	path += options.notifyURL ? '&notifyURL=' + options.notifyURL : '';
	this.makeApiCall('POST', path, callback);
};

// Check the status of an SMS message.
SMSified.prototype.checkStatus = function(senderAddress, requestID, callback) {
	path = '/v1/smsmessaging/outbound/' + senderAddress + '/requests/' + requestID + '/deliveryInfos';
	this.makeApiCall('GET', path, callback);
};

// Create a subscription for an account phone number.
SMSified.prototype.createSubscription = function(senderAddress, direction, notifyURL, callback) {
	path = '/' + this.version + '/smsmessaging/' + direction + '/' + senderAddress + '/subscriptions?notifyURL=' + notifyURL;
	this.makeApiCall('POST', path, callback);
};

// View all active subscriptions.
SMSified.prototype.viewSubscriptions = function(senderAddress, direction, callback) {
	path = '/' + this.version + '/smsmessaging/' + direction + '/subscriptions/?senderAddress=' + senderAddress;
	this.makeApiCall('GET', path, callback);
};

// Delete a subscrption.
SMSified.prototype.deleteSubscriptions = function(subscriptionID, direction, callback) {
	path = '/' + this.version + '/smsmessaging/' + direction + '/subscriptions/' + subscriptionID;
	this.makeApiCall('DELETE', path, callback);
};

// Get information on SMS messages.
SMSified.prototype.getMessages = function(messageID, options, callback) {
	path = '/' + this.version + '/messages/';
	if(messageID) {
		path += messageID;
	}
	else {
		path += '?';
		for(item in options) {
			path +=  item + '=' + encodeURI(options[item]) + '&';
		}
	}	
	this.makeApiCall('GET', path, callback);
};

// Helper method to make HTTP call to SMSified API.
SMSified.prototype.makeApiCall = function(method, path, callback) {

	var self = this;
	
	// Set authentication header.
	var auth = 'Basic ' + new Buffer(this.username + ':' + this.password).toString('base64');
	
	// Set options for HTTP request.
	var options = {
			host : this.host,
			port: 443,
			path : path,
			method : method
		};
	
	// Set HTTP headers for API request.
	if(method != 'DELETE') {
		headers = { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : auth , 'Content-Length': 0 };
	}
	else {
		headers = { 'Authorization' : auth, 'Content-Length': 0 };
	}
	options.headers = headers;
	
	var apiCall = https.request(options, function(response) {
		
		// If the HTTP method used is delete, just return the statusCode.
		if(method == 'DELETE') {
			callback(response.statusCode);
		}
		
		// Otherwise, return the response body.
		else {
			self.responseBody = "";
			response.setEncoding('utf8');
			response.on('data', function(data) {
				callback(JSON.parse(data));
			});
		}
	});
	apiCall.end();
};

InboundMessage = function(json) {
	this.dateTime = json.inboundSMSMessageNotification.inboundSMSMessage.dateTime;
	this.destinationAddress = json.inboundSMSMessageNotification.inboundSMSMessage.destinationAddress;
	this.message = json.inboundSMSMessageNotification.inboundSMSMessage.message;
	this.messageId = json.inboundSMSMessageNotification.inboundSMSMessage.messageId;
	this.senderAddress = json.inboundSMSMessageNotification.inboundSMSMessage.senderAddress;
};

exports.SMSified = SMSified;
exports.InboundMessage = InboundMessage;