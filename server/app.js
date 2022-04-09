const express=require('express')
const cors=require('cors')
const http=require('http')
const socketio=require('socket.io')
const dotenv=require('dotenv')
const mongoose=require('mongoose')

const app=express()

const CONNECTION_URL= "http://localhost:3000"
const MONGODB_URL='mongodb://localhost/hillyhealth69'
const PORT=process.env.PORT||5000

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//Routes
const patientRoutes=require('./routes/patientRoutes')
const doctorRoutes=require('./routes/doctorRoutes')
const healthcareWorkerRoutes=require('./routes/healthcareWorkerRoutes')
const healthLogRoutes=require('./routes/healthLogRoutes')
const prescriptionRoutes=require('./routes/prescriptionRoutes')
const appointmentRoutes=require('./routes/appointmentRoutes')
const emergencyRoutes=require('./routes/emergencyRoutes')
const chatRoutes=require('./routes/chatRoutes');
const dispatchRoutes=require('./routes/dispatchRoutes')

app.use(patientRoutes)
app.use(doctorRoutes)
app.use(healthLogRoutes)
app.use(healthcareWorkerRoutes)
app.use(prescriptionRoutes)
app.use(appointmentRoutes)
app.use(emergencyRoutes)
app.use(chatRoutes)
app.use(dispatchRoutes)


app.get('/', (req, res)=>
{
    res.send("Server for Hilly Health")
})

//Socket IO Setup
const socketHandler=require('./controllers/socketHandler') //Put all your socket io code in this file
const server=http.createServer(app);
const io=socketio(server, {
  cors: {
      origin: CONNECTION_URL,
      methods: ["GET", "POST"]
    }
});

const onConnection=(socket)=>
{
    socketHandler(io, socket);
    
}

io.on('connection', onConnection)

mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    server.listen(PORT, () => {
      console.log(`server up and running on port ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(err.message);
  });
