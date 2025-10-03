import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';

export default function AddAgent({ onAgentAdded }) {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/agents/add`, form, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setMessage(res.data.message);
      setForm({ name: '', email: '', mobile: '', password: '' });
      if (onAgentAdded) onAgentAdded();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to add agent');
    }
  };

  return (
    <div>
      <h2>Add Agent</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile" required />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
        <button type="submit">Add Agent</button>
      </form>
    </div>
  );
}
