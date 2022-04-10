const Dispatch=require('../models/dispatchModel')
const Appointment=require('../models/appointmentModel')

const createDispatch=async (req, res) =>
{
    try{
        const appointment=await Appointment.findById(req.body.appointmentId)
        console.log(appointment)
        const tempDispatch=new Dispatch({
            startLat: appointment.helperLatitude,
            startLong: appointment.helperLongitude,
            goalLat: appointment.patientLatitude,
            goalLong: appointment.patientLongitude,
            dispatcher: req.body.helperId
        })

        const savedDispatch=await tempDispatch.save()
        res.json(savedDispatch)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).json(error)
    }
}

const getDispatchById=async (req, res)=>
{
    try{
        const dispatch=await Dispatch.findById(req.params.id)
        res.json(dispatch)
    }
    catch(error)
    {
        console.log(error)
    }
}

const editDispatchById=async (req, res)=>
{
    try{
        const dispatch=await Dispatch.findByIdAndUpdate(req.params.id, req.body, {new: true, upsert: true})
        res.json(dispatch)
    }
    catch(error)
    {
        console.log(error)
    }
}

const getDispatchesByHelperId = async (req, res)=>
{
    try{
        const dispatches=await Dispatch.find({dispatcher: req.params.userId})
        res.json(dispatches)
    }
    catch(error)
    {
        console.log(error)
        res.status(404).json(error)
    }
}

module.exports={createDispatch, getDispatchById, editDispatchById, getDispatchesByHelperId}

