const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
async function createRefreshToken() {
    var token = await jwt.sign({ "userName": "123@gmail.com" }, "12345", { expiresIn: 20 })
    console.log(token)
    try {
        var res = await jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjEyMyIsImlhdCI6MTYzMjU3MjkwMSwiZXhwIjoxNjMyNTcyOTIxfQ.0stFOcK6ikXCOp06h9ma7BQWBh51lBEUOvFTRJnivXI", "12345")
        console.log(res)
    } catch (e) { console.log(e) }
}
createRefreshToken()
async function addNewUserTodb() {
    var username, password, name, githubId, linkedInId





}
async function createHashedPassword(password, encryptedPassword) {
    const res = await bcrypt.hash("sdf123", 10)
    return res
}

async function compareHashedPassword(password, encryptedPassword) {
    try {

        const res = await bcrypt.compare(password, encryptedPassword)
        return res
    } catch (error) {
        return false
    }
}