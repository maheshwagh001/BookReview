const express = require("express")
const {addBook} = require("../Controllers/book")

const router = express.Router() ;

const multer = require('multer');

var uploader = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 1000000 }
});

router.post("/addBook" ,[uploader.single("image")],addBook)



module.exports = router