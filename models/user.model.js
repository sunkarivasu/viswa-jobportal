var mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
    {
        firstName:String,
        lastName:String,
        password:String,
        emailId:String,
    }
);

var User = mongoose.model("user",userSchema);

module.exports = User;