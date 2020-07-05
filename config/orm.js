const db = require( './connection.js' )

// select all from a table
function selectAll(table) {
    return db.query("SELECT * FROM ??", table)
}

// update an entry based on ID
function updateOne( id, field, value ) {
    return db.query( `UPDATE transactions SET status=? WHERE id=?`, 
        [ { [field]: value }, id ] )
}

module.exports = { selectAll, updateOne }