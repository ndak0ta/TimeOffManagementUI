import React, { useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./redux/store";

export default function App() {
  const token = useSelector((state: any) => state.token.token);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }

  }, [token, navigate, dispatch]);

  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}
