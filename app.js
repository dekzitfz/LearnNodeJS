var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require('mongoose'),
    method      = require('method-override'),
    app         = express();

//mongoose.connect('mongodb://localhost/kucing');
mongoose.connect('mongodb://dekz:qwerty123@ds157971.mlab.com:57971/nodedb');

//middleware
app.use(method("_method"));
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
//         title: "asal post 2",
//         image: "http://www.photosforclass.com/download/34482054780",
//         description: "ini deskripsi 2"
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

//create route
app.post("/home", function(req, res){
    //get value from new.ejs
    var title       = req.body.title;
    var image       = req.body.image;
    var description = req.body.description;

    //create object
    var newPost = {title: title, image: image, description: description};

    //send object
    Itempost.create(newPost, function(err, newPost){
        if(err){
            console.log(err);
        }else{
            //redirect after success
            res.redirect("/");
        }
    });
});

//update route
app.put("/home/:id", function(req, res){
    Itempost.findByIdAndUpdate(req.params.id, req.body.item, function(err, updateItem){
        if(err){
            console.log(err);
        }else{
            console.log(req.body.item);
            res.redirect(req.params.id);
        }
    });
});

//delete route
app.delete("/home/:id", function(req, res){
    Itempost.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/home");
        }
    });
});


//show route
app.get("/home/:id", function(req, res){
    Itempost.findById(req.params.id, function(err, foundItem){
        if(err){
            console.log(err);
        }else{
            res.render("show", {item: foundItem});
        }
    });
});

//edit route
app.get("/home/:id/edit", function(req, res){
    Itempost.findById(req.params.id, function(err, foundItem){
        if(err){
            console.log(err);
        }else{
            res.render("edit", {item: foundItem});
        }
    });
});

app.listen(3000, function(){
    console.log("server starting");
});