const express = require("express")
const { addCategory, getCategory } = require("../Controllers/category")
const router = express.Router()

router.post("/addCategory", addCategory)
router.get("/getCategory", getCategory)

module.exports = router