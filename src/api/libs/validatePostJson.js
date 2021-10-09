const { smallUserName, smallName, weakPassword, emptyJson } = require("../../configs/errorMessages")

function isValidJsonForRegister(body) {
    let res = { "status": true, "message": [] }
    if (body == undefined || body == null || Object.keys(body).length == 0) {
        res.message.push(emptyJson)
        res.status = false
    }
    if (body.name == undefined || body.name == null || body.name.length < 3) {
        res.status = false
        res.message.push(smallName)
    }
    if (body.userName == undefined || body.userName == null || body.userName.length < 4) {
        res.message.push(smallUserName)
        res.status = false
    }
    if (body.password == undefined || body.password == null || body.password.length < 8) {
        res.status = false
        res.message.push(weakPassword)
    }
    if (res.status) {}
    return res
}
module.exports = isValidJsonForRegister