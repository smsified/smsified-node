/**
 * Send multiple outbound SMS messages.
 * Note - please refer to output restrictions in the SMSified documentation.
 *   http://smsified.com/sms-api-documentation#output_restrictions
 */


var util = require('util');
var smsified = require('../lib/smsified');

var messages = new Array('I love Node.js', 'I love Node.js even more', 'I love Node.js the mostest');
var sms = new SMSified('username', 'password');

for(var i=0; i<messages.length; i++) {
	var options = {senderAddress: '4076541234', address: '16867541234', message: messages[i]};
	sms.sendMessage(options, function(result) {
		util.puts(util.inspect(result));
	});
}