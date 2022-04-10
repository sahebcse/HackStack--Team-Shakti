import { useState, useEffect } from "react";
import { targetaudience } from "./static/targetaudience.jfif";
import { useNavigate } from "react-router-dom";
import {
  getAppointmentsByPatient,
  getEmergenciesByPatient,
  getPatientById,
} from "../../api";

export default function PatientDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [emergencies, setEmergencies] = useState([]);
  const [currentAppointments, setCurrentAppointments] = useState(0);

  const navigate = useNavigate();
  const patient = JSON.parse(localStorage.getItem("profile"));

  const navigateToBookAppointment = () => {
    navigate("/book_appointment");
  };

  const navigateToCreateSOS = () => {
    navigate("/create_sos");
  };

  const navigateToOrderPrescription = () => {
    navigate("/order_prescription");
  };

  const navigateToAppointment = (aid) => {
    console.log(aid);
    navigate("/appointment/" + aid);
  };
  useEffect(async () => {
    console.log("This is running");
    const appointmentResp = await getAppointmentsByPatient(patient._id);
    const emergencyResp = await getEmergenciesByPatient(patient._id);

    setAppointments(appointmentResp.data);
    setEmergencies(emergencyResp.data);
  }, []);

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
          onClick={navigateToBookAppointment}
          className="p-5 place-content-center rounded-xl shadow-sm cursor-pointer bg-blue-100  transition duration-150 ease-out hover:ease-in hover:shadow-blue-400 hover:shadow-lg hover:bg-blue-200  group"
        >
          <img
            src={require("./static/video-conference.png")}
            className="mx-auto h-64 group-hover:scale-90  transition duration-150 ease-out hover:ease-in"
          />
          <p className="text-2xl font-semibold mx-auto mt-5 text-center">
            Book a video appointment
          </p>
          <p className=""></p>
        </div>

        <div
          onClick={navigateToCreateSOS}
          className="p-5 place-content-center shadow-sm cursor-pointer rounded-xl bg-orange-100  transition duration-150 ease-out hover:ease-in hover:shadow-orange-400 hover:shadow-lg hover:bg-orange-200 group"
        >
          <img
            src={require("./static/ambulance.png")}
            className="mx-auto h-64 group-hover:scale-90  transition duration-150 ease-out hover:ease-in"
          />
          <p className="text-2xl font-semibold mx-auto text-center mt-5">
            Send an SOS/Emergency
          </p>
          <p className=""></p>
        </div>

        <div
          onClick={navigateToOrderPrescription}
          className="p-5 place-content-center shadow-sm cursor-pointer rounded-xl bg-green-100  transition duration-150 ease-out hover:ease-in hover:shadow-green-400 hover:shadow-lg hover:bg-green-200 group"
        >
          <img
            src={require("./static/medicine.png")}
            className="mx-auto h-64 group-hover:scale-90  transition duration-150 ease-out hover:ease-in"
          />
          <p className="text-2xl font-semibold mx-auto text-center mt-5">
            Order a Prescription
          </p>
          <p className=""></p>
        </div>
      </div>

      <div className="w-full flex justify-center m-10">
        <button
          className="px-4 py-2 bg-blue-300 text-3xl m-1 font-semibold rounded focus:bg-green-500 hover:bg-blue-700"
          onClick={() => setCurrentAppointments(0)}
        >
          Emergencies
        </button>
        <button
          className="px-4 py-2 bg-blue-300 text-3xl m-1 font-semibold rounded focus:bg-green-500 hover:bg-blue-700"
          onClick={() => setCurrentAppointments(1)}
        >
          Booked Appointments
        </button>
        <button
          className="px-4 py-2 bg-blue-300 text-3xl m-1 font-semibold rounded focus:bg-green-500 hover:bg-blue-700"
          onClick={() => setCurrentAppointments(2)}
        >
          Created Appointments
        </button>
      </div>

      {currentAppointments === 0 && (
        <div className="mt-10">
          {emergencies.map((appointment) => {
            return (
              <div>
                {appointment.status !== "resolved" && (
                  <div
                    onClick={() => {
                      navigate(`/appointment/${appointment._id}`);
                      console.log(appointment._id);
                    }}
                    className="mt-5 p-5 shadow-2xl bg-red-300 cursor-pointer"
                  >
                    <p className="text-3xl font-bold">
                      {appointment.description}
                    </p>
                    <p className="text-xl font-semibold">
                      {new Date(Date(appointment?.dateCreated)).toDateString()}
                    </p>
                    <p className="text-xl text-zinc-500">{appointment._id}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {currentAppointments === 1 && (
        <div className="mt-10">
          {appointments
            .filter((x) => x.status == "scheduled")
            .map((appointment) => (
              <div
                onClick={() => navigateToAppointment(appointment._id)}
                className="mt-5 p-5 shadow-2xl cursor-pointer"
              >
                <p className="text-3xl font-bold">{appointment.description}</p>
                <p className="text-xl text-zinc-500">
                  {new Date(Date(appointment?.dateCreated)).toDateString()}
                </p>
              </div>
            ))}
        </div>
      )}

      {currentAppointments === 2 && (
        <div className="mt-10">
          {appointments
            .filter((x) => x.status == "created")
            .map((appointment) => (
              <div
                onClick={() => navigateToAppointment(appointment._id)}
                className="mt-5 p-5 shadow-2xl cursor-pointer"
              >
                <p className="text-3xl font-bold">{appointment.description}</p>
                <p className="text-xl text-zinc-500">
                  {new Date(Date(appointment?.dateCreated)).toDateString()}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
