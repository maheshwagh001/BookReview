const asyncErrorWrapper = require("express-async-handler")
const Category = require("../Models/Category.js");
const Book = require("../Models/book.js");

const addCategory = asyncErrorWrapper(async  (req,res)=> {

    const {name} = req.body 

    try {

        const newCategory = await Category.create({
            name : name
        })

        return res.status(200).json({
            success :true ,
            message : "Category added successfully ",
            data: newCategory
        })
    }

    catch(error) {

        return (error)
        
    }
  
})

const getCategory = asyncErrorWrapper(async (req,res,next) => {
    const category = await Category.find()
    console.log(category)
    const options = []


    for(let index = 0; index < category.length ; index ++){

        var opn = await category[index];
        options.push(opn.name);

    }

    return res.status(200).json({
        success: true,
        data: options
    })
})



module.exports ={
    addCategory,
    getCategory
}