import io from 'socket.io-client';
import { useState,useEffect } from 'react'
import axios from 'axios';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { Button, TextField } from '@mui/material';
import { config } from '../../config/urlConfig'

const useStyles = makeStyles({
  selfMsg:{ 
    background: 'skyblue', 
    listStyleType: 'none',
    wordWrap: 'break-word',
    height: 'auto',
    width: '50%',
    margin: '4px',
    padding: '7px',
    color: 'white',
  },
  otherMsg:{
    background: 'salmon', 
    listStyleType: 'none',
    wordWrap: 'break-word',
    height: 'auto',
    width: '50%',
    margin: '4px',
    padding: '7px',
    color: 'white',
  }
});


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



export default function  DoctorChatWindow(props) {
  const URL = config.url;
  const worker=JSON.parse(localStorage.getItem("profile"));
  const [value, setValue] = React.useState(0);
  const classes = useStyles();


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //fixed values for testing
  const appointmentId=props.appointmentId||'6229c0748b13cd0e922d84df';
  const doctorId=props.doctorId||'6229bfc18b13cd0e922d84d6';
  const healthcareWorkerId=props.healthcareWorkerId||'6229c04c8b13cd0e922d84dc';
  const patientId=props.patientId||'6229bf4f8b13cd0e922d84d3';

  const [ptext,setpText]=useState("");
  const [htext,sethText]=useState("");
  const [pchats,setpChats]= useState([]);
  const [hchats,sethChats]=useState([]);
  const [ptypingInfo,setpTypingInfo]=useState("");
  const [htypingInfo,sethTypingInfo]=useState("");


  //fetch chat history
  useEffect(()=>{
    axios.get(`${URL}/chat/get/${appointmentId}`)
    .then((response)=>{
      response.data.chats.forEach((c)=>{
        let temp;
        let {room,msg,senderId}=c;
        if(room=='pd'){
          temp=pchats;
          temp.push({msg,senderId});
          setpChats([...temp]);
        }
        else if(room=='dh'){
          temp=hchats;
          temp.push({msg,senderId});
          sethChats([...temp]);
        }
      })
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])


  //web sockets
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket=io('http://localhost:5000', { transports: ['websocket', 'polling', 'flashsocket'] });
    socket.on("connect",()=>{
      //joining pd room
      socket.emit("join_chat_room",{
        room_name:`pd_room_${appointmentId}_${patientId}_${doctorId}`,
        user_name:worker.fullName,
        user_email:worker.email
      })
      //joining dh room
      socket.emit("join_chat_room",{
        room_name:`dh_room_${appointmentId}_${doctorId}_${healthcareWorkerId}`,
        user_name:worker.fullName,
        user_email:worker.email
      })
    })

    socket.on("receive_message",(data)=>{
        // console.log("message",msg);
        let {msg,senderId,room,user_name,user_email}=data;
        let temp;
        if(room=='pd'){
          setpTypingInfo("");
          temp=pchats;
          temp.push({msg,senderId});
          setpChats([...temp]);
        }
        else if(room=='dh'){
          sethTypingInfo("");
          temp=hchats;
          temp.push({msg,senderId});
          sethChats([...temp]);
        }
    })

    socket.on("typing",(data)=>{
      let {room,user_name}=data;
      if(room=='pd'){
        setpTypingInfo(`${user_name} is typing...`);
      }
      else if(room=='dh'){
        sethTypingInfo(`${user_name} is typing...`);
      }
    })

    setSocket(socket);
    return () => socket.close();
  }, [setSocket]);
 

  return (
    <Box className='border p-2 shadow-2xl'>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Chat with Patient" {...a11yProps(0)} />
          <Tab label="Chat with Healthcare Worker" {...a11yProps(1)} />
        </Tabs>
      </Box>

      {/* CHAT WITH PATIENT */}
      <TabPanel value={value} index={0}>
        <Box>
          <ul className='flex flex-col'>
            {pchats.map(({msg,senderId},idx)=>{
              if(senderId==doctorId)
                return <li key={idx} className={`${classes.selfMsg} self-end`}>{msg}</li>
              else
                return <li key={idx} className={`${classes.otherMsg} self-start`}>{msg}</li> 
            })}
          </ul>
          <p className='text-purple-500'>{ptypingInfo}</p>
          <div className='flex items-stretch mt-4'>
            <TextField
              multiline={true}
              type="text" 
              name="ptext"
              value={ptext} 
              onChange={(e)=>{
                setpText(e.target.value);
              }}
              className='w-4/5'
              onKeyPress={(e)=>{
                socket.emit("typing",{
                  room_name:`pd_room_${appointmentId}_${patientId}_${doctorId}`,
                  room:'pd',
                  user_name:worker.fullName,
                  user_email:worker.email
                })
              }}/>
            <Button 
              variant='contained'
              color='secondary' 
              className='w-1/5' 
              onClick={()=>{
                socket.emit("send_message",{
                  room_name:`pd_room_${appointmentId}_${patientId}_${doctorId}`,
                  msg:ptext,
                  appointmentId,
                  senderId:doctorId,
                  room:'pd',
                  model:'Doctor',
                  user_name:worker.fullName,
                  user_email:worker.email
                })
                setpText("");
            }}>SEND</Button>
          </div>
        </Box>     
      </TabPanel>

      {/* CHAT WITH HEALTHWORKER */}
      <TabPanel value={value} index={1}>
        <Box>
          <ul className='flex flex-col'>
            {hchats.map(({msg,senderId},idx)=>{
              if(senderId==doctorId)
                return <li key={idx} className={`${classes.selfMsg} self-end`}>{msg}</li>
              else
                return <li key={idx} className={`${classes.otherMsg} self-start`}>{msg}</li> 
            })}
          </ul>
          <p className='text-purple-500'>{htypingInfo}</p>
          <div className='flex items-stretch mt-4'>
            <TextField
              multiline={true}
              type="text"
              name="htext"
              value={htext}
              onChange={(e)=>{
                sethText(e.target.value);
              }} 
              className='w-4/5'
              onKeyPress={(e)=>{
                socket.emit("typing",{
                  room_name:`dh_room_${appointmentId}_${doctorId}_${healthcareWorkerId}`,
                  room:'dh',
                  user_name:worker.fullName,
                  user_email:worker.email
                })
              }} />
            <Button 
              variant='contained'
              color='secondary' 
              className='w-1/5'
              onClick={()=>{
                socket.emit("send_message",{
                  room_name:`dh_room_${appointmentId}_${doctorId}_${healthcareWorkerId}`,
                  msg:htext,
                  appointmentId,
                  senderId:doctorId,
                  room:'dh',
                  model:'Doctor',
                  user_name:worker.fullName,
                  user_email:worker.email
                })
                sethText("");
            }}>SEND</Button>
          </div>
        </Box>
      </TabPanel>

    </Box>
  );
}



