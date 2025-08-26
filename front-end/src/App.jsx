import React, { useEffect, useState } from "react";
import "./App.css";
import SuccessAlert from "./components/SuccessAlert";
import axios from "axios";
import RegisterForm from "./components/Register";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginForm from "./components/Login";
import Dashboard from "./components/Dashboard";



export default function App() {
  const [formdata, setFormdata] = useState({
    Nom: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });

  const [users, setUsers] = useState([]);
  const [sendTheRequest, setSendTheRequest] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [formLoginData, setFormLoginData] = useState({
    Email: "",
    Password: "",
  });

  // handle input change
  function handleChange(e) {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[name.toLowerCase()];
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
        const response = await axios.post(
          "http://localhost:8000/api/register",
          {
            name: formdata.Nom,
            email: formdata.Email,
            password: formdata.Password,
            password_confirmation: formdata.ConfirmPassword,
          }
        );
        console.log("Registration successful:", response.data);
        setSuccess(true);
        setErrors({});
        if(response.data) {
          setTimeout(() => setSuccess(false), 5000);
        }
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

  function handleLoginChange(e){
    const { name, value } = e.target;
    setFormLoginData((prev) => ({ ...prev, [name]: value }));
  }
            const navigate = useNavigate();

  function sendLoginRequest(status){
    if(!status) return;

    const sendRequest = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/login",
          {
            email: formLoginData.Email,
            password: formLoginData.Password,
          }
        );
        console.log("Login successful:", response.data);
        setErrors({});
        if(response.data) {
          navigate('/dashboard');
          
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setErrors({ login: "Invalid email or password" });
        } else {
          console.error("Request error:", error);
        }
      } finally {
        // Reset the trigger after the request is done
        // setSendTheRequest(false);
      }
    };

    sendRequest();
  }

useEffect(()=>{
    function getAllusers(){
  // get all users
  axios.get("http://localhost:8000/api/users")
  .then(response => {
    setUsers(response.data);
  })
  .catch(error => {
    console.error("There was an error fetching users!", error);
  } 
  );
}
getAllusers();
},[])

  return (
    <div>
      <Routes>
        <Route path="/register" element={<RegisterForm 
        formdata={formdata}
        onChange={handleChange}
        boolReq={getRequestStatus}
        ResponseErrors={errors}
        />} />
        <Route path="/login" element={<LoginForm  
              formdata={formLoginData}
              onChange={handleLoginChange}
                      sendRequest={sendLoginRequest}

        />} />
        <Route path="/dashboard" element={<Dashboard Users={users}/>} />
      </Routes> 
      {success && <SuccessAlert message="Registration successful!" />}

    </div>
  );
}
