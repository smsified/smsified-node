/**
 * Check the status of an SMS message.
 */
var sys = require('sys');
var smsified = require('../lib/smsified');

var sms = new SMSified('username', 'password');
sms.checkStatus('4075541234', '43d2f75b2bda27006200003e9b7dcf3b', function(result) {
	sys.puts(sys.inspect(result.deliveryInfoList.deliveryInfo));
});