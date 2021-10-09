function createOtp() {
    const otp = Math.floor(1000 + Math.random(4) * 9000)
    return otp
}
module.exports = createOtp