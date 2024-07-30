const express = require("express")

const {detailBook, getAllBooks } = require("../Controllers/book")
const { checkBookExist} = require("../Middlewares/database/databaseErrorhandler");

const router = express.Router() ;

router.post("/:slug", checkBookExist, detailBook)

router.get("/getAllBooks",getAllBooks)


module.exports = router
