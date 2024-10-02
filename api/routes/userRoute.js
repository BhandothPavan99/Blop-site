import express from 'express' 
import { deleteUser, getUser, getusers, signOut, updateUser, Users } from '../controllers/userController.js'
import { verifyToken } from '../utils/verifyToken.js'
const router = express.Router() 
 
router.get('/user' , Users)
router.put('/update/:userId' , verifyToken , updateUser)
router.delete("/delete/:userId" , verifyToken, deleteUser)
router.post("/signout" , signOut)
router.get("/getusers" , verifyToken,getusers)
router.get("/user/:userId"  , getUser)
export default router