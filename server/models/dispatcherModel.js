const mongoose=require('mongoose')

const dispatcherSchema=new mongoose.Schema({
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
    pincode: {
        type: Number,
        required: true
    },
    address: {
        pincode: Number,
        buildingName: String,
        area: String,
        state: String,
        city: String
    }
},{
    timestamps:true
})

const Dispatcher=mongoose.model('Dispatcher', dispatcherSchema)

module.exports=Dispatcher