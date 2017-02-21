if (process.env.NODE_ENV === 'lib') {
  module.exports = require('../lib/utils')
} else {
  module.exports = require('../src/utils')
}
