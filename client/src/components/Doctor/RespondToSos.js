import React from 'react'
import { useEffect, useState } from 'react';

import {getUnconfirmedEmergency} from '../../actions/User'

export default function RespondToSos() {

  const [appointments, setAppoinments]=useState([]);
  const user = JSON.parse(localStorage.getItem('profile'))

  useEffect(()=>{
    getUnconfirmedEmergency(setAppoinments, {pincode:user?.address?.pincode||1234, status:"created"});
  },[])

  const handleEmergency = (id)=>{
      console.log("user")
  }

  console.log("appo",appointments)
  return (
    <div className="m-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
    { appointments.map(app=>{
      return (
        <div className="flex bg-gray-100 hover:bg-gray-300 p-4 justify-center" onClick={()=>handleEmergency(app._id)} >
            <p>{app.typeOfEmergency}</p>
        </div>
      )
    })}
  </div>
  )
}
