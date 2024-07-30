const asyncErrorWrapper = require("express-async-handler")
const Story = require("../Models/book.js");
const Category = require("../Models/Category.js");

const imageUpload = require("../Helpers/Libraries/imageUpload.js");


const addBook = asyncErrorWrapper(async  (req,res)=> {

    const {category, title, author, intro,  pages} = req.body 
    console.log(req.body)


    try {
        
        
        const cat = await Category.findOne({
            name : category
        })
        
        const upload = await imageUpload.uploadFile(req.file.path);
        const newBook = await Story.create({
            category : category,
            title : title,
            author : author,
            intro : intro,
            image : upload.secure_url,
            pages : pages
        })
        
        cat.book.push(newBook._id)
        cat.bookcount = cat.book.length
        await cat.save()


        return res.status(200).json({
            success :true ,
            message : "Book added successfully ",
            data: newBook
        })
    }

    catch(error) {

        // deleteImageFile(req)
        console.log(error)

        return (error)
        
    }
  
})



module.exports ={
    addBook
}