import React, { useState } from "react";
import Errors from "./Errors";

export default function RegisterForm({getDataFromChildren, boolReq }) {


    const [Nom, setNom] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [ArrayOfErrors,setArrayOfErrors] = useState([]);
    const [sendReq,setSendReq] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
       let  erreurs = [];
        if (Nom.length < 3) {
            erreurs.push("Votre nom doit contenir au moins 3 caractères.");
        }else if (Nom.length > 20) {
            erreurs.push("Votre nom ne doit pas dépasser 20 caractères.");
        }
        if (!/\S+@\S+\.\S+/.test(Email)) {
            erreurs.push("Veuillez entrer une adresse email valide.");
        }
        if (Password.length < 6) {
            erreurs.push("Votre mot de passe doit contenir au moins 6 caractères.");
        }
        if (Password !== ConfirmPassword) {
            erreurs.push("Les mots de passe ne correspondent pas.");
        }
        setArrayOfErrors(erreurs);
        if (erreurs.length === 0) {
            getDataFromChildren(Nom, Email, Password, ConfirmPassword);
            setSendReq(true);
            boolReq(true);
        }
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Create Account
        </h2>

        
        {ArrayOfErrors.length > 0 && <Errors errors={ArrayOfErrors} />}
        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Name
          </label>
          <input
            name="Nom"
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={Nom} 
            onChange={(e) => setNom(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            name="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            name="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Confirm Password
          </label>
          <input

            value={ConfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
            onClick={handleSubmit}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Register
        </button>

        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
