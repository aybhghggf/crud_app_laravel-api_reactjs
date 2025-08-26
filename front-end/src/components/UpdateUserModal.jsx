import React, { useState, useEffect } from "react";

function UpdateUserModal({ isOpen, onClose, user, onUpdateUser }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Pre-fill form when user prop changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "", // leave empty for security; user can type new password
      });
    }
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Call Dashboard function with updated data + user id
    onUpdateUser({ ...formData, id: user.id });
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-100 bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl w-96 p-6 transform transition-transform duration-300 scale-100">
        <h2 className="text-2xl font-semibold mb-5 text-gray-800 text-center">Update User</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="New Password (leave blank to keep current)"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUserModal;
