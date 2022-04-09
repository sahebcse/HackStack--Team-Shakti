const Prescription=require('../models/prescriptionModel')
const Doctor=require('../models/doctorModel')
const Patient=require('../models/patientModel')
const Appointment=require('../models/appointmentModel')
const Helper=require('../models/healthcareWorkerModel')

const createPrescription=async (req, res)=>
{
    try{
        const appointment=await Appointment.findById(req.body.appointmentId)
        const prescription=new Prescription({
            title: req.body.title,
            patient: req.body.patientId,
            doctor: req.body.doctorId,
            generalInstructions: req.body.generalInstructions,
            doctorPrescribed: req.body.doctorPrescribed,
            scanPic:req.body.scanPic,
            appointment: req.body.appointmentId
        })
        const savedPrescription=await prescription.save()
        appointment.prescription.push(savedPrescription._id)
        await appointment.save()
        res.json(savedPrescription)

    }
    catch(error)
    {
        console.log(error)
        res.status(400).json(error)
    }
}

const getPrescriptionById=async (req, res)=>
{
    try{
        const prescription=await Prescription.findById(req.params.id).populate('patient').populate('doctor')
        res.json(prescription)
    }
    catch(error)
    {
        console.log(error)
        res.status(404).json(error)
    }
}

const getPrescription=async (req, res)=>
{
    try{
        console.log("working")
        const prescription=await Prescription.find().populate('appointment')
        res.json(prescription)
    }
    catch(error)
    {
        console.log(error)
        res.status(404).json(error)
    }
}

const assignPrescription=async (req, res)=>
{
    try{
        console.log("working")
        const prescription=await Prescription.findById(req.body.id)
        const heper =await Helper.findById(req.body.helperId)
        heper.prescriptions.push(id)
        prescription.health=heper._id
        await heper.save();
        await prescription.save()
        res.json(prescription)
    }
    catch(error)
    {
        console.log(error)
        res.status(404).json(error)
    }
}

const deletePrescriptionById=async (req, res)=>
{
    try{
        const deletedPrescription=await Prescription.findByIdAndDelete(req.params.id)
        res.json(deletedPrescription)
    }
    catch(error)
    {
        console.log(error)
        res.status(403).json(error)
    }
}



module.exports={createPrescription, assignPrescription,getPrescriptionById,getPrescription, deletePrescriptionById}
