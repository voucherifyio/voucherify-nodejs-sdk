if (process.env.NODE_ENV === 'lib') {
  module.exports = require('../lib/index')
} else {
  module.exports = require('../src/index')
}
