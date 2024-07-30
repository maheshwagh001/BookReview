const asyncErrorWrapper = require("express-async-handler")
const Book = require("../Models/book");
const Comment = require("../Models/comment");
const path = require("path");

const addNewCommentTobook  =asyncErrorWrapper(async(req,res,next)=> {

    const {slug} = req.params 

    const { content, star } = req.body 

    const book = await Book.findOne({slug :slug })

    const comment = await Comment.create({

        book :book._id ,
        content :content ,
        author : req.session.user.id ,
        star : star
    })

    book.comments.push(comment._id)

    book.commentCount = book.comments.length

    book.rating = ((book.rating * (book.commentCount -1)) + star) / (book.commentCount) 

    await book.save();

    return res.status(200).json({
        success :true  , 
        data : comment 
    })

})


const getAllCommentBybook = asyncErrorWrapper(async(req, res, next) => {

    const { slug } = req.params

    const book = await Book.findOne({slug:slug})
    if (!book) {
        return res.status(404).json({
            success: false
        });
    }

    const commentList = await Comment.find({ book: book._id })
        .sort("-createdAt")
        .populate({ path: "author", select: "username" });
        // console.log(commentList)

    return res.status(200)
        .json({
            success: true,
            count: book.commentCount,
            data: commentList
        })

})


const deleteComment  =asyncErrorWrapper(async(req,res,next)=>{

    const {comment_id} = req.params  ;

    const comment = await Comment.findById(comment_id);

    const book = await Book.findById(comment.book);

    if(book.commentCount === 1){
        book.rating = 0;
    }
    else{
        book.rating = ((book.rating * book.commentCount - comment.star) / (book.commentCount - 1))
    }

    const index = book.comments.indexOf(comment_id);
    book.comments.splice(index, 1);
    book.commentCount = book.comments.length;
    await book.save()  ;
    await Comment.findByIdAndDelete(comment_id);


    return res.status(200).
        json({
            success:true,
            message : "Comment deleted succesfully "
    })

})

module.exports ={
    addNewCommentTobook,
    getAllCommentBybook,
    deleteComment
}