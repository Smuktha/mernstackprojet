import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';

export default function AssignedLeads() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/upload`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        setLeads(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchLeads();
  }, []);

  return (
    <div>
      <h2>Assigned Leads</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Agent</th>
            <th>FirstName</th>
            <th>Phone</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((l) => (
            <tr key={l._id}>
              <td>{l.agent.name}</td>
              <td>{l.FirstName}</td>
              <td>{l.Phone}</td>
              <td>{l.Notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
