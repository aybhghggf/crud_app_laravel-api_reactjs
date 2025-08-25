import React from 'react';

function Errors({ errors, ResponseErrors }) {
  return (
    <div className="mb-6">
      <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm">
        {/* simple array errors */}
        {errors &&
          errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}

        {/* object errors from server */}
        {ResponseErrors &&
          Object.entries(ResponseErrors).map(([key, messages]) =>
            messages.map((message, index) => (
              <p key={`${key}-${index}`}>{message}</p>
            ))
          )}
      </div>
    </div>
  );
}

export default Errors;
