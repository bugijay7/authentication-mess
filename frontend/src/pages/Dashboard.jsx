import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <h1>Welcome, {username}!</h1>
        <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
          Here’s your personalized dashboard. Keep track of your progress and explore new features.
        </p>

        <blockquote style={{ margin: '2rem 0', fontStyle: 'italic', color: '#555' }}>
          "Success is not final, failure is not fatal: It is the courage to continue that counts." – Winston Churchill
        </blockquote>

        <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
          <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px' }}>
            <h3>Tasks Completed</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>27</p>
          </div>
          <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px' }}>
            <h3>Projects Active</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>4</p>
          </div>
          <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px' }}>
            <h3>Messages</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>12</p>
          </div>
        </div>

        <div style={{ marginTop: '3rem' }}>
          <h2>What’s New?</h2>
          <ul>
            <li>🔹 New dark mode feature released</li>
            <li>🔹 Analytics dashboard redesigned</li>
            <li>🔹 Performance updates in progress</li>
          </ul>
        </div>
      </div>

      <button
        onClick={handleLogout}
        style={{
          marginTop: '2rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#d9534f',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          alignSelf: 'flex-start',
          cursor: 'pointer'
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;
