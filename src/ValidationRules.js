'use strict'

const {encode, isFunction} = require('./helpers')
const omit = require('lodash.omit')

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
    return this.client.put(`/validation-rules/${encode(validationRule.id)}`, omit(validationRule, ['id']), callback)
  }

  delete (validationRuleId, callback) {
    return this.client.delete(`/validation-rules/${encode(validationRuleId)}`, callback)
  }

  createAssignment (validationRuleId, assignment, callback) {
    return this.client.post(`/validation-rules/${encode(validationRuleId)}/assignments`, assignment, callback)
  }

  deleteAssignment (validationRuleId, assignmentId, callback) {
    return this.client.delete(`/validation-rules/${encode(validationRuleId)}/assignments/${encode(assignmentId)}`, callback)
  }

  list (params, callback) {
    if (isFunction(params)) {
      callback = params
      params = {}
    }

    return this.client.get('/validation-rules', params, callback)
  }

  listAssignments (validationRuleId, params, callback) {
    if (isFunction(params)) {
      callback = params
      params = {}
    }

    return this.client.get(`/validation-rules/${encode(validationRuleId)}/assignments`, params, callback)
  }
}
