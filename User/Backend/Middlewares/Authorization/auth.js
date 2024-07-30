const User = require("../../Models/user")
const asyncErrorWrapper =require("express-async-handler")


const getAccessToRoute = asyncErrorWrapper(async(req,res,next) =>{

    if (!req.session.user.id) {
        return res.status(401).send('Unauthorized');
    }
    next();

})




module.exports ={getAccessToRoute}