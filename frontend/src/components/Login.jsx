import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setToken, setUser } from '../utils/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('/api/auth/login', { email, password });
      setToken(res.data.token);
      setUser(res.data.user);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err.response?.data || err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
          padding: '30px 25px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: 20, color: '#2575fc' }}>
          Welcome Back
        </h2>

        {error && (
          <div
            style={{
              background: '#ffe0e0',
              color: '#d93025',
              padding: '10px',
              borderRadius: 6,
              marginBottom: 12,
              fontSize: '0.9rem',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 5, color: '#333' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 6,
                border: '1px solid #ccc',
                outline: 'none',
                fontSize: '1rem',
              }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 5, color: '#333' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 6,
                border: '1px solid #ccc',
                outline: 'none',
                fontSize: '1rem',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
              color: 'white',
              fontSize: '1rem',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              transition: '0.3s',
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background =
                'linear-gradient(135deg, #2575fc, #6a11cb)')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background =
                'linear-gradient(135deg, #6a11cb, #2575fc)')
            }
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: 15, textAlign: 'center', color: '#555', fontSize: '0.9rem' }}>
          Don’t have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            style={{ color: '#2575fc', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}
