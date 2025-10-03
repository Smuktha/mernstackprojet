import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

export default function AgentsList() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    async function fetchAgents() {
      try {
        const res = await axios.get(`/api/agents`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setAgents(res.data.agents || []);
      } catch (err) {
        console.error("Error loading agents", err);
      }
    }
    fetchAgents();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f4ff, #e6f7ff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 700,
          background: "#fff",
          padding: 25,
          borderRadius: 12,
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 20,
            color: "#2575fc",
          }}
        >
          Agents List
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.95rem",
          }}
        >
          <thead style={{ background: "#e6f0ff" }}>
            <tr>
              <th style={{ padding: 10, border: "1px solid #ccc" }}>Name</th>
              <th style={{ padding: 10, border: "1px solid #ccc" }}>Email</th>
              <th style={{ padding: 10, border: "1px solid #ccc" }}>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((a) => (
              <tr key={a._id} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={{ padding: 10 }}>{a.name}</td>
                <td style={{ padding: 10 }}>{a.email}</td>
                <td style={{ padding: 10 }}>{a.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
