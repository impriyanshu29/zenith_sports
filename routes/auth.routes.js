//when a client sends a POST request to the /signup endpoint, the signup handler function will be invoked
import {Router} from 'express'
import { signin, signup ,google, logout, refreshToken } from '../controllers/auth.controller.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';
const router = Router();//
router.post('/signup',signup);
router.post('/signin',signin); 
router.post('/google',google) 
router.post('/logout',verifyJWT,logout)
router.get('/refresh',refreshToken )
//router.post(): This is defining a route for handling HTTP POST requests.
//When a client makes a POST request to the /signup endpoint, this route will be triggered.
//signup: This is the handler function that will be executed when a POST request is made to the /signup endpoint.

export default router;