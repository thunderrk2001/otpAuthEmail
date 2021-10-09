const { createTransport, from } = require("../../configs/emailConfig")
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

function initEmailService() {
    var mailOptions = {
        from: from,
        to: 'thorritik@gmail.com',
        subject: 'Your SignUp OTP',
        text: '',
    };
    var transporter = nodemailer.createTransport(smtpTransport(createTransport));
    return async function(userName, otp) {
        mailOptions.subject = `OTP From website`
        mailOptions.text = `${otp}`
        mailOptions.to = [userName]
        console.log(mailOptions)
        try {
            const res = await transporter.sendMail(mailOptions)
            console.log(res)
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }
}
module.exports = { initEmailService }