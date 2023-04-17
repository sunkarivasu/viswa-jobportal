require("dotenv").config();
var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
PORT = process.env.PORT || 9001;
var app = express();
var cors =require("cors");
var path = require("path");
var fs = require("fs");

// mongoose.connect("mongodb://localhost:27017/jobPortalDB",function(err)
// {
//     if(err)
//         console.log("error"+err);
//     else
//         console.log("connected");
// });

// mongoose.connect(process.env.URI,{useNewUrlParser:true},(err) =>{
//     if(err)
//         console.log("Error while connecting to database:"+err);
//     else
//         console.log("conneted to database")
// });

mongoose.connect('mongodb+srv://viswanadhamandala:8500890317@cluster0.jaa5mqp.mongodb.net/jobPortalDB?retryWrites=true&w=majority',{useNewUrlParser:true},(err) =>{
    if(err)
        console.log("Error while connecting to database:"+err);
    else
        console.log("conneted to database")
});

var usersRouter = require("./routes/users");


app.use(cors());
app.use(express.json())
app.use("/users",usersRouter);


if (process.env.NODE_ENV === 'production') {
    // Set Static Folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
};

app.get("/",(req,res) =>
{
    return res.send({
        success:"true"
    })
})

app.use(express.static(path.resolve('client', 'build')));
// if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.resolve('client', 'build', 'index.html'));
    });
// }
app.listen(PORT,console.log(`server is up and runnning on port ${PORT}`));
