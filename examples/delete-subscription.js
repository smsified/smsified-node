/**
 * Delete a subscription.
 */

var util = require('util');
var smsified = require('../lib/smsified');

var sms = new SMSified('username', 'password');
sms.deleteSubscriptions('6267217aae394b5dc656ba4216082304', 'outbound', function(result) {
	if(result = '204') {
		util.puts('Subscription delted.');
	}
	else {
		util.puts('Could not delete subscription.');
	}	
});