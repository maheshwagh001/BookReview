const mongoose = require("mongoose");


const CategorySchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },

    book : [{
        type : mongoose.Schema.ObjectId,
        ref : "Book"
    }], 

    bookcount :{
        type : Number,
        default : 0
    }
}, { timestamps: true })

const Category = mongoose.model("Category", CategorySchema)

module.exports = Category