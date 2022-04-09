const mongoose=require('mongoose')

const dispatchSchema=new mongoose.Schema({
    startLat: {
        type: Number,
        required: true
    },
    startLong: {
        type: Number,
        required: true
    },
    goalLat: {
        type: Number,
        required: true
    },
    goalLong: {
        type: Number,
        required: true
    },
    dispatcher: {type: mongoose.Schema.Types.ObjectId, ref: 'HealthcareWorker'},
    prescription: {type: mongoose.Schema.Types.ObjectId, ref: 'Prescription'},
    patient: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},
    patientConfirmation: {
        type: Boolean,
        default: false
    },
    dispatcherConfirmation: {
        type: Boolean,
        default: false
    }
})

const Dispatch=mongoose.model('Dispatch', dispatchSchema)

module.exports=Dispatch

