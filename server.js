let express = require("express");
const e = require("express");

let PORT = process.env.PORT || 3000;

let app = express();

// serve static content for the app from the "public" directory in
// the application directory.
app.use(express.static("public"));

// parse request body as JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//set handlebars
let exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//import routes and give the server access to them.
let routes = require("./controllers/burgers_controllers.js");

app.use(routes);

app.listen(PORT, function(){
    console.log("App now listening at localhost: " + PORT);
})