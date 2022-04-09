const mongoose=require('mongoose')

const dropPointSchema=new mongoose.Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    }
})

const DropPoint=mongoose.model('Drop Point', dropPointSchema)

module.exports=DropPoint