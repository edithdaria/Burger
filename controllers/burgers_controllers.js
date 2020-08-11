let express = require("express");

// setting up server
let router = express.Router();

//import the model (burger.js) to use its database functions
let burger = require("../models/burger.js");


//create the routes and setup logic for those routes where required

//display all burger names on the first page
router.get("/", function(req, res) {
    burger.all(function(data) {
        let hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req, res){
    burger.create(["burger_name"], [req.body.burger_name], function(result){

        //send back the ID of the new entry
        res.json({id: result.insertId });
    });
});

router.put("/api/burgers/:id", function(req, res) {

    let condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update(
        {
            //devoured: req.body.devoured
            devoured: "true"
        },
        condition,
        function(result){
        if(result.changedRows === 0) {
            // if no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        }
        res.status(200).end();
    }
    );
});

// export routes for server.js to use.
module.exports = router;