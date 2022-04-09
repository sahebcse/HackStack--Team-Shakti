const mongoose=require('mongoose')
const Doctor=require('./doctorModel')
const Patient=require('./patientModel')

const prescriptionSchema=new mongoose.Schema({
    title: {
        type: String,
        default: ''
    },
    // patient: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},
    // doctor: {type:mongoose.Schema.Types.ObjectId, ref: 'Doctor'},
    appointment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Appointment'
    },
    health:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'HealthcareWorker'
    },
    date: {
        type: String,
        default: Date.now
    },
    generalInstructions: {
        type: String,
        default: ''
    },
    doctorPrescribed: {
        type: String,
        default: ''
    },
    amount: {
        type: Number
    },
    satisfied: {
        type: Boolean,
        default: false
    },
    scanPic: {
        type: String,
        default: ''
    }
    
},{
    timestamps:true
})

const Prescription=mongoose.model('Prescription', prescriptionSchema)

module.exports=Prescription