const expresss=require('express')
const router=expresss.Router()

const {getAllHealthcareWorkers, getHealthcareWorkerById, createHealthcareWorker, deleteHealthcareWorkerById, editHealthcareWorkerById, loginHealthcareWorker}=require('../controllers/healthCareWorkerController')

router.get('/healthcareworkers', getAllHealthcareWorkers)

router.get('/healthcareworker/:id', getHealthcareWorkerById)

router.post('/healthcareworker', createHealthcareWorker)

router.post('/healthcareworker/login', loginHealthcareWorker)

router.delete('/healthcareworker/:id', deleteHealthcareWorkerById)

router.put('/healthcareworker/:id', editHealthcareWorkerById)

module.exports=router