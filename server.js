const mysql = require("mysql");
const express = require("express");
const dotenv = require('dotenv').config()

class Database {
  constructor( config ) {
      this.connection = mysql.createConnection( config );
  }
  query( sql, args ) {
      return new Promise( ( resolve, reject ) => {
          this.connection.query( sql, args, ( err, rows ) => {
              if ( err )
                  return reject( err );
              resolve( rows );
          } );
      } );
  }
  close() {
      return new Promise( ( resolve, reject ) => {
          this.connection.end( err => {
              if ( err )
                  return reject( err );
              resolve();
          } );
      } );
  }
}

const db = new Database({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    insecureAuth : true
});

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))


app.get("/", function(req, res) {
   
})

// 
app.post("/", function(req, res) {
   
})

// Listener
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("The CRASHER'S SERVER IS NOW LIVE on: http://localhost:" + PORT);
});