/**
 * View all active subscriptions.
 */

var util = require('util');
var smsified = require('../lib/smsified');

var sms = new SMSified('username', 'password');
sms.viewSubscriptions('4075541234', 'outbound', function(result) {
	util.puts('Number of subscriptions: ' + result.outboundSubscriptionList.numberOfSubscriptions);
	util.puts(util.inspect(result.outboundSubscriptionList.outboundSubscription));
});