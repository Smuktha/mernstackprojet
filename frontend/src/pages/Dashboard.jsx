// frontend/src/dashboard.jsx
import React, { useState, useEffect } from "react";
import { getUser, removeToken, removeUser, getToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import AddAgent from "../components/AddAgent";
import UploadPage from "../components/UploadPage";
import AssignedLeads from "../components/AssignedLeads";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const userInfo = getUser();

  const [agents, setAgents] = useState([]);
  const [assignedLeads, setAssignedLeads] = useState([]);

  // Fetch agents from backend
  const fetchAgents = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/agents`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setAgents(res.data.agents || res.data);
    } catch (err) {
      console.error("Fetch agents error:", err.response?.data);
    }
  };

  // Fetch assigned leads from backend
  const fetchLeads = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/upload`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setAssignedLeads(res.data);
    } catch (err) {
      console.error("Fetch leads error:", err.response?.data);
    }
  };

  useEffect(() => {
    fetchAgents();
    fetchLeads();
  }, []);

  // Delete all assigned leads
  const handleDeleteLeads = async () => {
    if (!window.confirm("Are you sure you want to delete all assigned leads?")) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/upload`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setAssignedLeads([]);
      alert("All assigned leads deleted successfully");
    } catch (err) {
      console.error("Delete leads error:", err.response?.data);
      alert("Failed to delete leads");
    }
  };

  const handleLogout = () => {
    removeToken();
    removeUser();
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", padding: 20 }}>
      {userInfo && (
        <h2 style={{ textAlign: "center", marginBottom: 30 }}>
          Welcome, <strong>{userInfo.name}</strong>!
        </h2>
      )}

      {/* Top section: Add Agent & Upload CSV */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start" }}>
        <div style={{ background: "#fff", padding: 16, borderRadius: 8, boxShadow: "0 0 6px rgba(0,0,0,0.06)" }}>
          <AddAgent onAgentAdded={fetchAgents} />
        </div>

        <div style={{ background: "#fff", padding: 16, borderRadius: 8, boxShadow: "0 0 6px rgba(0,0,0,0.06)" }}>
          <UploadPage onUploadComplete={fetchLeads} />
        </div>
      </div>

      {/* Agents list */}
      <div style={{ marginTop: 30, background: "#fff", padding: 16, borderRadius: 8 }}>
        <h2 style={{ textAlign: "center" }}>Agents List</h2>
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", textAlign: "center", width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((a) => (
              <tr key={a._id}>
                <td>{a.name}</td>
                <td>{a.email}</td>
                <td>{a.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Assigned leads list with delete button */}
      <div style={{ marginTop: 30, background: "#fff", padding: 16, borderRadius: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Assigned Leads</h2>
          <button
            onClick={handleDeleteLeads}
            style={{ padding: "6px 12px", background: "red", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer" }}
          >
            Delete All Leads
          </button>
        </div>
        <AssignedLeads leads={assignedLeads} />
      </div>

      {/* Logout button */}
      <div style={{ marginTop: "auto", textAlign: "center" }}>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            background: "red",
            color: "#fff",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
            marginTop: 20,
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
