const mongoose=require('mongoose')

const chatSchema=new mongoose.Schema({
    msg:{
        type:String
    },
    appointment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Appointment'
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'onModel'
    },
    onModel:{
        type:String,
        enum:['Doctor','Patient','HealthcareWorker']
    },
    room:{
        type:String,
        enum:["pd","ph","dh"]
    }
},{
    timestamps:true
})

const Chat=mongoose.model('Chat', chatSchema)

module.exports=Chat;