const sql = require("./connection")
const { main_table, temp_table } = require("../configs/db")
const createHashForPass = require("../template/bcryptHash")
const uuid = require('../template/uuid');

function find_with_username(username) {
    return new Promise((resolve, reject) => {
        //To avoding sql injection escape is used
        const escapedQuery = `select userName from ${main_table} where userName=` + sql.escape(username)
        sql.query(escapedQuery, (e, r) => {
            if (e)
                reject(e)
            else {
                if (r.length)
                    resolve(true)
                else
                    resolve(false)
            }
        })
    })
}

function save_into_temp(authData, otp, publicKey, cookie_token) {
    return new Promise((resolve, reject) => {

        //                                        insert into temp(name,otp,userName,password) values ("thunder","1234","123@gmail.com","123454")
        const escapedQuery = `insert into ${temp_table}(name,userName,password,githubId,linkedInId,otp,publicKey,cookie_token,time) values (` + sql.escape(authData.name) + ',' + sql.escape(authData.userName) + ',' + sql.escape(authData.password) + ',' + sql.escape(authData.githubId) + ',' + sql.escape(authData.linkedInId) + ',' + otp + ',' + sql.escape(publicKey) + ',' + sql.escape(cookie_token) + ',now())'

        sql.query(escapedQuery, (e, r) => {
            if (e)
                reject(e)
            else {
                resolve(true)
            }
        })
    })



}

function verifyEmailWithOtp(publicKey, cookie_token, otp) {
    return new Promise((resolve, reject) => {

        //                                        insert into temp(name,otp,userName,password) values ("thunder","1234","123@gmail.com","123454")
        const escapedQuery = 'select * from temp where publicKey=' + sql.escape(publicKey) + ' AND cookie_token=' + sql.escape(cookie_token) + 'AND UNIX_TIMESTAMP(now())-UNIX_TIMESTAMP(time)<121'

        sql.query(escapedQuery, async(e, r) => {
            if (e)
                reject(e)
            else {
                if (r.length == 1) {
                    if (r[0].otp == otp) {
                        const password = await createHashForPass(r[0].password)
                        try {
                            await storeInUsersTable(r[0], password)
                            await deleteTempById(r[0].id)
                            resolve({ "status": true, "res": r[0].userName })
                        } catch (e) {
                            reject(e)
                        }

                    } else {
                        await deleteTempById(r[0].id)
                        resolve({ "status": false, "res": "Wrong otp" })
                    }
                } else {
                    resolve({ "status": false, "res": "INVALID PARAMS" })
                }
            }
        })
    })
}

function storeInUsersTable(data, password) {
    return new Promise((resolve, reject) => {
        const escapedQuery = 'insert into users (name,id,userName,password,githubId,linkedInId) values (' + sql.escape(data.name) + ',UUID_TO_BIN(UUID()),' + sql.escape(data.userName) + ',' + sql.escape(password) + ',' + sql.escape(data.githubId) + ',' + sql.escape(data.linkedInId) + ')'
        sql.query(escapedQuery, (e, r) => {
            if (e)
                reject(e)
            else {
                resolve(true)
            }
        })
    })
}

function deleteTempById(id) {
    return new Promise((resolve, reject) => {
        const delete_query = `delete from temp where id=${id}`
        sql.query(delete_query, (e, r) => {
            if (e)
                reject(e)
            else
                resolve(true)
        })
    })
}
module.exports = { find_with_username, save_into_temp, verifyEmailWithOtp }