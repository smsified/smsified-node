/**
 * Retrieve delivery information on a message.
 */
var util = require('util');
var smsified = require('../lib/smsified');

var sms = new SMSified('username', 'password');
sms.getMessages('02b45e3072ae5e157a12d0408bcede65', null, function(result) {
	util.puts(util.inspect(result));
});