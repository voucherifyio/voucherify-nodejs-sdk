"use strict";

var util = require("util");

var request = require("request");
var when = require("when");

var backendUrl = "https://voucherify-backend.herokuapp.com";

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
                callback: function (error, res, body) {
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
                callback: function (error, res, body) {
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
        get: function (code, callback) {
            var handler = prepare(callback);

            request.get({ url: util.format("%s/vouchers/%s", backendUrl, code), headers: headers, json: true },
                        handler.callback);

            return handler.promise;
        },

        usage: function (code, callback) {
            var handler = prepare(callback);

            request.get({ url: util.format("%s/vouchers/%s/usage", backendUrl, code), headers: headers, json: true },
                        handler.callback);

            return handler.promise;
        },

        use: function (code, callback) {
            var handler = prepare(callback);

            request.post({ url: util.format("%s/vouchers/%s/usage", backendUrl, code), headers: headers, json: true },
                         handler.callback);

            return handler.promise;
        }
    };
};
