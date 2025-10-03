import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFile = e => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return setMessage('Select a file');
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, formData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div>
      <h2>Upload CSV & Assign</h2>
      <input type="file" accept=".csv" onChange={handleFile} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
}
