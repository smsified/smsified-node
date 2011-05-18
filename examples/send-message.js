/**
 * Send an outbound SMS message.
 */

var sys = require('sys');
var smsified = require('../lib/smsified');

var sms = new SMSified('username', 'password');
var options = {senderAddress: '4075541234', address: '15184761234', message: 'Hello world from Node.js'};
sms.sendMessage(options, function(result) {
	sys.puts(sys.inspect(result));
});