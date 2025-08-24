import React from 'react'


function Errors({ errors }) {

    console.log(errors);
  return (
            <div className="mb-6">
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm">
                {
                    errors.map((error, index) => (
                    <p key={index}>{error}</p>
                     ))
                }
          </div>
        </div>
  )
}

export default Errors