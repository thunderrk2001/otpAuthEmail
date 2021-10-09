const tableConfig = require("../../configs/db")

function getOnlyTableAttributesData(data) {
    const attributes = tableConfig.userAttributes
    let result = {}
    attributes.forEach((key) => {
        if (data[key] != undefined) {
            result[key] = data[key]

        } else
            result[key] = null
    })
    return result
}


module.exports = { getOnlyTableAttributesData }