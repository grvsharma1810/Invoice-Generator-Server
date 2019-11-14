var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/public',express.static('public'));
app.set("view engine","ejs");

items = {}
obj1 = {
    name : "Gaurav Kumar Sharma",
    sentFrom : "Server",
    msg : "Index Page",
    time : new Date().toLocaleTimeString()
}

obj2 = {
    name : "Gaurav Sharma",
    sentFrom : "Server",
    msg : "Error 404",
    time : new Date().toLocaleTimeString()
}
var orgName = ""
var address = ""

//Items will be added here
app.post("/additems",function(req,res){
    console.log(req.body);
    /*obj = {
        name : req.body.name,        
        quantity : req.body.quantity,        
        amount : req.body.amount,
        rate : req.body.rate
    }*/
    items = req.body
    res.json(req.body);
})

// temporary route
app.post("/temp",function(req,res){
    console.log("Organization name is " + req.body.orgName);
    console.log("Address is " + req.body.address);
    obj = {
        orgName : req.body.orgName,
        address : req.body.address
    }
    orgName = req.body.orgName,
    address = req.body.address        
    res.json(obj);    
    //res.redirect("/save");
    //res.end()
    //res.render("canvas",{obj : obj})
})

app.get("/index",function(req,res){
    res.json(obj1);
    console.log(obj1);
})

app.get("/save",function(req,res){
    res.render("canvas",{orgName : orgName,address:address,items:items});
})

app.post("/savetodatabase",function(req,res){
    //console.log(req.body);
    obj1.msg = req.body.imgURL;
    res.redirect("/");
})

app.get("*",function(req,res){
    res.send("PAGE RENDERED!!, Go Back and save it.");
})

app.listen(8000,function(){
    console.log("Server Started at port 8000");
})