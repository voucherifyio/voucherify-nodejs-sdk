var voucherifyClient = require('../voucherify.js')

describe('voucherify', function() {

    it('should detect missing applicationId', function () {
        expect(function () {
            voucherifyClient({
                clientSecretKey: "CLIENT-SECRET-KEY"
            })
        }).toThrow(new Error("Missing required option 'applicationId'"))
    })

    it('should detect missing clientSecretKey', function () {
        expect(function () {
            voucherifyClient({
                applicationId: "APPLICATION-ID"
            })
        }).toThrow(new Error("Missing required option 'clientSecretKey'"))
    })

})
