import React, { useEffect } from "react";
import "./App.css";
import RegisterForm from "./components/Register";
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [formdata, setFormdata] = useState({
    Nom: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });

  const [sendTheRequest, setSendTheRequest] = useState(false);

  const [error, setError] = useState(null);
  function getData(nom, email, password, confirmPassword) {
    setFormdata({
      Nom: nom,
      Email: email,
      Password: password,
      ConfirmPassword: confirmPassword,
    });
  }

 useEffect(() => {
  if (!sendTheRequest) return; 

  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        name: formdata.Nom, 
        email: formdata.Email,
        password: formdata.Password,
        password_confirmation: formdata.ConfirmPassword,
      });
      console.log("Registration successful:", response.data);
    } catch (error) {

      if (error.response && error.response.data.errors) {
        console.error("Validation errors:", error.response.data.errors);
        setError(error.response.data.errors);
      } else {
        console.error("Request error:", error);
      }
    } finally {
      setSendTheRequest(false); 
    }
  };

  sendRequest();
}, [sendTheRequest, formdata]);


  function getRequestStatus(status) {
    setSendTheRequest(status);
    console.log(sendTheRequest);
  }
  return (
    <div>
      <RegisterForm getDataFromChildren={getData} boolReq={getRequestStatus} NewErrorsFromRequest={error}  />
    </div>
  );
}
