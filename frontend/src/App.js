import React, { useEffect, useState } from 'react';

function App() {
  const [healthStatus, setHealthStatus] = useState('Checking...');
  const [appointments, setAppointments] = useState([]);
  
  // Connects to the gateway URL configured via 'az staticwebapp appsettings set' [cite: 269, 270, 271, 272, 273]
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';

  useEffect(() => {
    // 1. Check Gateway Health
    fetch(`${apiUrl}/health`)
      .then(res => res.json())
      .then(data => setHealthStatus(data.status))
      .catch(err => {
        console.error("Health check failed:", err);
        setHealthStatus('Error');
      });

    // 2. Fetch Appointments
    fetch(`${apiUrl}/appointments`)
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.error("Failed to fetch appointments:", err));
  }, [apiUrl]);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>SLIIT Clinic Dashboard</h1>
      
      <div style={{ padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '8px', marginBottom: '20px' }}>
        <strong>System Status: </strong>
        <span style={{ color: healthStatus === 'ok' ? 'green' : 'red', fontWeight: 'bold' }}>
          {healthStatus === 'ok' ? 'Online' : 'Offline / Error'}
        </span>
        <div style={{ fontSize: '0.8em', color: '#666', marginTop: '5px' }}>Connected to: {apiUrl}</div>
      </div>

      <h2>Upcoming Appointments</h2>
      {appointments.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {appointments.map(app => (
            <li key={app.id} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
              <strong>{app.patient}</strong> — {app.date}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading appointments...</p>
      )}
    </div>
  );
}

export default App;