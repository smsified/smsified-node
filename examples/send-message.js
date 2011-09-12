/**
 * Send an outbound SMS message.
 */

var util = require('util');
var smsified = require('../lib/smsified');

var sms = new SMSified('username', 'password');
var options = {senderAddress: '4075541234', address: '15184761234', message: 'Hello world from Node.js'};
sms.sendMessage(options, function(result) {
	util.puts(util.inspect(result));
});