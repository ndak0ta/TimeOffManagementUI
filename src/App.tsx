import React, { useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div className="App">
      <p>{token}</p>
    </div>
  );
}

export default App;
