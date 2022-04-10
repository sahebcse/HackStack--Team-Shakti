const express=require('express')
const router=express.Router()
const { add,getChats }=require('../controllers/chatController');

router.post('/chat/add',add);
router.get('/chat/get/:appointmentId',getChats);

module.exports=router