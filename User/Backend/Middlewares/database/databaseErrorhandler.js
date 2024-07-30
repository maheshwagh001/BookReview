const asyncErrorWrapper = require("express-async-handler")
const Book = require("../../Models/book")
const Comment = require("../../Models/comment")


const checkBookExist = asyncErrorWrapper(async (req,res,next) => {
  
    const {slug} = req.params  ;
    const book = await Book.findOne({
      slug : slug
    })

    if(!book) {
        return next(new CustomError("There is no such book with that slug ",400))
    }

    next() ; 

})



const checkCommentExist = asyncErrorWrapper(async (req,res,next) => {
  
    const {comment_id} = req.params  ;
    const comment = await Comment.findById(comment_id)

    if(!comment) {
        return next(new CustomError("There is no such comment exist ",400))
    }
    
    next() ; 

})



module.exports ={
    checkBookExist,
    checkCommentExist,
}
