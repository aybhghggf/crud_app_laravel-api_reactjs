import React from "react";
import UsersContext from "../contexts/UsersContext";
import { useContext } from "react";
import axios from "axios";
export default function Dashboard() {
  const { users ,getAllUsers} = useContext(UsersContext);


    function handeDeleteUser(id){
      // delete user by id
       axios.delete(`http://localhost:8000/api/users/${id}`)
       .then(response => {
        console.log("User deleted:", response.data);
        getAllUsers();
       }
        ).catch(error => {
        console.error("There was an error deleting the user!", error);  
        });
    }


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <p className="text-gray-600">Manage all registered users here.</p>
      </header>

      {/* Actions */}
      <div className="flex justify-between items-center mb-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add User
        </button>

        <input
          type="text"
          placeholder="Search users..."
          className="px-4 py-2 border rounded-lg w-1/3"
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, index) => (
                <tr key={user.id} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{user.Nom}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role || 'User'}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                      Edit
                    </button>
                    <button
                      onClick={() => {handeDeleteUser(user.id)}}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            }
            
            
          </tbody>
        </table>
      </div>
    </div>
  );
}
