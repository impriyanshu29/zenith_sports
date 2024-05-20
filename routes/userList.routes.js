import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middlewares.js';
import { userLists,isAdmin,deleteUser } from '../controllers/userLists.controllers.js';
const router = Router();

router.get('/getUserList', verifyJWT,userLists)
router.put('/updateAdmin/:userId',verifyJWT,isAdmin)
router.delete('/deleteUser/:userId',verifyJWT,deleteUser)
export default router;