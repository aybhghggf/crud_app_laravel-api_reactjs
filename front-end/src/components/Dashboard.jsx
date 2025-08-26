import React, { useContext, useState } from "react";
import axios from "axios";
import UsersContext from "../contexts/UsersContext";
import AddUserModal from "./AddUserModal";
import UpdateUserModal from "./UpdateUserModal";
import SuccessAlert from "./SuccessAlert";

export default function Dashboard() {
  const { users, getAllUsers } = useContext(UsersContext);

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Delete user
  function handleDeleteUser(id) {
    axios
      .delete(`http://localhost:8000/api/users/${id}`)
      .then(() => getAllUsers())
      .catch((err) => console.error(err));
  }

  // Add user
  function handleAddUser(userData) {
    axios
      .post("http://localhost:8000/api/register", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.password,
      })
      .then(() => {
        getAllUsers();
        setShowSuccessAlert(true);
        setTimeout(() => setShowSuccessAlert(false), 5000);
        setIsAddUserModalOpen(false);
      })
      .catch((err) => console.error(err));
  }

  // Update user
  function handleUpdateUser(updatedUser) {
    axios
      .put(`http://localhost:8000/api/users/${updatedUser.id}`, {
        name: updatedUser.name,
        email: updatedUser.email,
        password: updatedUser.password,
        password_confirmation: updatedUser.password,
      })
      .then((response) => {
        getAllUsers();
        setIsUpdateUserModalOpen(false);
        setShowSuccessAlert(true);
        setTimeout(() => setShowSuccessAlert(false), 5000);
      })
      .catch((err) => { console.error(err.response.data.message);alert(err.response.data.message) } );
  }

  return (
    <>
      {showSuccessAlert && <SuccessAlert message="The Operation has been completed succusfuly" />}

      {isAddUserModalOpen && (
        <AddUserModal
          isOpen={isAddUserModalOpen}
          onClose={() => setIsAddUserModalOpen(false)}
          onAddUser={handleAddUser}
        />
      )}

      {isUpdateUserModalOpen && selectedUser && (
        <UpdateUserModal
          isOpen={isUpdateUserModalOpen}
          onClose={() => setIsUpdateUserModalOpen(false)}
          user={selectedUser}
          onUpdateUser={handleUpdateUser}
        />
      )}

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">User Management</h1>
            <p className="text-gray-600">Manage your users here</p>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setIsAddUserModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              + Add User
            </button>

            <input
              type="text"
              placeholder="Search users..."
              className="border border-gray-300 rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">#</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{index + 1}</td>
                    <td className="py-3 px-4 text-gray-900 font-medium">{user.name || user.Nom}</td>
                    <td className="py-3 px-4 text-gray-600">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        {user.role || "User"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setIsUpdateUserModalOpen(true);
                          }}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {users.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
