import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import App from "./App";
import InvitationPage from "./InvitationPage";
import { Toaster } from "react-hot-toast"; // ✅ import Toaster
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Router>
      {/* Toaster goes here, above Routes */}
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 3000,
        }}
      />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/invitation" element={<InvitationPage />} />
      </Routes>
    </Router>
);
