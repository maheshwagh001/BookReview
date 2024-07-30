
const mongoose = require("mongoose")
const slugify = require("slugify")

const BookSchema = new mongoose.Schema({

    category: {
        type: String,
        required: true
    },

    slug: String,
    title: {
        type: String,
        required: [true, "Please provide a title"],
        unique: true
    },
    author : {
        type: String,
        required: [true, "Please a provide a author "]
    },
    intro : {
        type : String,
        required : true
    },
    image: {
        type: String,
        required : true
    },
    pages: {
        type: Number,
        required : true
    },
    
    comments: [{
            type: mongoose.Schema.ObjectId,
            ref: "Comment"
    }],
    commentCount: {
        type: Number,
        default: 0
    },
    rating : {
        type : Number,
        default : 0
    }


}, { timestamps: true })

BookSchema.pre("save", async function (next) {

    if (!this.isModified("title")) {
        next();
    }


    this.slug = this.makeSlug()

    next()

})


BookSchema.methods.makeSlug = function () {
    const str = this.title +" "+ this.author;
    return slugify(str, {
        replacement: '-',
        remove: /[*+~.()'"!:@/?]/g,
        lower: true,
        strict: false,
        locale: 'tr',
        trim: true
    })

}

const Book = mongoose.model("Book", BookSchema)

module.exports = Book;