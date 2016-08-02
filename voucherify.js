"use strict";

var util = require("util");

var request = require("request");
var when = require("when");

var backendUrl = "https://api.voucherify.io/v1";

module.exports = function(options) {
    var headers = {
        "X-App-Id": options.applicationId,
        "X-App-Token": options.clientSecretKey,
        "X-Voucherify-Channel": "Node.js-SDK"
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
        /*
         *  List vouchers. Sample query: { limit: 100, skip: 200, category: "Loyalty" }
         */
        list: function(query, callback) {
            var url = util.format("%s/vouchers/", backendUrl);
            var handler = prepare(callback);

            request.get({ url: url, qs: query, headers: headers, json: true }, handler.callback);

            return handler.promise;
        },

        get: function(code, callback) {
            var url = util.format("%s/vouchers/%s", backendUrl, encodeURIComponent(code));
            var handler = prepare(callback);

            request.get({ url: url, headers: headers, json: true }, handler.callback);

            return handler.promise;
        },

        create: function(voucher, callback) {
            var url = util.format("%s/vouchers/%s", backendUrl, encodeURIComponent(voucher.code || ""));
            var handler = prepare(callback);

            request.post({ url: url, headers: headers, json: voucher }, handler.callback);

            return handler.promise;
        },

        update: function(voucher, callback) {
            var url = util.format("%s/vouchers/%s", backendUrl, encodeURIComponent(voucher.code));
            var handler = prepare(callback);

            request.put({ url: url, headers: headers, json: voucher }, handler.callback);

            return handler.promise;
        },

        enable: function(code, callback) {
            var url = util.format("%s/vouchers/%s/enable", backendUrl, encodeURIComponent(code));
            var handler = prepare(callback);

            request.post({ url: url, headers: headers, json: true }, handler.callback);

            return handler.promise;
        },

        disable: function(code, callback) {
            var url = util.format("%s/vouchers/%s/disable", backendUrl, encodeURIComponent(code));
            var handler = prepare(callback);

            request.post({ url: url, headers: headers, json: true }, handler.callback);

            return handler.promise;
        },

        validate: function(code, context, callback) {
            if (typeof(context) === "undefined") {
                context = {};
            }

            if (typeof(context) === "function") {
                callback = context;
                context = {};
            }

            var handler = prepare(callback);
            var url = util.format("%s/vouchers/%s/validate", backendUrl, encodeURIComponent(code));

            request.post({ url: url, headers: headers, json: context }, handler.callback);

            return handler.promise;
        },

        redemption: function(code, callback) {
            var url = util.format("%s/vouchers/%s/redemption", backendUrl, encodeURIComponent(code));
            var handler = prepare(callback);

            request.get({ url: url, headers: headers, json: true }, handler.callback);

            return handler.promise;
        },

        /*
         *  List redemptions. Sample query (1000 successful redemptions from April 2016):
         *  {
         *      limit: 1000,
         *      page: 0,
         *      start_date: "2016-04-01T00:00:00",
         *      end_date: "2016-04-30T23:59:59",
         *      result: "Success"
         *  }
         */
        redemptions: function(query, callback) {
            var url = util.format("%s/redemptions/", backendUrl);
            var handler = prepare(callback);

            request.get({ url: url, qs: query, headers: headers, json: true }, handler.callback);

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
        },

        rollback: function(redemptionId, reason, callback) {
            if (typeof(reason) === "function") {
                callback = reason;
                reason = undefined;
            }

            var handler = prepare(callback);
            var url = util.format("%s/redemptions/%s/rollback", backendUrl, encodeURIComponent(redemptionId));

            // If `reason` passed, use it in query string.
            if (typeof(reason) === "string" && reason) {
                url += "?reason=" + encodeURIComponent(reason);
            }

            request.post({ url: url, headers: headers, json: true }, handler.callback);

            return handler.promise;
        },

        publish: function(campaignName, callback) {
            var url = util.format("%s/vouchers/publish", backendUrl);
            var payload = {};
            if (typeof(campaignName) === "string") {
                url += "?campaign=" + encodeURIComponent(campaignName);
            }
            if (typeof(campaignName) === "object") {
                payload = campaignName;
            }
            var handler = prepare(callback);

            request.post({ url: url, headers: headers, json: payload }, handler.callback);

            return handler.promise;
        },

        customer: {
            create: function(customer, callback) {
                var url = util.format("%s/customers", backendUrl);
                var handler = prepare(callback);

                request.post({ url: url, headers: headers, json: customer }, handler.callback);

                return handler.promise;
            },

            get: function(customerId, callback) {
                var url = util.format("%s/customers/%s", backendUrl, encodeURIComponent(customerId || ""));
                var handler = prepare(callback);

                request.get({ url: url, headers: headers }, handler.callback);

                return handler.promise;
            },

            update: function(customer, callback) {
                var url = util.format("%s/customers/%s", backendUrl, encodeURIComponent(customer.id || ""));
                var handler = prepare(callback);

                request.put({ url: url, headers: headers, json: customer }, handler.callback);

                return handler.promise;
            },

            delete: function(customerId, callback) {
                var url = util.format("%s/customers/%s", backendUrl, encodeURIComponent(customerId || ""));
                var handler = prepare(callback);

                request.del({ url: url, headers: headers }, handler.callback);

                return handler.promise;
            }
        }
    };
};