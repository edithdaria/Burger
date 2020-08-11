//import the ORM to create functions that will
//interact with the database

let orm = require("../config/orm.js");

let burger = {
    //displaying all the burger names
    all: function(db) {
        orm.all("burgers", function(res){
            db(res);
        });
    },

    create: function(cols, vals, db) {
        orm.create("burgers", cols, vals, function(res){
            db(res);
        });
    },

    update: function(objColVals, condition, db) {
        orm.update("burgers", objColVals, condition, function(res){
            db(res);
        });
    }
};

//export the database functions over to the controller
module.exports = burger;

