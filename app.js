var express = require("express"),
    app     = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(request, response){
    //response.render("index");
    response.send("this is index page");
});

app.listen(3000, function(){
    console.log("server starting");
});