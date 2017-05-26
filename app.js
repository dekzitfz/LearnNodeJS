var express = require("express"),
    app     = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(request, response){
    //redirect to /home
    response.redirect("/home");
});

app.get("/home", function(req, res){
    //render index.ejs
    res.render("index");
});

app.get("/home/new", function(req, res){
    //render new.ejs
    res.render("new");
});

app.listen(3000, function(){
    console.log("server starting");
});