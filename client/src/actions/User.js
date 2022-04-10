import * as api from '../api'
//Doctor 
export const getUnconfirmedAppoinment = async (setAppoinments)=>{
    try {
        const response = await api.getUnconfirmedAppoinment();

      if (response.status !== 200) throw Error(response.data.message);
      const data = response.data;
      setAppoinments(data.filter(appointment=>appointment.status==="created"))
    } catch (error) {
        console.log(error.message)
    }
}

export const getUnconfirmedEmergency = async (setAppoinments, sendData)=>{
    try {
        const response = await api.getUnconfirmedEmergency(sendData);

      if (response.status !== 200) throw Error(response.data.message);
      const data = response.data;
      setAppoinments(data)
    } catch (error) {
        console.log(error.message)
    }
}

export const getBookedAppointments = async (setBookedAppointments, sendData)=>{
    try {
        const response = await api.getDoctorAppointments(sendData);

      if (response.status !== 200) throw Error(response.data.message);
      const data = response.data;
      console.log("doc",data)
      setBookedAppointments(data)
    } catch (error) {
        console.log(error.message)
    }
}

export const getResolvedAppointments = async (getResolvedAppointments, sendData)=>{
    try {
        const response = await api.getDoctorAppointments(sendData);

      if (response.status !== 200) throw Error(response.data.message);
      const data = response.data;
      getResolvedAppointments(data)
    } catch (error) {
        console.log(error.message)
    }
}

export const getAppoinmentDataById = async (setAppoinment, sendData)=>{
    try {
        const response = await api.getAppoinmentDataById(sendData);

      if (response.status !== 200) throw Error(response.data.message);
      const data = response.data;
      setAppoinment(data)
    } catch (error) {
        console.log(error.message)
    }
}

export const confirmAppointment = async (sendData, navigate)=>{
    try {
        const response = await api.confirmAppointment(sendData);

      if (response.status !== 200) throw Error(response.data.message);
      const data = response.data;
      console.log(data)
      navigate('/dashboard')
    } catch (error) {
        console.log(error.message)
    }
}

export const uploadPrescription = async (sendData, navigate)=>{
    try {
        const response = await api.uploadPrescription(sendData);

      if (response.status !== 200) throw Error(response.data.message);
      const data = response.data;
      console.log(data)
      navigate('/dashboard')
    } catch (error) {
        console.log(error.message)
    }
}

export const confirmPrescription = async (setPrescriptions)=>{
    try {
        const response = await api.confirmPrescription();

      if (response.status !== 200) throw Error(response.data.message);
      const data = response.data;
      console.log(data)
      setPrescriptions(data)
      console.log(data)
    } catch (error) {
        console.log(error.message)
    }
}
export const assignPrescription = async (sendData)=>{
    try {
        const response = await api.assignPrescription(sendData);

      if (response.status !== 200) throw Error(response.data.message);
      const data = response.data;
      console.log(data)
    } catch (error) {
        console.log(error.message)
    }
}

export const getBookedPrescriptions= async ()=>{

}

export const getResolvedPrescriptions=async ()=>{

}
