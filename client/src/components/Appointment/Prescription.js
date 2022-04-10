import React,{useEffect, useState} from 'react'
import {useParams, useLocation} from 'react-router-dom'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import CreatePrescription from '../Doctor/CreatePrescription'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    overflow:'scroll',
    p: 4,
  };

const Prescription = () => {

    const {id}=useParams()
    const User = JSON.parse(localStorage.getItem('profile'))
    const {state}= useLocation()
    const [prescriptions,setPrescriptions]=useState(state.prescription||[])
    console.log("caksck",state)
    const [open, setOpen] = useState(false);

    const [showPresModal, setShowPresModal] = useState(false);
    const [currentPres, setCurrentPres] = useState(null);
    const [showFormModal, setShowFormModal] = useState(false);


    const handleSelectPres = (pres)=>{
        setCurrentPres(pres)
        setShowPresModal(true)
    }


  return (
      <div className="mt-20 p-4">
        {/* Modal for viewing prescription */}
        {User?.userType=="DOCTOR" && <div className="w-full flex justify-center">
            <button
                className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowFormModal(true)}
            >
                Create Prescription
            </button>
        </div>}
        {/* Modal for creating Prescription */}



        {/* <Modal
            open={showFormModal}
            onClose={()=>setShowFormModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}> */}
                <CreatePrescription/>
            {/* </Box>
        </Modal> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {prescriptions.map(pres=>{
                return (
                    <div onClick={() =>handleSelectPres(pres)}>
                        <div className="border border-2 bg-red-200 rounded col-span-1">
                            <div className="text-xl">
                                {pres?.title}
                            </div>
                            <div>
                                {pres?.generalInstructions}
                                <iframe src={`${pres.scanPic}`} className="w-full" frameborder="0"></iframe>
                            </div>

                        </div>
                    </div>
                )
            })}
        </div>
        </div>
  )
}

export default Prescription