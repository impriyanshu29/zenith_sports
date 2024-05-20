import {Router} from 'express'

import { verifyJWT } from '../middlewares/auth.middlewares.js'
import createpost from '../controllers/createpost.controller.js'
import getpost from '../controllers/getpost.controller.js'
import deletePost from '../controllers/deletePost.controller.js'
import editPost from '../controllers/editPost.controllers.js'

const router = Router()

router.post('/createpost', verifyJWT, createpost)
router.get('/getpost', getpost)
router.delete('/deletePost/:postId/:userId',verifyJWT,deletePost)
router.put('/editPost/:postId/:userId',verifyJWT,editPost)

export default router;