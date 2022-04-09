const Patient=require('../models/patientModel')

const createPatient=async (req, res)=>
{
    try{
        const tempPatient=new Patient({
            fullName: req.body.user.displayName,
            email: req.body.user.email,
            healthLogs: [],
            appointments:[],
            address:req.body.address?req.body.address:{},
            phone:req.body.user.phone
        })

        const savedPatient=await tempPatient.save()

        return res.json(savedPatient)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).json(error)
    }
}

const loginPatient=async (req, res)=>
{
    try{

        const worker = await Patient.findOne({email:req.body.user.email})
        console.log("worker",worker)

       if(!worker)createPatient(req,res);
       else res.status(200).json(worker)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).json(error)
    }
}

const getPatientById=async (req, res)=>
{
    try{
        const patient=await Patient.findById(req.params.id).populate('healthLogs').populate('appointments')
        return res.json(patient)
    }
    catch(error)
    {
        console.log(error)
        res.status(404).json(error)
    }
}


const getAllPatients=async (req, res)=>
{
    try{
        const patients=await Patient.find()
        return res.json(patients)
    }
    catch(error)
    {
        console.log(error)
        res.status(404).json(error)
    }
}

const deletePatientById=async (req, res)=>
{
    try{
        const deletedPatient=await Patient.findByIdAndDelete(req.params.id)
        return res.json(deletedPatient)
    }
    catch(error)
    {
        console.log(error)
        res.status(403).json(error)
    }
}


const editPatient=async (req, res)=>
{
    try{
        const patient=await Patient.findByIdAndUpdate(req.params.id, req.body, {new: true, upsert: true})
        return res.json(patient)
    }
    catch(error)
    {
        console.log(error)
    }
}
module.exports={createPatient, getPatientById, getAllPatients, deletePatientById, editPatient, loginPatient}

