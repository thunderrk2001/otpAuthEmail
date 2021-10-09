const mysql = require("mysql")
require("dotenv").config()
var db_config = {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database,
    }
    //create different module for sql queries with promises implementaon
var pool = mysql.createPool(db_config)
    /*connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);
    });
    /*table name :users
    UUID_TO_BIN(UUID()) stroting as id in table
    BIN_TO_UUID
    where id=UUID_TO_BIN(UUID("def44797-1930-11ec-b552-cecd029e558e"))
    update users set githubId="https://github.io" where name="thunder"
    insert into users (name,id,userName,password) values ("thunder",UUID_TO_BIN(UUID()),"123@gmail.com","123454")
    */

//var query = 'select * from otpUsers where name= ' + pool.escape(n) + 'And password= ' + pool.escape(pass)
//create table temp( id INT UNSIGNED NOT NULL AUTO_INCREMENT primary key,name varchar(40) not null,userName varchar(40) not null,password varchar(40) not null,githubId varchar(120),linkedInId varchar(120),otp INT check(otp>999 && otp<10000))
//alter table temp add column cookie_token varchar(255) NOT NULL
//alter table temp add column publicKey varchar(255) NOT NULL
pool.query(`select * from users`, (e, r) => {
    if (e)
        console.log(e)
    console.log(r)
        /*select UNIX_TIMESTAMP(timestamp) from otpUsers
            var d = new Date()
                console.log(d.getUTCHours())
                console.log(d.getUTCMinutes())
                console.log(d.getUTCSeconds())
        console.log(d.getUTCHours(), d.getMinutes(), d.getSeconds(), d.getFullYear())*/

})