const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Book"
    },
    content: {
        type: String,
        required: [true, "Please provide a content"],
        minlength: [3, " Please provide a content least 3 characters"]
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    star : {
        type : Number,
        required : true
    }

}, { timestamps: true })


const Comment = mongoose.model("Comment", CommentSchema)

module.exports = Comment;