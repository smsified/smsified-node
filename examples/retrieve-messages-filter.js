/**
 * Retrieve delivery information on a set of messages, using filters to specify messages.
 */

var util = require('util');
var smsified = require('../lib/smsified');

var sms = new SMSified('username', 'password');
sms.getMessages(null, {startDate: '2011-09-01', endDate: '2011-09-12'}, function(result) {
	util.puts(util.inspect(result));
});