const bcrypt = require("bcrypt")

function createHashForPass(pass) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(pass, 10, (e, hashed_pass) => {
            if (e)
                reject(e)
            else
                resolve(hashed_pass)
        })
    })
}
module.exports = createHashForPass