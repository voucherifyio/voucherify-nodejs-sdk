'use strict'

module.exports = {
  validateCallbackResult: (done, server) => {
    return (err, result) => {
      expect(err).toBeNull()
      server.done()
      done()
    }
  },

  validateResolvedPromise: (done, server) => {
    return () => {
      server.done()
      done()
    }
  }
}
