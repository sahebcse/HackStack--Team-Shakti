const HealthLog=require('../models/healthLogModel')
const Patient=require('../models/patientModel')
const Prescription = require('../models/prescriptionModel')

const getAllHealthLogs=async (req, res)=>
{
    try{
        const logs=await HealthLog.find().populate('patient').populate('doctor').populate('prescription')
        res.json(logs)
    }
    catch(error)
    {
        console.log(error)
        res.status(404).json(error)
    }
}

const getHealthLogById=async (req, res)=>
{
    try{
        const log=await HealthLog.findById(req.params.id).populate('patient').populate('doctor').populate('prescription')
        res.json(log)
    }
    catch(error)
    {
        console.log(error)
        res.status(404).json(error)
    }
}

const createHealthLog=async (req, res)=>
{
    try{
        console.log(req.body)
        const patient=await Patient.findById(req.body.patientId)
        const prescription=await Prescription.findById(req.body.prescriptionId)
        if (patient)
        {
            console.log("This starts running")
            const log=new HealthLog({
                patient: patient._id,
                doctor: req.body.doctorId,
                notes: req.body.notes,
                height: req.body.height,
                weight: req.body.weight,
                prescription: req.body.prescriptionId,
                visitPurpose: req.body.visitPurpose
            })

            const savedLog=await log.save()
            await patient.healthLogs.addToSet(savedLog._id)
            await patient.save()
            res.json(savedLog)

        }
    }
    catch(error)
    {
        console.log(error)
        res.status(400).json(error)
    }
}

const deleteHealthLogById=async (req, res)=>
{
    try{
        const deletedLog=await HealthLog.findByIdAndDelete(req.params.id)
        const patient=await Patient.findById(req.body.patientId)
        await patient.healthLogs.pull(deletedLog._id)
        const updatedPatient=await patient.save()
        res.json(updatedPatient)
    }
    catch(error)
    {
        console.log(error)
        res.status(403).json(error)
    }
}



module.exports={createHealthLog, getHealthLogById, getAllHealthLogs, deleteHealthLogById}