const express = require("express")

const { getAccessToRoute } = require("../Middlewares/Authorization/auth");

const { addNewCommentTobook ,getAllCommentBybook, deleteComment} = require("../Controllers/comment")

const { checkCommentExist } = require("../Middlewares/database/databaseErrorhandler");

const router = express.Router() ;


router.post("/:slug/addComment",[getAccessToRoute] ,addNewCommentTobook)

router.get("/:slug/getAllComment",getAllCommentBybook)

router.delete("/:comment_id/delete",[getAccessToRoute, checkCommentExist] ,deleteComment)


module.exports = router