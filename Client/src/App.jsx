import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register.jsx";

import OtpVerify from "./Pages/OtpVerify.jsx";
import Login from "./Pages/Login.jsx";



import Profile from "../Pages/Profile.jsx";
import EditProfile from "../Pages/EditProfile.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/verifyOtp/:email" element={<OtpVerify />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homePage" element={<Profile />} />
         
          <Route path="/editNote/:id" element={<EditProfile />} />
         
        </Routes>
      </Router>
    </>
  );
}

export default App;
