import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getBookedPrescriptions,
  getResolvedPrescriptions,
} from "../../actions/User";
import { getDispatchesByHelperId } from "../../api";

export default function HealthWorkerDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("profile"));

  const [currentPrescriptions, setCurrentPrescriptions] = useState(0);
  const [bookedPrescriptions, setBookedPrescriptions] = useState([]);
  const [resolvedPrescriptions, setResolvedPrescriptions] = useState([]);
  const [dispatches, setDispatches]=useState([])
  useEffect(() => {
    getBookedPrescriptions(setBookedPrescriptions, {
      id: user._id,
      status: "scheduled",
    });
    getResolvedPrescriptions(setResolvedPrescriptions, {
      id: user._id,
      status: "resolved",
    });

  }, []);


  useEffect(async ()=>
  {
    const {data} = await getDispatchesByHelperId(user?._id)
    console.log(data)
    setDispatches(data)
  }, [])
  const navigateToConfirmPrescription = () => {
    navigate("/confirm_prescription");
  };

  const openDispatch=(id)=>
  {
    navigate(`/dispatch/${id}`)
  }

  const navigateToWorkerRespondSos = () => [navigate("/worker_respond_to_sos")];
  return (
    <div className="col-span-5 mb-5">
      <div className="mt-10 bg-gradient-to-r from-indigo-500 to-indigo-800 py-20 rounded-xl grid md:grid-cols-2">
        <div className="p-16">
          <h1 className="text-5xl font-semibold text-white">Sugam</h1>
          <p className="text-xl text-white mt-10">
            Whichever tagline sounds sexy
          </p>
          <h2 className="text-4xl text-white font-bold">
            Swastha Bharat Viksit Bharat
          </h2>
          <button className="rounded-xl bg-white p-5 mt-10 text-indigo-800 font-semibold">
            Know More
          </button>
        </div>
        <div className="p-10">
          <img
            className="w-96 h-max"
            src={require("./static/targetaudience.jfif")}
          />
        </div>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-10">
        <div
          onClick={navigateToConfirmPrescription}
          className="p-5 place-content-center rounded-xl shadow-2xl hover:shadow-sm cursor-pointer"
        >
          <img
            src={require("./static/online-interview.png")}
            className="mx-auto h-64"
          />
          <p className="text-2xl font-semibold mx-auto mt-5 text-center">
            Confirm a Prescription
          </p>
          <p className=""></p>
        </div>

        <div
          onClick={navigateToWorkerRespondSos}
          className="p-5 place-content-center shadow-2xl hover:shadow-sm cursor-pointer"
        >
          <img src={require("./static/sos.png")} className="mx-auto h-64" />
          <p className="text-2xl ml-10 font-semibold mx-auto text-center mt-5">
            Respond to an Emergency
          </p>
          <p className=""></p>
        </div>
      </div>

      <div className="w-full flex justify-center m-10">
        <button
          className="px-4 py-2 bg-blue-300 text-3xl m-1 font-semibold rounded focus:bg-green-500 hover:bg-blue-700"
          onClick={() => setCurrentPrescriptions(0)}
        >
          Booked Prescriptions
        </button>
        <button
          className="px-4 py-2 bg-blue-300 text-3xl m-1 font-semibold rounded focus:bg-green-500 hover:bg-blue-700"
          onClick={() => setCurrentPrescriptions(1)}
        >
          Resolved Prescriptions
        </button>
        <button
          className="px-4 py-2 bg-blue-300 text-3xl m-1 font-semibold rounded focus:bg-green-500 hover:bg-blue-700"
          onClick={() => setCurrentPrescriptions(2)}
        >
          Dispatches
        </button>
      </div>

      {currentPrescriptions === 0 && (
        <div className="mt-10">
          {bookedPrescriptions.map((prescription, idx) => {
            return (
              <div onClick={() => {}}>
                {/* <div  className='mt-5 p-5 shadow-2xl bg-red-300 cursor-pointer'>
                      <p className='text-2xl'>{appointment.description}</p>
                      <p className='text-xl'>{appointment.dateCreated}</p>
                      <p className='text-xl'>{appointment._id}</p>
                      </div> */}
                booked prescription {idx}
              </div>
            );
          })}
        </div>
      )}

      {currentPrescriptions === 1 && (
        <div className="mt-10">
          {resolvedPrescriptions.map((prescription, idx) => {
            return (
              <div>
                {/* <div onClick={()=>navigate(`/appointment/${appointment._id}`)} className='mt-5 p-5 shadow-2xl bg-red-300 cursor-pointer'>
                        <p className='text-2xl'>{appointment.description}</p>
                        <p className='text-xl'>{appointment.dateCreated}</p>
                        <p className='text-xl'>{appointment._id}</p>
                        </div> */}
                resolved prescription {idx}
              </div>
            );
          })}
        </div>
      )}
         {currentPrescriptions === 2 && (
        <div className="mt-10">
          {dispatches.map((dispatch, idx) => {
            return (
              <div className="cursor-pointer shadow-xl bg-green-200 hover:bg-green-300" onClick={()=>openDispatch(dispatch._id)}>
                Dispatch {idx}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
