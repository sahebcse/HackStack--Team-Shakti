const mongoose=require('mongoose')

const healthcareWorkerSchema=new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    email: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        default: 'Nurse'
    },
    phone: {
        type: Number,
        default: ''
    },
    address: {
        pincode: Number,
        buildingName: String,
        area: String,
        state: String,
        city: String
    },
    
    prescriptions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Prescription'
    }],
    
    userType:{
        type:String,
        default:"HELPER"
    },
    latitude: {
        type: Number
    },
    longitude:
    {
        type: Number
    }
})

const HealthcareWorker=mongoose.model('HealthcareWorker', healthcareWorkerSchema)

module.exports=HealthcareWorker