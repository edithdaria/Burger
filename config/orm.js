//import mysql connection
let connection = require("../config/connection.js");

//helper function to create an array of questions marks
function printQuestionMarks(num) {
    let arr = [];

    for (var i = 0; i < num; i++){
        arr.push("?");
    }
    return arr.toString();
}

//helper function to convert object key/value pair to sql syntax
function objToSql(ob) {
    let arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        let value = ob[key];

        //check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotation
            if(typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            //example {devour: true} => ["devour=true"]
            arr.push(key + "=" + value);
        }
    }

    return arr.toString();
}

//object for all sql statement functions
let orm = {

    all: function(tableInput, db) {
        let queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result){
            if(err) throw err;
            db(result);
        });
    },

    create: function(table, cols, vals, db) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, result){
            if (err) throw err;
            db(result);
        });
    },

    //an example of objColVals would be {name: bison burger, devour: true}

    update: function(table, objColVals, condition, db) {
        let queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result){
            if (err) throw err;
            db(result);
        });
    }
}

// export the orm object for the model (burger.js)
module.exports = orm;