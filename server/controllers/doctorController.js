const Doctor=require('../models/doctorModel')

const getAllDoctors=async (req, res)=>
{
    try{
        const doctors=await Doctor.find()
        return res.json(doctors)
    }
    catch(error)
    {
        console.log(error)
        res.status(404).json(error)
    }
}


const getDoctorById=async (req, res)=>
{
    try{
        const doctor=await Doctor.findById(req.params.id)
        return res.json(doctor)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).json(error)
    }
}

const createDoctor=async (req, res)=>
{
    try{
        const tempDoctor=new Doctor({
            fullName: req.body.user.displayName,
            email: req.body.user.email,
            appointments:[],
            address:req.body.address,
            phone:req.body.user.phone
        })
        const savedDoctor=await tempDoctor.save()
        return res.json(savedDoctor)
    }
    catch(error)
    {
        console.log(error)
        return res.status(400).json(error)
    }
}

const loginDoctor=async (req, res)=>
{
    try{
       const docter = await Doctor.findOne({email:req.body.user.email})

       if(!docter)createDoctor(req,res);
       else res.status(200).json(docter)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).json(error)
    }
}


const deleteDoctorById=async (req, res)=>
{
    try{
        const deletedDoctor=await Doctor.findByIdAndDelete(req.params.id)
        return res.json(deletedDoctor)
    }
    catch(error)
    {
        console.log(error)
        res.status(403).json(error)
    }
}

const editDoctorById=async (req, res)=>
{
    try{
        const doctor=await Doctor.findByIdAndUpdate(req.params.id, req.body, {new: true, upsert: true})
        return res.json(doctor)
    }
    catch(error)
    {
        console.log(error)
    }
}

module.exports={getAllDoctors, getDoctorById, createDoctor, deleteDoctorById, editDoctorById, loginDoctor}