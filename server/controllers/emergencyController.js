const Appointment=require('../models/appointmentModel')
const Patient=require('../models/patientModel')
const Doctor=require('../models/doctorModel')

const getEmergencyByPincodeAndStatus=async (req, res)=>
{
    try{
        const appointments=await Appointment.find({  emergency: true}).populate('patient').populate('doctor').populate('prescription')
        res.json(appointments)
    }
    catch(error)
    {
        console.log(error)
        res.status(404).json(error)
    }
}

const getAllEmergencies=async (req, res)=>
{
    try{
        const appointments=await Appointment.find({emergency: true})
        res.json(appointments)
    }
    catch(error)
    {
        console.log(error)
        res.status(404).json(error)
    }
}


const createEmergency=async (req, res)=>
{
    try{
        const patient=await Patient.findById(req.body.patientId)
        const tempAppointment=new Appointment({
            patient: req.body.patientId,
            pincode: req.body.pincode,  //Change this later to patient.address.pincode
            description: req.body.description,
            patientLatitude: req.body.latitude,
            patientLongitude: req.body.longitude,
            emergency: true,
            status: 'sos',
            typeOfEmergency: req.body.typeOfEmergency
        })

        const savedAppointment=await tempAppointment.save()
        await patient.appointments.addToSet(savedAppointment._id)
        await patient.save()
        res.json(savedAppointment)

    }
    catch(error)
    {
        console.log(error)
        res.status(400).json(error)
    }
}

const getEmergenciesByPatient=async (req, res)=>
{
    try{
        console.log("Trying to get emergencies")
        const emergencies=await Appointment.find({patient: req.params.patientId, emergency: true}).populate('patient').populate('doctor')
        console.log(emergencies)
        res.json(emergencies)
    }
    catch(error)
    {
        console.log(error)
    }
}

const getBookedEmergenciesByPatient=async (req, res)=>
{
    try{
        const emergencies=await Appointment.find({patient: req.params.patientId, emergency: true, doctorAssigned: true}).populate('patient').populate('doctor')
        res.json(emergencies)
    }
    catch(error)
    {

    }
}


module.exports={getEmergencyByPincodeAndStatus, getAllEmergencies, createEmergency, getEmergenciesByPatient, getBookedEmergenciesByPatient}