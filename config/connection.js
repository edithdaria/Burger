//setup connection to mysql

var mysql = require("mysql");
var connection;

//connection when deployed in heroku
if (process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'burgers_db'
    });
};

connection.connect(function(err) {
    if (err){
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connection as id: " + connection.threadId);
});

//export connection for our ORM to use
module.exports = connection;