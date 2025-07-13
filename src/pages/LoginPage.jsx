import React from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/auth/Login";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSwitchToSignup = () => {
    navigate("/signup");
  };

  return <Login onSwitchToSignup={handleSwitchToSignup} />;
};

export default LoginPage; 