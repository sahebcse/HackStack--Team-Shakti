import React from "react";
import { Link } from "react-router-dom";
import doc from "./static/docconsult.webp";

const LandingPage = () => {
  return (
    <div>
      <div className="w-screen flex justify-center items-start flex-col">
        <div
          className="relative h-80 bg-gradient-to-r from-sky-500 to-indigo-500 w-full flex items-start justify-center flex-col"
          style={{ marginTop: "80px" }}
        >
          <h2 className="md:ml-16 ml-8 font-bold md:text-5xl text-2xl text-white md:max-w-full max-w-sm ">
            SUGAM - स्वस्थ भारत के लिए एक विकसित प्रयास
          </h2>
          {localStorage.getItem("profile") ? (
            <Link to="/dashboard">
              <button className="btn px-8 py-2 md:ml-16 ml-8 bg-orange-500 rounded-md mt-6 text-xl text-white font-semibold">
                Dashboard
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="btn px-8 py-2 md:ml-16 ml-8 bg-orange-500 rounded-md mt-6 text-xl text-white font-semibold">
                LogIn
              </button>
            </Link>
          )}
          <div class="custom-shape-divider-bottom-1647178720">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                class="shape-fill"
              ></path>
            </svg>
          </div>
        </div>
        <div className="my-8">
          <div className="hd w-full text-center">
            <h2 className="font-bold mx-4 md:text-3xl text-2xl">
              What would you like to do today ?
            </h2>
          </div>
          <div className="bx my-6 flex flex-wrap justify-center items-center w-screen">
            <div className="card px-2 py-4 bg-pink-100 hover:bg-pink-200 rounded-2xl flex items-center justify-between m-4 md:w-2/5 w-full cursor-pointer transition duration-150 ease-out hover:ease-in hover:shadow-pink-400 hover:shadow-lg mx-6">
              <div className="txt flex flex-col items-start justify-start ml-4 ">
                <h2 className="md:text-2xl text-lg font-medium">
                  Consult
                  <br></br>
                  Doctors Online
                </h2>
                <p className="text-pink-800 font-bold">
                  250 Off on 1st Consultation
                </p>
              </div>
              <img src={doc} className="w-35 h-40"></img>
            </div>

            <div className="card px-2 py-4 bg-orange-100 hover:bg-orange-200 rounded-2xl flex items-center justify-between m-4 md:w-2/5 w-full cursor-pointer transition duration-150 ease-out hover:ease-in hover:shadow-orange-400 hover:shadow-lg mx-6">
              <div className="txt flex flex-col items-start justify-start ml-4 ">
                <h2 className="md:text-2xl font-medium text-lg">
                  Consult
                  <br></br>
                  Doctors Online
                </h2>
                <p className="text-orange-800 font-bold">
                  250 Off on 1st Consultation
                </p>
              </div>
              <img src={doc} className="w-35 h-40"></img>
            </div>

            <div className="card px-2 py-4 bg-blue-100 hover:bg-blue-200 rounded-2xl flex items-center justify-between m-4 md:w-2/5 w-full cursor-pointer transition duration-150 ease-out hover:ease-in hover:shadow-blue-400 hover:shadow-lg mx-6">
              <div className="txt flex flex-col items-start justify-start ml-4">
                <h2 className="md:text-2xl font-medium text-lg">
                  Consult
                  <br></br>
                  Doctors Online
                </h2>
                <p className="text-blue-800 font-bold">
                  250 Off on 1st Consultation
                </p>
              </div>
              <img src={doc} className="w-35 h-40"></img>
            </div>

            <div className="card px-2 py-4 bg-green-100 hover:bg-green-200 rounded-2xl flex items-center justify-between m-4 md:w-2/5 w-full cursor-pointer transition duration-150 ease-out hover:ease-in hover:shadow-green-400 hover:shadow-lg mx-6">
              <div className="txt flex flex-col items-start justify-start ml-4 ">
                <h2 className="md:text-2xl font-medium text-lg">
                  Consult
                  <br></br>
                  Doctors Online
                </h2>
                <p className="text-green-800 font-bold">
                  250 Off on 1st Consultation
                </p>
              </div>
              <img src={doc} className="w-35 h-40"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
