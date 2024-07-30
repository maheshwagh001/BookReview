const express = require("express")

const router = express.Router()

const userRoute = require("./user")
const bookRoute = require("./book")
const commentRoute = require("./comment")

router.use("/user",userRoute)
router.use("/book",bookRoute)
router.use("/comment",commentRoute)


module.exports = router