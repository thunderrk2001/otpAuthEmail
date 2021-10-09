const mysql = require("mysql")

var db_config = {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
}
var pool = mysql.createPool(db_config)
module.exports = pool