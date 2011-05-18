/**
 * View all active subscriptions.
 */

var sys = require('sys');
var smsified = require('../lib/smsified');

var sms = new SMSified('username', 'password');
sms.viewSubscriptions('4075541234', 'outbound', function(result) {
	sys.puts('Number of subscriptions: ' + result.outboundSubscriptionList.numberOfSubscriptions);
	sys.puts(sys.inspect(result.outboundSubscriptionList.outboundSubscription));
});