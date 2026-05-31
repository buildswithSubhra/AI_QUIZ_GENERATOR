import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY || 'pk_test_aGVhbHRoeS1iYWRnZXItMC5jbGVyay5hY2NvdW50cy5kZXYk';

if (!PUBLISHABLE_KEY) {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <div className="container">
      <div className="glass-card" style={{ textAlign: 'center' }}>
        <h2 className="orbitron" style={{ color: '#ff4b4b' }}>CONFIGURATION ERROR</h2>
        <p style={{ margin: '1.5rem 0', color: 'var(--text-dim)' }}>MISSING CLERK PUBLISHABLE KEY. PLEASE CHECK YOUR ENVIRONMENT VARIABLES.</p>
      </div>
    </div>
  );
} else {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <App />
      </ClerkProvider>
    </React.StrictMode>
  );
}
