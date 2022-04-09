import React, {useEffect, useState} from 'react'
import DoctorDashboard from '../../components/Doctor/DoctorDashboard'
import HealthWorkerDashboard from '../../components/HealthWorker/HealthWorkerDashboard'
import PatientDashboard from '../../components/Patient/PatientDashboard'

export default function Dashboard() {
    const worker=JSON.parse(localStorage.getItem("profile"))


  const DashView = ()=>
  {
      switch(worker.userType){
            case 'PATIENT':
                return <PatientDashboard />
            case 'DOCTOR':
                return <DoctorDashboard />
            case 'HELPER':
                return <HealthWorkerDashboard />

      }
  }
    return (
      <div className='mt-10 grid grid-cols-7'>
          <div></div>
          <DashView />
          <div></div>
      </div>
  )
}
