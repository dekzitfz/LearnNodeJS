var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require('mongoose'),
    app         = express();

mongoose.connect('mongodb://localhost/kucing');

var kucingSchema = new mongoose.Schema({
    nama: String,
    umur: Number,
    warna: String
});

var Kucing = mongoose.model('Kucing', kucingSchema);
Kucing.create({
    nama: "anjing",
    umur: 12,
    warna: "hitam"
}, function(error, cat){
    if(error){
        console.log(error);
    }else{
        console.log(cat);
    }
});

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