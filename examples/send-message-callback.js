/**
 * Send an outbound SMS message and set a callback URL.
 */

var util = require('util');
var smsified = require('../lib/smsified');

var sms = new SMSified('username', 'password');
var options = {senderAddress: '4075541234', address: '15184761234', message: 'Hello from Node.js with another callback', notifyURL: 'http://path-to-somewhere/'};
sms.sendMessage(options, function(result) {
	util.puts(util.inspect(result));
});