const express=require('express')
const router=express.Router()

const {getAppointmentById, getAllAppointments,getDoctorBookedAppointments, confirmAppointment, getNearbyPatients, getAppointmentsByPincode, createAppointment, getAppointmentsByPincodeAndStatus, editAppointment, deleteAppointmentById, getAppointmentsByPatient, getBookedAppointmentsByPatient}=require('../controllers/appointmentController')

router.get('/appointments/:pincode/:status', getAppointmentsByPincodeAndStatus)

router.get('/appointments/all', getAllAppointments)

//router.get('/appointments/all/:pincode', getAllAppointmentsByPincode)

router.get('/appointments/:pincode', getAppointmentsByPincode)

router.post('/appointment', createAppointment)

router.put('/appointment/:id', editAppointment)

router.get('/appointment/:id', getAppointmentById)

router.delete('/appointment/:id', deleteAppointmentById)

router.get('/allappointments/patient/:patientId', getAppointmentsByPatient)

router.get('/allappointments/patient/:patientId', getBookedAppointmentsByPatient)

router.get('/doctorAppointments/:id/:status',getDoctorBookedAppointments)

router.post('/confirmAppointment', confirmAppointment)

router.post('/nearby/patients/:range', getNearbyPatients)

module.exports=router