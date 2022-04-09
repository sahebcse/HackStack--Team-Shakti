const mongoose=require('mongoose')

const patientSchema=new mongoose.Schema({
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
    phone: {
        type: Number,
        default: ''
    },
    address: {
        pincode: Number,
        streetAddress: String,
        country: String,
        state: String,
        city: String
    },
    userType:{
        type:String,
        default:"PATIENT"
    },
    appointments: [{type: mongoose.Types.ObjectId, ref: 'Appointment'}],
    healthLogs: [{type: mongoose.Schema.Types.ObjectId, ref: 'HealthLog'}],
    latitude: {
        type: Number
    },
    longitude:
    {
        type: Number
    }
})

const Patient=mongoose.model('Patient', patientSchema)

module.exports=Patient