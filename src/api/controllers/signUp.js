const express = require("express")
const app = express()
require("dotenv").config()
const validateSignUpJson = require("../libs/validatePostJson")
const db = require("../../db/query")
const tableDb = require("../libs/TableDb")
const createOtp = require("../libs/createOtp")
const emailCheck = require("email-check")
const emailService = require("../libs/emailService")
const sendEmail = emailService.initEmailService()
const uuid = require("../../template/uuid")
app.use(express.json())
app.post("/signUp", async(req, res) => {
        let validateResult = validateSignUpJson(req.body)
        if (validateResult.status == false) {
            return res.status(400).send({ "message": validateResult.message, "status": "Bad request" })
        }
        try {
            const hasUser = await db.find_with_username(req.body.userName)
            if (hasUser) {
                return res.status(400).send({ "message": "Invaild data", "status": "Bad request" })
            }
            const finalData = tableDb.getOnlyTableAttributesData(req.body)
            let isEmailValid = true
            try {
                isEmailValid = await emailCheck(finalData.userName)
            } catch (e) {
                isEmailValid = false
            }
            if (isEmailValid) {
                const otp = createOtp()
                await sendEmail(finalData.userName, otp)
                const cookie_token = uuid().toString()
                const publicKey = uuid().toString()
                try {
                    await db.save_into_temp(finalData, otp, publicKey, cookie_token)
                    res.status(200).cookie("token", cookie_token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "strict"
                    })
                    return res.status(200).send({ "message": finalData, "public": publicKey })
                } catch (e) {
                    return res.status(404).send({ "message": "" })
                }

            }
            return res.status(400).send({ "message": "Email Not Found" })

        } catch (e) {
            console.log(e)
        }


    })
    //have to post for testing it is get
app.get("/signUp/verify", async(req, res) => {
    const publicKey = req.query.publicKey
    const token = req.headers.token
        //token= req.cookies.OTPtoken
    let otp = req.query.otp
    otp = Number(otp)
    if (!isNaN(otp) && (otp < 1000 || otp > 9999))
        return res.status(400).send({ "message": "Otp will be number of 4 digits" })
    try {
        const check = await db.verifyEmailWithOtp(publicKey, token, otp)
        return res.status(200).send({ "signUpStatus": check.status, "res": check.res })
    } catch (e) {
        console.log(e)
        return res.status(500).send("SERVER ERROR")
    }

})
app.get('*', (req, res) => {

    res.send('route not found')

})
app.listen(2000, (e) => {
    if (e)
        console.log(e)
    else
        console.log("Listening at port 2000..")
})