import React, { useEffect, useState } from "react";
import axios from "axios";
import UsersContext from "../contexts/UsersContext";
export default function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);

  function getAllUsers() {
    axios
      .get("http://localhost:8000/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ users, getAllUsers }}>
      {children}
    </UsersContext.Provider>
  );
}
