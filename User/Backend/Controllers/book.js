const asyncErrorWrapper = require("express-async-handler")
const User = require("../Models/user.js");
const {searchHelper} =require("../Helpers/query/queryHelpers.js");
const Book = require("../Models/book.js");


const getAllBooks = asyncErrorWrapper( async (req,res,next) =>{

    let query = Book.find();

    query =searchHelper("slug",query,req)

    query = query.sort("-likeCount -commentCount -createdAt")

    const stories = await query
    
    return res.status(200).json(
        {
            success:true,
            // count : stories.length,
            data : stories ,
            // page : paginationResult.page ,
            // pages : paginationResult.pages
        })

})

const detailBook =asyncErrorWrapper(async(req,res,next)=>{

    const {slug}=req.params ;

    const book = await Book.findOne({
        slug: slug 
    })


    return res.status(200).
        json({
            success:true,
            data : book,
        })

})



module.exports ={
    getAllBooks,
    detailBook
}