import React, {useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { bookAppointment } from '../../api'
import { NotificationManager } from 'react-notifications'
import {uploadPrescription} from '../../actions/User'
import {Buffer} from 'buffer'
import { useSelector } from 'react-redux'
const {create} = require('ipfs-http-client')
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) 


export default function CreatePrescription({patientId}) {

  const navigate=useNavigate()
  const lang=useSelector((state)=>state.Language)
  const [doctorPrescribed, setDoctorPrescribed]=useState('')
  const [generalInstructions, setGeneralInstructions]=useState('')
  const [title, setTitle]= useState('')
  const [scanPic, setScanPic]=useState()
  const [loadingImage, setLoadingImage]=useState(false)
  const {id} = useParams()


  const doctor=JSON.parse(localStorage.getItem('profile'))

    const handleTitleChange=(e)=>
    {
      setTitle(e.target.value)
    }
    const handleInstructionChange=(e)=>
    {
      setGeneralInstructions(e.target.value)
    }
    const handlePrescriptionChange=(e)=>
    {
      setDoctorPrescribed(e.target.value)
    }

    const handleCaptureImage = (e)=>{
      NotificationManager.warning("","Loading Resume", 3000)
      setLoadingImage(false)
      e.preventDefault()
      const file = e.target.files[0]
      const reader = new window.FileReader()
      reader.readAsArrayBuffer(file)

      reader.onloadend =async ()=>{
          const buffer = Buffer.from(reader.result)
          const result =await ipfs.add(buffer)
          console.log(result.path)
          setScanPic(result.path)
          setLoadingImage(true)
      }
  
  }

  const handleUploadImage = (e) => {
      //update the resume link to user.resume
      setLoadingImage(false)
      NotificationManager.info("","Uploading ")
      e.preventDefault()
      const sendData = {appointmentId:id,patientId:patientId, doctorId:doctor?._id, title:title,generalInstructions:generalInstructions,doctorPrescribed:doctorPrescribed,scanPic:`https://ipfs.infura.io/ipfs/${scanPic}` }
      uploadPrescription(sendData, navigate)
      console.log(sendData)
      
  }


   
  return (
    <div className='grid grid-cols-7 mt-3 '>
        <div className='col-span-7 md:col-span-4 md:col-start-2  mt-16 shadow-3xl border-solid border-green-400 border-2 p-5 rounded-3xl'>
        <div className="m-1 w-full flex justify-center">
              Create prescription{lang=="ENGLISH"?<p>Create prescription</p>:<p>नुस्खा बनाएं</p>}
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-2xl font-bold mb-2" for="username">
                {lang=="ENGLISH"?<p>Title</p>:<p>शीर्षक</p>}
              </label>
              <input onChange={handleTitleChange} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight border-2 border-blue-700 focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Title"/>
            </div>
            <h2 className='text-3xl font-semibold mt-5'>General Instruction</h2>
            <textarea onChange={handleInstructionChange} 
                className='appearance-none placeholder:text-slate-400 placeholder:italic placeholder:text-xl mt-5 border-2 border-blue-700 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500'
                rows={10}
                placeholder="Describe the reason for slot booking"
            />
            <h2 className='text-3xl font-semibold mt-5'>Doctor Prescription</h2>
            <textarea onChange={handlePrescriptionChange} 
                className='appearance-none placeholder:text-slate-400 placeholder:italic placeholder:text-xl mt-5 border-2 border-blue-700 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500'
                rows={10}
                placeholder="Describe the reason for slot booking"
            />

            <div className="w-half px-3 overflow-hidden">
                <input type="file" accept="image/*,.pdf" className="mb-2 w-full " onChange={handleCaptureImage}/>
            </div>
            <div className="w-half px-3">
                { loadingImage ? 
                <button   className="text-white mt-2 font-bold px-4 py-2 rounded outline-none focus:outline-none mb-1 bg-blue-300 active:bg-red-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150" onClick={handleUploadImage}>
                    Submit
                </button>:
                <button   className="text-white mt-2 font-bold px-4 py-2 rounded outline-none  mb-1 bg-gray-500  uppercase text-sm h transition-all duration-150 disabled" >
                    Submit
                </button>
                }
            </div>
            
        </div>

    </div>
  )
}
