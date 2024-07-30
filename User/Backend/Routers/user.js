const express = require("express")

const {private, register,login, logout,readListPage, addBookToReadList} = require("../Controllers/user");

const { getAccessToRoute } = require("../Middlewares/Authorization/auth");

const router = express.Router() ;

router.get("/private", private)

router.post("/register",register)

router.post("/login",login)

router.post("/logout", logout)

router.post("/:slug/addBookToReadList", addBookToReadList)

router.get("/readList",getAccessToRoute ,readListPage)


module.exports = router