/**
 * Delete a subscription.
 */

var sys = require('sys');
var smsified = require('../lib/smsified');

var sms = new SMSified('username', 'password');
sms.deleteSubscriptions('6267217aae394b5dc656ba4216082304', 'outbound', function(result) {
	if(result = '204') {
		sys.puts('Subscription delted.');
	}
	else {
		sys.puts('Could not delete subscription.');
	}	
});