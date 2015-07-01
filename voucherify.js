var request = require("request");

var backendUrl = "https://voucherify-backend.herokuapp.com";

module.exports = function(options) {
	var headers = {
		'X-App-Id'    : options.key,
		'X-App-Token' : options.token
	};

	function handler(callback) {
		return function(error, res, body) {
			callback(error, body);
		}
	}

	return {
		get: function(code, callback) {
			request.get({ url: backendUrl + "/vouchers/" + code, headers: headers, json: true }, handler(callback));
		},
		usage: function(code, callback) {
			request.get({ url: backendUrl + "/vouchers/" + code + "/usage", headers: headers, json: true }, handler(callback));
		},
		use: function(code, callback) {
			request.put({ url: backendUrl + "/vouchers/" + code + "/usage", headers: headers, json: true }, handler(callback));
		}
	};
}