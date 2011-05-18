/**
 * Create a subscription for an account phone number.
 */
var sys = require('sys');
var smsified = require('../lib/smsified');

var sms = new SMSified('username', 'password');
sms.createSubscription('4075541234', 'outbound', 'http://path-to-somewhere', function(result) {
	sys.puts(sys.inspect(result));
});