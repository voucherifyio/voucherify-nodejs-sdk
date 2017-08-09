'use strict'

const {encode} = require('./helpers')

module.exports = class ValidationRules {
  constructor (client) {
    this.client = client
  }

  create (validationRule, callback) {
    return this.client.post('/validation-rules', validationRule, callback)
  }

  get (validationRuleId, callback) {
    return this.client.get(`/validation-rules/${encode(validationRuleId)}`, null, callback)
  }

  update (validationRule, callback) {
    return this.client.put(`/validation-rules/${encode(validationRule.id)}`, validationRule, callback)
  }

  delete (validationRuleId, callback) {
    return this.client.delete(`/validation-rules/${encode(validationRuleId)}`, callback)
  }
}
