import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { editPatientById } from "../../api";
// import axios from "axios";

export default function Settings() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("profile"));
  const [name, setName] = useState(user.fullName);
  const [age, setAge] = useState(user.age? user.age:0);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone? user.phone:'');
  const [address, setAddress] = useState(user.address? user.address:"");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    const sendData = {
        patientId: user._id,
        fullName: name,
        age: age,
        email: email,
        phone: phone,
        address: address
    };

    try{
        const response = await editPatientById(sendData);
        if(response.status!==200)
            throw new Error("Some error occured");
        
        const data = await response.data;
        window.localStorage.setItem("profile", JSON.stringify(data));
        console.log(response);
        navigate("/dashboard");
        setSuccess(true);
    }
    catch(err){
        console.log(err);
    }

  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Fullname</label>
          <input type="text" value={name} placeholder={name} onChange={e => setName(e.target.value)}/>
          <label>Email</label>
          <input type="email" value={email} placeholder={email} onChange={e => setEmail(e.target.value)}/>
          <label>Age</label>
          <input type="number" value={age} placeholder={age} onChange={e => setAge(e.target.value)}/>
          <label>Phone number</label>
          <input type="tel" value={phone} placeholder={phone} onChange={e => setPhone(e.target.value)} />
          <label>Address</label>
          <input type="text" value={address} placeholder={address} onChange={e => setAddress(e.target.value)}/>
          <button className="settingsSubmit" type="submit">Update</button>
          {success && <span style={{color: "green"}}>Profile has been updated...</span>}
        </form>
      </div>
    </div>
  );
}