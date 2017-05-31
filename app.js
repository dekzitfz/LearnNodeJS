var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require('mongoose'),
    app         = express();

mongoose.connect('mongodb://localhost/kucing');

//middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

//schema db
var myWebSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String
});
var Itempost = mongoose.model('Itempost', myWebSchema);

//insert data
// Itempost.create(
//     {
//         title: "asal post",
//         image: "http://www.photosforclass.com/download/34482054780",
//         description: "ini deskripsi"
//     },
//     function(error, item){
//         if(error){console.log(error)}
//         else{console.log(item)}
//     }
// );

// var kucingSchema = new mongoose.Schema({
//     nama: String,
//     umur: Number,
//     warna: String
// });

// var Kucing = mongoose.model('Kucing', kucingSchema);
// Kucing.create({
//     nama: "sapi",
//     umur: 22,
//     warna: "sapi"
// }, function(error, cat){
//     if(error){
//         console.log(error);
//     }else{
//         console.log(cat);
//     }
// });

//homepage
app.get("/", function(request, response){
    //redirect to /home
    response.redirect("/home");
});

app.get("/home", function(req, res){
    //get data from Itempost
    Itempost.find({}, function(err, allItems){
        if(err){
            console.log(err)
        }
        else{
            //rendex index.js and send data
            res.render("index", {items: allItems});
        }
    });
    //res.render("index");
});

app.get("/home/new", function(req, res){
    //render new.ejs
    res.render("new");
});

// app.post("/home", function(req, res){
//     var title   = req.params.title;
//     var image   = req.params.image;
//     var desc    = req.params.description;

// });

app.listen(3000, function(){
    console.log("server starting");
});