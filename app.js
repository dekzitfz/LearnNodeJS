var express = require("express"),
    app     = express();

app.get("/", function(request, response){
    response.send("this is home page");
});

app.listen(3000, function(){
    console.log("server starting");
});