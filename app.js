var express     = require("express"),
    bodyParser  = require("body-parser"),
    app         = express();

app.use(bodyParser.urlencoded({extended: true}));
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

app.post("/home", function(req, res){
    var title   = req.params.title;
    var image   = req.params.image;
    var desc    = req.params.description;
    
});

app.listen(3000, function(){
    console.log("server starting");
});