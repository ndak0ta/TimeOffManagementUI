import React, { useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";

export default function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}
