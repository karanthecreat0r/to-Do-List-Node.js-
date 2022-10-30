const express =require("express");
const bodyParser = require("body-parser");
const { render } = require("ejs");


const app= express();

let items=[];
let workItems=[];
app.set('view engine', "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

app.get("/",function(req,res){
    let today = new Date();
    let options={
        weekday: "long",
        day:"numeric",
        month:"long"
    };
    let day = today.toLocaleDateString("en-US",options)
    
    res.render("lists",{listTitle:day,newlistitems:items});

});

app.post("/",function(req,res){
    item = req.body.newitem
    if (req.body.list==="work") {
        workItems.push(item)
        res.redirect("/work");
    }else{
        items.push(item)
        res.redirect("/");
    }
    
    
    
})

app.get("/work",function(req,res){
    res.render("lists",{listTitle:"work List",newlistitems: workItems})
})

app.post("/work",function(req,res){
    let item =req.body.newitem
    workItems.push(item);
    res.redirect("/work")
})

app.get("/about",function(req,res){
    res.render("about")
})


app.listen(3000,function(){
    console.log("Server running on port 3000")
})