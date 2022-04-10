import React from 'react'
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'

import {getUnconfirmedAppoinment, confirmAppointment} from '../../actions/User'
import NearbyMapMarkers from '../Map/NearbyMapMarkers';

export default function ConfirmAppointment() {
  const User = JSON.parse(localStorage.getItem('profile'))
  const navigate = useNavigate()
  const [coordinates, setCoordinates]=useState({latitude: 0, longitude: 0})
  const [x, setX]=useState(null)

  const handleConfirm = (id)=>{
    const sendData = {id:id, doctorId:User._id, doctorLatitude: coordinates.latitude, doctorLongitude: coordinates.longitude}
    confirmAppointment(sendData, navigate)
    
  }

  const [appointments, setAppoinments]=useState([]);

  const handleConfirmFromMap=()=>
  {
    try{
      const sendData = {id:x._id, doctorId:User._id, doctorLatitude: coordinates.latitude, doctorLongitude: coordinates.longitude}
      confirmAppointment(sendData, navigate)
    }
    catch(error)
    {
      console.log(error)
    }
  }
  useEffect(()=>{
      getUnconfirmedAppoinment(setAppoinments);
  },[])

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(pos=>{
      console.log(pos)
      setCoordinates({latitude: pos.coords.latitude, longitude: pos.coords.longitude})
  })
  }, [])
  console.log(appointments)

  return (<div>
    <div className="m-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
      { appointments.map(app=>{
        return (
          <div className="flex bg-gray-100 hover:bg-gray-300 p-4 justify-center" >
              <p>{app.description}</p>
              <button className="px-3 py-2 m-2 bg-blue-300 hover:bg-blue-500" onClick={()=>handleConfirm(app._id)}>Confirm</button>
          </div>
        )
      })}

      
    </div>
    <div>
        {x?<div>{x.patient}</div>:<div></div>}
        <NearbyMapMarkers lat={coordinates.latitude} long={coordinates.longitude} setX={setX}/>
        <button onClick={handleConfirmFromMap} className='px-3 py-2 m-2 bg-green-300 hover:bg-green-500'>Confirm Appointment from Map</button>
      </div>
    </div>
  )
}
