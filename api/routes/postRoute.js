import express from 'express'
import { verifyToken } from '../utils/verifyToken.js'
import { create, deletePost, getPosts, updatepost } from '../controllers/postController.js'


const router = express.Router()

router.post("/create" , verifyToken ,create )
router.get("/getposts" , getPosts)
router.delete("/deletepost/:postId/:userId" , verifyToken , deletePost)
router.put("/updatepost/:postId/:userId" , verifyToken ,updatepost )

export default router