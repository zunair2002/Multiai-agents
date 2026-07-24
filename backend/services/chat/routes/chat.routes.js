import express from 'express'
import {createConversation,getConversation,saveMessage,updateMessage,getMessage} from '../controller/chat.controller.js'

const router = express.Router()

router.get('/createconversation',createConversation)
router.post('/savemessage',saveMessage)
router.post('/updatessage',updateMessage)
router.get('/getconversation/:conversationId',getConversation)
router.get('/getmessage/:conversationId',getMessage)

export default router
