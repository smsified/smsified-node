/**
 * Retrieve delivery information on a set of messages, using filters to specify messages.
 */

var sys = require('sys');
var smsified = require('../lib/smsified');

var sms = new SMSified('username', 'password');
sms.getMessages(null, {status: 'success', direction: 'in'}, function(result) {
	sys.puts(sys.inspect(result));
});