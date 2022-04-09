const express=require('express')
const router=express.Router()

const {getAllHealthLogs, getHealthLogById, createHealthLog, deleteHealthLogById}=require('../controllers/healthLogController')

router.get('/healthlogs', getAllHealthLogs)

router.get('/healthlog/:id', getHealthLogById)

router.post('/healthlog', createHealthLog)

router.delete('/healthlog/:id', deleteHealthLogById)

module.exports=router