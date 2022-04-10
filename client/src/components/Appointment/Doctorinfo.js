import React, { useEffect, useState } from "react";
import { Modal, Box } from "@mui/material";
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

const Doctorinfo = ({ appointment }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => setModalOpen(false);
  useEffect(() => {
    console.log(appointment);
    if (appointment?.doctor) {
      console.log("Doctor exists");
    } else {
      console.log("Doctor doesn't exist");
    }
  }, [appointment]);
  return (
    <div className="border p-5 place-content-center rounded-xl hover:shadow-2xl shadow-sm cursor-pointer transition hover:ease-linear ease-out group">
      <div onClick={handleModalOpen}>
        <img
          src={require("./static/doctor.png")}
          className="mx-auto h-64 group-hover:scale-90 transition hover:ease-linear ease-out"
        />
        <p className="text-center w-full text-xl font-bold">
          Doctor Information
        </p>
      </div>

      <Modal open={modalOpen} onClose={handleClose}>
        <Box sx={style}>
          {appointment?.doctor ? (
            <div>
              <p className="font-bold text-xl">
                Full Name <br></br>{" "}
                <span className="font-normal text-base text-zinc-400">
                  {appointment?.doctor.fullName}
                </span>{" "}
              </p>
              <p className="font-bold text-xl">
                Email <br></br>{" "}
                <span className="font-normal text-base text-zinc-400">
                  {" "}
                  {appointment?.doctor.email}{" "}
                </span>
                <MapPoint
                  latitudeVal={appointment?.doctorLatitude}
                  longitudeVal={appointment?.doctorLongitude}
                />
              </p>
            </div>
          ) : (
            <div>Doctor doesn't exist</div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Doctorinfo;
