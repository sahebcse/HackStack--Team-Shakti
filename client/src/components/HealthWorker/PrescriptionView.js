import React from 'react'
import {assignPrescription} from '../../actions/User'
import {useNavigate} from 'react-router-dom'
import { dispatchPrescription } from '../../api'

const PrescriptionView = ({pres}) => {
    console.log("hee",pres._id)
    const navigate = useNavigate()
    const User = JSON.parse(localStorage.getItem('profile'))
    const handleSubmit = async ()=>{
        const sendData = {id:pres._id, helperId:User?._id, appointmentId: pres.appointment._id}
        const {data}=await dispatchPrescription(sendData)
        console.log(data)
        navigate(`/dispatch/${data._id}`)
    }
  return (
    <div className="flex bg-gray-100 hover:bg-gray-300 p-4 flex-col justify-center" >
        <div className='flex justify-between items-center'>
            <h2 className='font-bold text-rose-700'>{pres?.title}</h2>
            <h2 className='font-bold text-rose-700'>{new Date(Date(pres?.date)).toDateString()}</h2>
        </div>

        <div className='flex'>
            <div>
                <div  className='m-2'>
                    <h2 className='font-semibold text-emerald-400'>Appointment Details</h2>
               
                    <h2 className='text-gray-700'>Appointment Date: {new Date(Date(pres?.date)).toDateString()}</h2>
                </div>

                

                
            </div>
            <div>
                <div className='m-2'>
                    <h2 className='font-semibold text-emerald-400'>Instructions</h2>
                    <p className='text-gray-700'>{pres?.generalInstructions}</p>
                </div>
                <div className='m-2'>
                    <h2 className='font-semibold text-emerald-400'>Doctor Prescribed</h2>
                    <p className='text-gray-700'>{pres?.doctorPrescribed}</p>
                </div>
                <div className='m-2'>
                    <h2 className='font-semibold text-emerald-400'>Pic</h2>
                    <img src={require('./static/scanpic.png')} className='mx-auto w-auto h-auto' alt='scan pic' />
                </div>
            </div>
        </div>

        <button className="px-3 py-2 m-2 bg-blue-300 hover:bg-blue-500" onClick={handleSubmit}>Confirm</button>
    </div>
  )
}

export default PrescriptionView