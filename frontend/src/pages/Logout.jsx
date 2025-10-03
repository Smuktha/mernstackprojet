import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeToken, removeUser } from "../utils/auth";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    
    removeToken();
    removeUser();

    
    const timer = setTimeout(() => {
      navigate("/login");
    }, 1200);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f4ff, #e6f7ff)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px 40px",
          borderRadius: 12,
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#2575fc", marginBottom: 10 }}>Logging out...</h2>
        <p style={{ color: "#555" }}>You’ll be redirected to the login page shortly.</p>
      </div>
    </div>
  );
}
