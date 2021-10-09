module.exports = {
    createTransport: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        pool: true,
        secure: true,
        auth: {
            user: process.env.myEmail, // generated ethereal user
            pass: process.env.emailPass, // generated ethereal password
        },

    },
    from: "emailthunder123@gmail.com"

}