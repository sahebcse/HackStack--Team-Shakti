import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { bookAppointment } from '../../api'
import MapGeolocation from '../Map/MapGeolocation'
import MapMarker from '../Map/MapMarker'

export default function BookAppointment({appDes, appDate}) {
    const [description, setDescription]=useState(appDes?appDes:'')
    const [date, setDate]=useState(appDate?appDate:'')
    const [coordinates, setCoordinates]=useState({latitude: 0, longitude: 0})
    const [mapState, setMapState]=useState({latitude: 0, longitude: 0, zoom: 14})
    const patient=JSON.parse(localStorage.getItem('profile'))
    const navigate=useNavigate()

    console.log("voice cont", appDes, appDate)

    const handleDescriptionChange=(e)=>
    {
        setDescription(e.target.value)
    }
    const handleDate=(e)=>
    {
        setDate(e.target.value)
    }

    const bookNewAppointment=async (sendData)=>
    {
        try{
            const {data}=await bookAppointment(sendData)
            console.log(data)
            navigate('/dashboard')
        }
        catch(error)
        {
            console.log(error)
        }
    }

    const handleAppointmentSubmit=()=>
    {
        console.log("This was clicked")
        const formData={
            description: description,
            date: date,
            patientId: patient._id,
            pincode: '824231',
            latitude: mapState.latitude,
            longitude: mapState.longitude
        }
        console.log(formData)
        bookNewAppointment(formData)

        
    }
    
    useEffect(()=>
    {
        navigator.geolocation.getCurrentPosition(pos=>{
            console.log(pos)
            setMapState({latitude: pos.coords.latitude, longitude: pos.coords.longitude, zoom: 7})
        })
    }, []) 
  return (
    <div className='grid grid-cols-7'>
        <div className='col-span-2'></div>
        <div className='col-span-7 md:col-span-3 mt-16 shadow-3xl border-solid border-green-400 border-2 p-5 rounded-3xl'>
            <p className='text-lg font-semibold'>
                Please enter an apt description for this appointment. Only use for non emergency cases
            </p>
            <h2 className='text-3xl font-semibold mt-5'>Reason for appointment</h2>
            <textarea onChange={handleDescriptionChange} 
                className='appearance-none placeholder:text-slate-400 placeholder:italic placeholder:text-xl mt-5 border-2 border-blue-700 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500'
                rows={10}
                placeholder="Describe the reason for slot booking"
                value={description}
            />

            <h2 className='text-3xl font-semibold mt-1'>Date of appointment</h2>
            <div className="mt-1 relative rounded-md shadow-sm">
                                    <input onChange={handleDate}
                                    type="date"
                                    value={date}
                                    className="appearance-none border-2 border-blue-700 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500 mt-1"
                                    placeholder="DD/MM/YYYY"
                                    />
                                    
            </div>
            <h2 className='text-3xl font-semibold mt-5'>Patient Location (Click on locate)</h2>
            <MapMarker mapState={mapState} setMapState={setMapState}/>
            latitude: {mapState.latitude}
            longitude: {mapState.longitude}
            <button onClick={handleAppointmentSubmit} className='bg-blue-400 hover:bg-green-400 w-full p-5 mt-5 rounded-2xl'>
                Submit
            </button>
        </div>
        <div className='col-span-2'></div>

    </div>
  )
}
