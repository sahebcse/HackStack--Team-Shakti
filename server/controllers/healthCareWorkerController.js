const HealthcareWorker=require('../models/healthcareWorkerModel')

const getAllHealthcareWorkers=async (req, res)=>
{
    try{
        const workers=await HealthcareWorker.find()
        return res.json(workers)
    }
    catch(error)
    {
        console.log(error)
        res.status(404).json(error)
    }
}

const getHealthcareWorkerById=async (req, res)=>
{
    try{
        const worker=await HealthcareWorker.findById(req.params.id)
        return res.json(worker)
    }
    catch(error)
    {
        console.log(error)
        res.status(404).json(error)
    }
}

const createHealthcareWorker=async (req, res)=>
{
    try{
        const tempPatient=new HealthcareWorker({
            fullName: req.body.user.displayName,
            email: req.body.user.email,
            prescriptions:[],
            address:req.body.address,
            phone:req.body.user.phone
        })

        const savedWorker=await tempPatient.save()
        return res.json(savedWorker)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).json(error)
    }
}

const loginHealthcareWorker=async (req, res)=>
{
    try{
       const worker = await HealthcareWorker.findOne({email:req.body.user.email})

       
       if(!worker)createHealthcareWorker(req,res);
       else res.status(200).json(worker)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).json(error)
    }
}

const deleteHealthcareWorkerById=async (req, res)=>
{
    try{
        const deletedWorker=await HealthcareWorker.findByIdAndDelete(req.params.id)
        res.json(deletedWorker)
    }
    catch(error)
    {
        console.log(error)
        res.status(403).json(error)
    }
}

const editHealthcareWorkerById=async (req, res)=>
{
    try{
        const worker=await HealthcareWorker.findByIdAndUpdate(req.params.id, req.body, {new: true, upsert: true})
        return res.json(worker)
    }
    catch(error)
    {
        console.log(error)
    }
}

module.exports={getAllHealthcareWorkers, getHealthcareWorkerById, createHealthcareWorker, deleteHealthcareWorkerById, editHealthcareWorkerById, loginHealthcareWorker}