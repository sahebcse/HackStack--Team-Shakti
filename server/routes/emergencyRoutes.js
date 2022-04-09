const express=require('express')
const router=express.Router()

const {getEmergencyByPincodeAndStatus, getAllEmergencies, createEmergency, getBookedEmergenciesByPatient, getEmergenciesByPatient} = require('../controllers/emergencyController')

router.get('/emergency/:pincode/:status', getEmergencyByPincodeAndStatus)

router.get('/emergency/all', getAllEmergencies)

router.post('/emergency', createEmergency)

router.get('/allemergencies/patient/:patientId', getEmergenciesByPatient)

router.get('/allemergencies/patient/:patientId', getBookedEmergenciesByPatient)
//PUT, GET and DELETE Routes will be same for appointment and emergencies

module.exports=router