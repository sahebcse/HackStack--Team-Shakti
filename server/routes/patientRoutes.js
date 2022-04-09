const {getAllPatients, getPatientById, createPatient, editPatient, deletePatientById, loginPatient}=require('../controllers/patientController')
const express=require('express')
const router=express.Router()



router.get('/patients', getAllPatients)

router.get('/patient/:id', getPatientById)

router.post('/patient', createPatient)

router.post('/patient/login', loginPatient)

router.put('/patient/:id', editPatient)

router.delete('/patient/:id', deletePatientById)

module.exports=router

