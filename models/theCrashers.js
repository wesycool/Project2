const orm = require('../config/orm')

function getTable(tableName) {
    return orm.selectAll(tableName)
}

function updateStatus (id, status) {
    return orm.updateOne( id, "status", status)
}

module.exports = { getTable, updateStatus }