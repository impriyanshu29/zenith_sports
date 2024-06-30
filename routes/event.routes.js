import {Router} from 'express'

import { verifyJWT } from '../middlewares/auth.middlewares.js'
import { createEvent, getEvent,deleteEvent,updateEvent, oneEvent } from '../controllers/event.controller.js'
const router = Router()

router.post('/createEvent', verifyJWT, createEvent)
router.get('/getEvent', getEvent)
router.delete('/deleteEvent/:userId/:eventId',verifyJWT, deleteEvent)
router.patch('/updateEvent/:userId/:eventId',verifyJWT, updateEvent)
router.get('/oneEvent/:eventId',oneEvent)

export default router;