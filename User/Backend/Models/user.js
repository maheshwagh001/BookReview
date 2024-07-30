
const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({

    username : {
        type :String,
        required : [true ,"Please provide a username"],
        unique : true
    },
    
    password : {
        type:String,
        minlength: [6, "Please provide a password with min length : 6 "],
        required: [true, "Please provide a password"]
    },
    
    readList : [{
        type : mongoose.Schema.ObjectId, 
        ref : "Story"
    }],
    readListLength: {
        type: Number,
        default: 0
    }


},{timestamps: true})


const User = mongoose.model("User",UserSchema)

module.exports = User  ;