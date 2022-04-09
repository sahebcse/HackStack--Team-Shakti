const mongoose=require('mongoose')
const Patient=require('./patientModel')
const Doctor=require('./doctorModel')
const Prescription=require('./prescriptionModel')

const healthLogSchema=new mongoose.Schema({
    date: {
        type: String,
        default: Date.now
    },
    patient: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},
    doctor: {type: mongoose.Schema.Types.ObjectId, ref: 'Doctor'},
    notes: {
        type: String,
        required: true
    },
    height: {
        type: Number //cm
    },
    weight: {
        type: Number  //kg
    },
    prescription: {type: mongoose.Schema.Types.ObjectId, ref: 'Prescription'},
    visitPurpose: {
        type: String
    }

},{
    timestamps:true
})

const HealthLog=mongoose.model('HealthLog', healthLogSchema)

module.exports=HealthLog