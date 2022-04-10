import React, { useEffect, useState, useRef } from "react";
import Peer from "peerjs";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
//Material UI imports
import {
  Button,
  Container,
  Grid,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import MicOpenIcon from "@mui/icons-material/Mic";
import MicCloseIcon from "@mui/icons-material/MicOff";
import VideoOpenIcon from "@mui/icons-material/Videocam";
import VideoCloseIcon from "@mui/icons-material/VideocamOff";
import VideoEndIcon from "@mui/icons-material/MissedVideoCall";
import FileCopyIcon from "@mui/icons-material/FileCopy";

import { useDispatch } from "react-redux";
import { NotificationManager } from "react-notifications";

import { CopyToClipboard } from "react-copy-to-clipboard";

import { config } from "../../config/urlConfig";

import { v4 as uuidv4 } from "uuid";

const URL = config.url;

const socket = io(URL);

const useStyles = makeStyles((theme) => ({
  webCam: {
    backgroundColor: "rgb(158 158 158 / 36%)",
  },

  videoRefCollapsed: {
    width: "200px",
    height: "200px",
    objectFit: "cover",
  },

  videoRef: {
    width: "400px",
    height: "400px",
    objectFit: "cover",
  },
  editorWindow: {
    backgroundColor: "#252520",
    color: "#FF9B36",
  },
  controlButtons: {
    margin: "3px",
  },
  controlButtonAlt: {
    borderColor: "#f50057",
    color: "#f50057",
    marginRight: "5px",
    borderRadius: "0%",
    "&:hover": {
      backgroundColor: "#f50057",
      color: "white",
      borderColor: "#f50057",
    },
  },
  headingText: {
    color: "white",
    fontWeight: "200",
  },
}));

export default function Room() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [stream, setStream] = useState();

  const [myPeer, setMyPeer] = useState();
  const [userId, setUserId] = useState();
  const id = useParams();
  const roomId = `${id.id}room`;
  const [micOpen, setMicOpen] = useState(true);
  const [videoOpen, setVideoOpen] = useState(true);

  const peers = {};

  //References fro editor and videos
  const myVideo = useRef();
  const userVideo = useRef();

  //Getting user Media permissons
  useEffect(() => {
   
    const newPeer = new Peer(uuidv4(), {
      host: 'peerservex.herokuapp.com',
      port:80,
      path:'/peerjs/myapp'
    });
    setMyPeer(newPeer);
    newPeer.on("open", (id) => {
      console.log("user connected...", id);
      setUserId(id);
      socket.emit("join-room", roomId, id);
    });
    NotificationManager.success("Starting Interview....", "Created Room");
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((currentStream) => {
        myVideo.current.srcObject = currentStream;

        socket.on("meeting-closed-exit", () => {
          console.log("meeting is closed");
          if (!userVideo.current?.srcObject) {
            const tracks = currentStream.getTracks();
            tracks.forEach((track) => track.stop());
          }
        });

        socket.on("user-connected", (id) => {
          if (userVideo.current?.srcObject) {
            socket.emit("meeting-closed");
          } else {
            socket.emit("giving-back-id");

            console.log("new user", id);
            if (id !== userId) {
              const call = newPeer.call(id, currentStream);
              console.log("this is call", call);
              console.log("chal raha hai yeh...");
              call.on("stream", (userVideoStream) => {
                console.log("getting new user", userVideoStream);
                userVideo.current.srcObject = userVideoStream;
              });

              peers[id] = call;
            }
          }
        });

        newPeer.on("call", (call) => {
          console.log("user is caling....");
          call.answer(currentStream);
          call.on("stream", (userVideoStream) => {
            if (userVideo.current)
              userVideo.current.srcObject = userVideoStream;
          });
        });
      });

    socket.on("user-disconnected", (id) => {
      console.log("user disconnected...", id);
      if (peers[id]) {
        userVideo.current.srcObject = null;
        peers[id].close();
      }
    });
  }, []);

  const handleMicToggle = () => {
    const enabled = myVideo.current.srcObject.getAudioTracks()[0].enabled;
    if (enabled) {
      myVideo.current.srcObject.getAudioTracks()[0].enabled = false;
      setMicOpen(false);
    } else {
      myVideo.current.srcObject.getAudioTracks()[0].enabled = true;
      setMicOpen(true);
    }
  };

  const handleVideoToggle = () => {
    const enabled = myVideo.current.srcObject.getVideoTracks()[0].enabled;
    if (enabled) {
      myVideo.current.srcObject.getVideoTracks()[0].enabled = false;
      setVideoOpen(false);
    } else {
      myVideo.current.srcObject.getVideoTracks()[0].enabled = true;
      setVideoOpen(true);
    }
  };

  const handleLeaveCall = () => {
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    NotificationManager.error("", "Ending Interview");
    // stream.getaudioTracks.forEach(track =>{
    //     track.stop()
    // })
    socket.disconnect();
  };

  return (
    <Container className="mt-3">
      <Grid container>
        <Grid item sm={12} md={12} className={classes.webCam}>
          <Grid container align="center" className="m-2">
            <Grid item sm={6}>
              <Grid item sm={12} md={12}>
                <video
                  className={classes.videoRef}
                  playsInline
                  muted
                  ref={myVideo}
                  autoPlay
                ></video>
              </Grid>
              <Grid item sm={12} md={12} align="space-between">
                {micOpen ? (
                  <Button
                    className={classes.controlButtonAlt}
                    variant="outlined"
                    color="secondary"
                    onClick={handleMicToggle}
                  >
                    <MicCloseIcon />
                  </Button>
                ) : (
                  <Button
                    className={classes.controlButtons}
                    onClick={handleMicToggle}
                  >
                    <MicOpenIcon />
                  </Button>
                )}
                {videoOpen ? (
                  <Button
                    className={classes.controlButtonAlt}
                    variant="outlined"
                    color="secondary"
                    onClick={handleVideoToggle}
                  >
                    <VideoCloseIcon />
                  </Button>
                ) : (
                  <Button
                    className={classes.controlButtons}
                    onClick={handleVideoToggle}
                  >
                    <VideoOpenIcon />
                  </Button>
                )}
                <Button
                  className={classes.controlButtonAlt}
                  onClick={handleLeaveCall}
                  variant="outlined"
                >
                  <VideoEndIcon />
                  Leave
                </Button>
              </Grid>
            </Grid>
            <Grid item sm={6}>
              <video
                className={classes.videoRef}
                playsInline
                ref={userVideo}
                autoPlay
              ></video>
            </Grid>
          </Grid>
        </Grid>
        <div className="px-2 h-20 w-25 mt-7">
          <CopyToClipboard
            text={`${window.location.href}`}
            onCopy={() => {
              NotificationManager.info("", "Copied Room Link");
            }}
          >
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 border border-blue-700 rounded">
              Room Link
              <FileCopyIcon className="ml-1 text-black" fontSize="default" />
            </button>
          </CopyToClipboard>
        </div>

        <div className="px-2 h-20 w-25 mt-7">
          <CopyToClipboard
            text={`${id.id}`}
            onCopy={() => {
              NotificationManager.warning("", "Copied Stream Id");
            }}
          >
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 border border-blue-700 rounded">
              Stream Id
              <FileCopyIcon className="ml-1 text-black" fontSize="default" />
            </button>
          </CopyToClipboard>
        </div>
      </Grid>
    </Container>
  );
}
