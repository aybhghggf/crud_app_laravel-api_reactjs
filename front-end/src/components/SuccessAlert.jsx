import React, { useState } from "react";

function SuccessAlert({ message }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between bg-green-100 text-green-700 px-4 py-2 rounded-lg shadow">
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={() => setVisible(false)}
          className="ml-2 text-green-700 hover:text-green-900 font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default SuccessAlert;
