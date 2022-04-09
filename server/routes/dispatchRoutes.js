const express=require('express')
const router=express.Router()

const {createDispatch, getDispatchById, editDispatchById, getDispatchesByHelperId}=require('../controllers/dispatchController')

router.post('/dispatch', createDispatch)

router.get('/dispatch/:id', getDispatchById)

router.put('/dispatch/:id', editDispatchById)

router.get('/dispatches/:userId', getDispatchesByHelperId)

module.exports=router