import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register.jsx";

import OtpVerify from "./Pages/OtpVerify.jsx";
import Login from "./Pages/Login.jsx";
import Home from "./Pages/Home.jsx";
import AddNotes from "./Pages/AddNotes.jsx";
import EditNotes from "./Pages/EditNotes.jsx";
import TaggedNotes from "./Pages/TaggedNotes.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/verifyOtp/:email" element={<OtpVerify />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homePage" element={<Home />} />
          <Route path="/addNotes" element={<AddNotes />} />
          <Route path="/editNote/:id" element={<EditNotes />} />
          <Route path="/tagsPage" element={<TaggedNotes />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
