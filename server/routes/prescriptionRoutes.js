const express=require('express')
const router=express.Router()

const {getPrescriptionById, createPrescription, deletePrescriptionById, getPrescription, assignPrescription} = require('../controllers/prescriptionController')

router.get('/prescription/:id', getPrescriptionById)

router.get('/prescription', getPrescription)

router.post('/prescription', createPrescription)

router.post('/assignprescription', assignPrescription)

router.delete('/prescription/:id', deletePrescriptionById)

module.exports=router