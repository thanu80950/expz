var express=require('express');
var app=express();

//require mongoose
var  mongoose=require('mongoose');
//require body parser
var bodyParser=require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//make connection to mongodb there postdbapp is database name
mongoose.connect("mongodb://localhost:27017/postdbapp",{useNewUrlParser:true});
//create schema for database
var postschema=new mongoose.Schema({
    title:String,
    description:String
});
var pdata=mongoose.model("pdata",postschema,"pdata");

//call index.html
app.get('/',(req,res)=>{
   // console.log("this is my call");
   res.sendfile(__dirname+"/index.html");
   // next();
})

//adding post route to save data in database
app.post('/addpost',(req,res)=>{
    var myData=new pdata(req.body);
    myData.save()
    .then(item=>{
        res.send("title and desrciption saved to databse");
    })
    .catch(err=>{
        res.status(400).send("sving data failed");
    });
});

/*app.get('/',(req,res)=>{
    console.log("this is me");
})*/


app.listen(3000,()=>{
    console.log("server started successfully at port 3000")
})