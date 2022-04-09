const mongoose=require('mongoose')

const doctorSchema=new mongoose.Schema({
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
        default: 'General Physician'
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
    
    appointments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Appointment'
    }],
    
    userType:{
        type:String,
        default:"DOCTOR"
    },
    latitude: {
        type: Number
    },
    longitude:
    {
        type: Number
    }
})

const Doctor=mongoose.model('Doctor', doctorSchema)

module.exports=Doctor