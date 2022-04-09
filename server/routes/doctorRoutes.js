const express=require('express')
const router=express.Router()

const {getAllDoctors, getDoctorById, createDoctor, deleteDoctorById, editDoctorById,loginDoctor}=require('../controllers/doctorController')

router.get('/doctors', getAllDoctors)

router.get('/doctor/:id', getDoctorById)

router.post('/doctor', createDoctor)

router.post('/doctor/login', loginDoctor)

router.delete('/doctor/:id', deleteDoctorById)

router.put('/doctor/:id', editDoctorById)

module.exports=router