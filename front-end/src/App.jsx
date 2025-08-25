import React, { useEffect, useState } from "react";
import "./App.css";
import SuccessAlert from "./components/SuccessAlert";
import axios from "axios";
import RegisterForm from "./components/Register";

export default function App() {
  const [formdata, setFormdata] = useState({
    Nom: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });

  const [sendTheRequest, setSendTheRequest] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // handle input change
  function handleChange(e) {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[name.toLowerCase()]; // remove error for this field
      return copy;
    });
  }

  // handle submit trigger
  function getRequestStatus(status) {
    setSendTheRequest(status);
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
        setSuccess(true);
        setErrors({});
      } catch (error) {
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          console.error("Request error:", error);
        }
      } finally {
        setSendTheRequest(false);
      }
    };

    sendRequest();
  }, [sendTheRequest, formdata]);

  return (
    <div>
      {success && <SuccessAlert message="Registration successful!" />}
      <RegisterForm
        formdata={formdata}
        onChange={handleChange}
        boolReq={getRequestStatus}
        ResponseErrors={errors}
      />
    </div>
  );
}
