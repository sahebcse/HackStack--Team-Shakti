const Appointment=require('../models/appointmentModel')
const Patient=require('../models/patientModel')
const Doctor=require('../models/doctorModel')
const { getAllPatients } = require('./patientController')
const { json } = require('express/lib/response')
const {distanceInKmBetweenEarthCoordinates, haversineDistance}=require('../utils/distcalc')

const getAppointmentsByPincodeAndStatus=async (req, res)=>
{
    try{
        const appointments=await Appointment.find({pincode: req.params.pincode, status: req.params.status, emergency: false}).populate('patient').populate('doctor').populate('prescription')
        res.json(appointments)
    }
    catch(error)
    {
        console.log(error)
        res.status(404).json(error)
    }
}

const getDoctorBookedAppointments=async (req, res)=>
{
    try{
        console.log(req.params.id,req.params.status)
        const appointments=await Appointment.find({doctor: req.params.id, status: req.params.status}).populate('patient').populate('doctor').populate('prescription')
        console.log("here", appointments)
        res.json(appointments)
    }
    catch(error)
    {
        console.log(error)
        res.status(404).json(error)
    }
}

const getAllAppointments=async (req, res)=>
{
    try{
        const appointments=await Appointment.find({emergency: false})
        res.json(appointments)
    }
    catch(error)
    {
        console.log(error)
        res.status(404).json(error)
    }
}

const createAppointment=async (req, res)=>
{
    try{
        console.log(req.body)
        const patient=await Patient.findById(req.body.patientId)
        console.log(patient)
        const tempAppointment=await Appointment.create({
            patient: req.body.patientId,
            pincode: req.body.pincode,
            description: req.body.description,
            patientLatitude: req.body.latitude,
            patientLongitude: req.body.longitude

        })
        console.log(tempAppointment)
        patient.appointments.push(tempAppointment._id)
        await patient.save()
        console.log("patient after change..", patient)
        res.status(200).json(patient)
        //res.json(patient)
    }
    catch(error)
    {
        console.log(error)
    }
}

const editAppointment=async (req, res)=>
{
    try{    
        const appointment=await Appointment.findByIdAndUpdate(req.params.id, req.body, {new: true, upsert: true})
        res.json(appointment)
    }
    catch(error)
    {
        console.log(error)
        res.status(403).json(error)
    }

}

const getAppointmentById=async (req, res)=>
{
    try{
        const appointment=await Appointment.findById(req.params.id).populate('patient').populate('doctor').populate('prescription').populate('healthcareWorker')
        return res.json(appointment)
    }
    catch(error)
    {
        console.log(error)
        res.status(404).json(error)
    }
}

const deleteAppointmentById=async (req, res)=>
{
    try{
        const deletedAppointment=await Appointment.findByIdAndDelete(req.params.id)
        res.json(deletedAppointment)
    }
    catch(error)
    {
        console.log(error)
        res.status(403).json(error)
    }
}

const getAppointmentsByPincode=async (req, res)=>
{
    try{
        const appointments=await Appointment.find({pincode: req.params.pincode, emergency: false}).populate('patient').populate('doctor').populate('prescription')
        res.json(appointments)
    }
    catch(error)
    {
        console.log(error)
        res.status(404).json(error)
    }
}

const getAppointmentsByPatient=async (req, res)=>
{
    try{
        const appointments=await Appointment.find({patient: req.params.patientId, emergency: false}).populate('patient')
        res.json(appointments)
    }
    catch(error)
    {
        console.log(error)
        res.status(404).json(error)
    }
}

const getBookedAppointmentsByPatient=async (req, res)=>
{
    try{
        const appointments=await Appointment.find({patient: req.params.patientId, doctorAssigned: true, emergency: false}).populate('patient')
        res.json(appointments)
    }
    catch(error)
    {
        console.log(error)
        res.status(404).json(error)
    }
}

const confirmAppointment=async (req, res)=>
{
    try{
        const appointments=await Appointment.findOne({_id:req.body.id, emergency: false})
        appointments.doctor = req.body.doctorId;
        appointments.status = 'scheduled'
        appointments.doctorAssigned=true
        appointments.doctorLatitude=req.body.doctorLatitude
        appointments.doctorLongitude=req.body.doctorLongitude
        const doctor = await Doctor.findById(req.body.doctorId)
        doctor.appointments.push(req.body.id)
        await doctor.save()
        await appointments.save()

        console.log(doctor)
        res.json(appointments)
    }
    catch(error)
    {
        console.log(error)
        res.status(404).json(error)
    }
}

const getNearbyPatients=async (req, res)=>
{
    try{
        console.log(req.params.range+"kms")
        console.log("lat: "+req.body.latitude+" long: "+req.body.longitude)
        //Calculate all coordinates in range from here
        const appointments=await Appointment.find()
        //Iterate appointments
        var sol=[];
        for (var i=0;i<appointments.length;i++)
        {
            console.log("Patient Lat: "+appointments[i].patientLatitude+" Patient Long: "+appointments[i].patientLongitude)
            var dist=haversineDistance(appointments[i].patientLatitude, appointments[i].patientLongitude, 23.30036331626856, 85.30321040000001)
           
            console.log(dist)
            if (dist<req.params.range)
            {   
                console.log("Pushing to map")
                sol.push(appointments[i])
            }

            
        }
        res.json(sol) //Sends list of cooridantes as json that satisfy given range constraints based on Haversine distance
    }
    catch(error)
    {
        console.log(error)
    }
}

module.exports={getAppointmentsByPincodeAndStatus,getDoctorBookedAppointments, getNearbyPatients, confirmAppointment, getAppointmentsByPincode, getAllAppointments, createAppointment, editAppointment, getAppointmentById, deleteAppointmentById, getAppointmentsByPatient, getBookedAppointmentsByPatient}
