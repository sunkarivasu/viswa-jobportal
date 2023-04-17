const router = require('express').Router();
var User = require("../models/user.model");
var mongoose = require("mongoose"); 

router.route("/").get((req,res)=>
{
    User.find({})
    .then((user) => {res.json(user)})
    .catch((err) => {res.status(400).json("Error:"+err)});
})

router.route("/add").post((req,res) =>
{
    console.log(req.body);
    const newUser = new User(
        {
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            password:req.body.password,
            emailId:req.body.emailId,
        });
    newUser.save()
    .then(() => res.send(
        {
            success:true,
            msg:"Registered successfully",
            err:false
        }
    ))
    .catch((err) => res.send(
        {
            success:false,
            err:err,
            msg:"Error occured while registering the user."
        })
    );        
});


router.route("/login").post((req,res)=>
{
    console.log("trying to login...");
    console.log(req.body);
    User.findOne({emailId:req.body.emailId,password:req.body.password})
    .then((user) => {
        console.log("user details"+user)
        if(user==null)
        {
            res.send({
                msg:"Invalid credetnails",
                success:false,
            })
        }
        else
        {
                res.send({
                    msg:"Login success",
                    success:true,
                    user:user
                })
        }
    })
    .catch((err) =>{
        res.status(400).json(err)
    })
})

module.exports = router;