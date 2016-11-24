'use strict'

const request = require('request')
const when = require('when')

const errorMessage = (statusCode, body) => {
  body = body || {}
  body.toString = function () {
    return `Unexpected status code: ${statusCode} - Details: ${JSON.stringify(body)}`
  }
  return body
}

const prepare = (callback) => {
  const deferred = when.defer()

  if (typeof (callback) === 'function') {
    return {
      callback: function (error, res, body) {
        if (error || res.statusCode >= 400) {
          callback(error || errorMessage(res.statusCode, body))
          return
        }

        callback(null, body)
      }
    }
  } else {
    return {
      promise: deferred.promise,
      callback: function (error, res, body) {
        if (error || res.statusCode >= 400) {
          deferred.reject(error || errorMessage(res.statusCode, body))
          return
        }

        deferred.resolve(body)
      }
    }
  }
}

module.exports = class ApiClient {
  constructor ({applicationId, clientSecretKey}) {
    this.basePath = 'https://api.voucherify.io/v1'
    this.headers = {
      'X-App-Id': applicationId,
      'X-App-Token': clientSecretKey,
      'X-Voucherify-Channel': 'Node.js-SDK'
    }
  }

  prepareUrl (path) {
    return `${this.basePath}/${path}`
  }

  get (path, qs, callback) {
    const handler = prepare(callback)
    request.get({
      url: this.prepareUrl(path),
      qs,
      headers: this.headers,
      json: true // TODO check that !!!!
    }, handler.callback)

    return handler.promise
  }

  post (path, json, callback) {
    const handler = prepare(callback)
    request.get({
      url: this.prepareUrl(path),
      headers: this.headers,
      json
    }, handler.callback)

    return handler.promise
  }

  put (path, json, callback) {
    const handler = prepare(callback)
    request.put({
      url: this.prepareUrl(path),
      headers: this.headers,
      json
    }, handler.callback)

    return handler.promise
  }

  delete (path, json, callback) {
    const handler = prepare(callback)
    request.del({
      url: this.prepareUrl(path),
      headers: this.headers
    }, handler.callback)

    return handler.promise
  }
}
