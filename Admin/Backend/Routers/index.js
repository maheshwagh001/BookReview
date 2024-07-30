const express = require("express")

const router = express.Router()

const bookRoute = require("./book")
const categoryRoute = require("./category")

router.use("/book",bookRoute)
router.use("/category",categoryRoute)


module.exports = router