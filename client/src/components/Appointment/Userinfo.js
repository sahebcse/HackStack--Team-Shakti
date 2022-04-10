import React, { useEffect, useState } from "react";
import { Modal, Box } from "@mui/material";
import MapGeolocation from "../Map/MapGeolocation";
import MapPoint from "../Map/MapPoint";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#FFFFFF",
  boxShadow: 24,
  p: 4,
  outline: "none",
};
const Userinfo = ({ appointment }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    console.log("It is closing");
    console.log(modalOpen);
  };

  useEffect(() => {
    console.log(appointment);
  }, [appointment]);
  return (
    <div className="border p-5 place-content-center rounded-xl hover:shadow-2xl shadow-sm cursor-pointer transition hover:ease-linear ease-out group">
      <div onClick={handleModalOpen}>
        <img
          src={require("./static/user.png")}
          className="mx-auto h-64 group-hover:scale-90 transition hover:ease-linear ease-out"
        />
        <p className="text-center w-full text-xl font-bold">User Information</p>
      </div>
      <Modal open={modalOpen} onClose={handleClose}>
        <Box sx={style}>
          <p className="font-bold text-xl">
            Full Name <br></br>{" "}
            <span className="font-normal text-base text-zinc-400">
              {" "}
              {appointment?.patient.fullName}{" "}
            </span>{" "}
          </p>
          <p className="font-bold text-xl">
            Email <br></br>{" "}
            <span className="font-normal text-base text-zinc-400">
              {" "}
              {appointment?.patient.email}{" "}
            </span>
          </p>
          <MapPoint
            latitudeVal={appointment?.patientLatitude}
            longitudeVal={appointment?.patientLongitude}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default Userinfo;
