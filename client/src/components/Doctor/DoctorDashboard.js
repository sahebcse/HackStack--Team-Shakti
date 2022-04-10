import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getBookedAppointments,
  getResolvedAppointments,
} from "../../actions/User";
import { useSelector } from "react-redux";

export default function DoctorDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("profile"));

  const [currentAppointments, setCurrentAppointments] = useState(0);
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [resolvedAppointments, setResolvedAppointments] = useState([]);
  const divRef=useRef(null)
  const lang=useSelector((state)=>state.Language)

  useEffect(() => {
    getBookedAppointments(setBookedAppointments, {
      id: user._id,
      status: "scheduled",
    });
    getResolvedAppointments(setResolvedAppointments, {
      id: user._id,
      status: "resolved",
    });
  }, []);

  const navigateToConfirmAppointment = () => {
    navigate("/confirm_appointment");
  };

  const scrollToAppointments=()=>
  {
    if (divRef)
    {
      divRef.current.scrollIntoView()
    }
    else
    {
      console.log("The divref is null")
    }
  }

  const navigateToRespondSos = () => [navigate("/respond_to_sos")];
  return (
    <div className="col-span-7 md:col-span-5 mb-5">
      <div className="mt-10 bg-gradient-to-r from-indigo-600 to-indigo-100 py-20 rounded-xl grid md:grid-cols-2">
        <div className="p-16">
          <h1 className="text-5xl font-semibold text-white">सुगम</h1>
          <p className="text-xl text-white mt-10"></p>
          <h2 className="text-4xl text-white font-bold">
            स्वस्थ भारत के लिए एक विकसित प्रयास
          </h2>
          <button className="rounded-xl bg-white p-5 mt-10 text-indigo-800 font-semibold">
            Know More
          </button>
        </div>

        <div className="p-10">
          <img className="w-96 h-max" src={require("./static/textclear.png")} />
        </div>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-10">
        <div
          onClick={navigateToConfirmAppointment}
          className="p-5 place-content-center rounded-xl shadow-sm cursor-pointer bg-blue-100  transition duration-150 ease-out hover:ease-in hover:shadow-blue-400 hover:shadow-lg hover:bg-blue-200  group"
        >
          <img
            src={require("./static/online-interview.png")}
            className="mx-auto h-64 group-hover:scale-90  transition duration-150 ease-out hover:ease-in"
          />
          <p className="text-2xl font-semibold mx-auto mt-5 text-center">
            Confirm an Appointment
          </p>
          <p className=""></p>
        </div>

        <div
          onClick={navigateToRespondSos}
          className="p-5 place-content-center shadow-sm cursor-pointer rounded-xl bg-orange-100  transition duration-150 ease-out hover:ease-in hover:shadow-orange-400 hover:shadow-lg hover:bg-orange-200 group"
        >
          <img
            src={require("./static/sos.png")}
            className="mx-auto h-64 group-hover:scale-90  transition duration-150 ease-out hover:ease-in"
          />
          <p className="text-2xl font-semibold mx-auto text-center mt-5">
            Respond to an Emergency
          </p>
          <p className=""></p>
        </div>

        <div onClick={scrollToAppointments} className="p-5 place-content-center shadow-sm cursor-pointer rounded-xl bg-green-100  transition duration-150 ease-out hover:ease-in hover:shadow-green-400 hover:shadow-lg hover:bg-green-200 group">
          <img
            src={require("./static/prescription.png")}
            className="mx-auto h-64 group-hover:scale-90  transition duration-150 ease-out hover:ease-in"
          />
          <p className="text-2xl font-semibold mx-auto text-center mt-5">
            Create a Prescription
          </p>
          <p className=""></p>
        </div>
      </div>

      <div ref={divRef} className="w-full flex justify-center m-10">
        <button
          className="px-4 py-2 bg-blue-500 text-3xl m-1 font-semibold rounded focus:bg-green-500 hover:bg-blue-700 text-white"
          onClick={() => setCurrentAppointments(0)}
        >
          Booked Appointments
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-3xl m-1 font-semibold rounded focus:bg-green-500 hover:bg-blue-700 text-white"
          onClick={() => setCurrentAppointments(1)}
        >
          Resolved Appointments
        </button>
      </div>

      {currentAppointments === 0 && (
        <div className="mt-10">
          {bookedAppointments.map((appointment) => {
            return (
              <div onClick={() => navigate(`/appointment/${appointment._id}`)}>
                <div className="mt-5 mb-3 p-5 shadow-2xl border-2 border-blue-800 cursor-pointer rounded-xl hover:border-white group hover:bg-blue-600 transition ease-out hover:ease-linear">
                  <p className="text-3xl font-bold group-hover:text-white">
                    {appointment.description}
                  </p>
                  <p className="text-xl text-zinc-600 group-hover:text-white">
                    {new Date(Date(appointment?.dateCreated)).toDateString()}
                  </p>
                  <p className="text-base text-zinc-400">{appointment._id}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {currentAppointments === 1 && (
        <div className="mt-10">
          {resolvedAppointments.map((appointment) => {
            return (
              <div>
                <div
                  onClick={() => navigate(`/appointment/${appointment._id}`)}
                  className="mt-5 mb-3 p-5 shadow-2xl border-red-800 cursor-pointer rounded-xl hover:border-white group hover:bg-red-400 transition ease-out hover:ease-linear border-2"
                >
                  <p className="text-3xl font-bold group-hover:text-white">
                    {appointment.description}
                  </p>
                  <p className="text-xl text-zinc-600 group-hover:text-white">
                    {new Date(Date(appointment?.dateCreated)).toDateString()}
                  </p>
                  <p className="text-base text-zinc-400">{appointment._id}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
