class VoucherifyError extends Error {
  constructor (statusCode, body) {
    body = body || {}
    const generatedMessage = generateMessage(body, statusCode)

    super(body.message || generatedMessage)

    Object.assign(this, body)
  }
}

function generateMessage (body, statusCode) {
  if (typeof body === 'string') {
    return 'Unexpected status code: ' + statusCode + ' - Details: ' + body
  }
  return `Unexpected status code: ${statusCode} - Details: ${JSON.stringify(body)}`
}

module.exports = VoucherifyError
