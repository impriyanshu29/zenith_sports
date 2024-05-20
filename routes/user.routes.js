import {Router} from 'express'
import {registerUser,updateUser,deleteUser} from "../controllers/user.controller.js"
import { verifyJWT } from '../middlewares/auth.middlewares.js';
const router = Router();


router.get("/test",registerUser)
router.post("/update/:userId",verifyJWT, updateUser)
router.delete("/delete/:userId",verifyJWT, deleteUser)

export default router;