import React,{useState, useEffect} from 'react'
import {confirmPrescription} from '../../actions/User'
import { getAllPrescriptions } from '../../api';
import PrescriptionView from './PrescriptionView'

const ConfirmPrescription = () => {
    const [prescriptions,setPrescriptions]=useState([]);
    /* 
    useEffect(()=>{
         confirmPrescription(setPrescriptions);
         console.log(prescriptions)
     },[])
     */
    useEffect(async ()=>{
        const {data}=await getAllPrescriptions()
        setPrescriptions(data)
        console.log(data)
    }, [])

    return (
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
           
            {
                prescriptions.map((prescription)=>(<PrescriptionView pres={prescription} />))
            }
        </div>
    )
}

export default ConfirmPrescription