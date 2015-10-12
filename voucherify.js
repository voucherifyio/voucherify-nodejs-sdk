"use strict";

var util = require("util");

var request = require("request");
var when = require("when");

var backendUrl = "https://voucherify-bouncer.herokuapp.com/v1";

module.exports = function(options) {
    var headers = {
        "X-App-Id": options.applicationId,
        "X-App-Token": options.clientSecretKey
    };

    function errorMessage(statusCode, body) {
        return util.format("Unexpected status code: %d - Details: %j", statusCode, body);
    }

    function prepare(callback) {
        var deferred = when.defer();

        if (typeof(callback) === "function") {
            return {
                callback: function(error, res, body) {
                    if (error || res.statusCode >= 400) {
                        var message = errorMessage(res.statusCode, body);

                        callback(error || new Error(message));
                        return;
                    }

                    callback(null, body);
                }
            };
        } else {
            return {
                promise: deferred.promise,
                callback: function(error, res, body) {
                    if (error || res.statusCode >= 400) {
                        var message = errorMessage(res.statusCode, body);

                        deferred.reject(error || new Error(message));
                        return;
                    }

                    deferred.resolve(body);
                }
            };
        }
    }

    return {
        get: function(code, callback) {
            var url = util.format("%s/vouchers/%s", backendUrl, encodeURIComponent(code));
            var handler = prepare(callback);

            request.get({ url: url, headers: headers, json: true }, handler.callback);

            return handler.promise;
        },

        redemption: function(code, callback) {
            var url = util.format("%s/vouchers/%s/redemption", backendUrl, encodeURIComponent(code));
            var handler = prepare(callback);

            request.get({ url: url, headers: headers, json: true }, handler.callback);

            return handler.promise;
        },

        redeem: function(code, trackingId, callback) {
            var context = {};
            if (typeof(code) === "object") {
                context = code;
                code = context.voucher;
                delete context.voucher;
            }
            // No `tracking_id` passed here,
            // use callback from 2n argument.
            if (typeof(trackingId) === "function") {
                callback = trackingId;
                trackingId = undefined;
            }

            var handler = prepare(callback);
            var url = util.format("%s/vouchers/%s/redemption", backendUrl, encodeURIComponent(code));

            // If `tracking_id` passed, use it in query string.
            if (typeof(trackingId) === "string" && trackingId) {
                url += "?tracking_id=" + encodeURIComponent(trackingId);
            }

            request.post({ url: url, headers: headers, json: context }, handler.callback);

            return handler.promise;
        }
    };
};