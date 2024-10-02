import express from "express"
const router = express.Router()
import {verifyToken} from "../utils/verifyToken.js"
import { createComment, deletecomment, editcomment, getAllComments,getComments,likecomment } from "../controllers/commentController.js"

router.post("/create" , verifyToken ,createComment )
router.get("/getPostComments/:postId" ,getComments )
router.put("/likecomment/:commentId" , verifyToken , likecomment)
router.put("/editcomment/:commentId" , verifyToken ,editcomment)
router.delete("/deletecomment/:commentId" , verifyToken ,deletecomment)
router.get("/getcomments" ,verifyToken , getAllComments)
export default router