var express = require("express"),
    app     = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(request, response){
    response.render("index");
});

app.listen(3000, function(){
    console.log("server starting");
});