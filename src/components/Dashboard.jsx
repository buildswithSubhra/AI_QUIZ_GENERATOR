import React from 'react';
import { Link } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Cpu, FileText, Layout } from 'lucide-react';

const Dashboard = () => {
  const { user } = useUser();

  return (
    <div className="container">
      <nav style={{ 
        position: 'fixed', 
        top: 0, 
        width: '100%', 
        padding: '1.5rem 2rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: 'rgba(5, 5, 5, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 100
      }}>
        <h2 className="orbitron gradient-text" style={{ fontSize: '1.2rem' }}>NEURAL DASH</h2>
        <UserButton afterSignOutUrl="/" />
      </nav>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', marginTop: '4rem' }}
      >
        <h1 className="orbitron" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          WELCOME, <span className="gradient-text">{user?.firstName || 'INITIATE'}</span>
        </h1>
        <p style={{ color: 'var(--text-dim)', marginBottom: '3rem' }}>SELECT YOUR KNOWLEDGE EXTRACTION METHOD</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '800px' }}>
          <Link to="/topic-quiz" style={{ textDecoration: 'none' }}>
            <motion.div 
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px var(--primary-glow)' }}
              className="glass-card" 
              style={{ padding: '2rem', height: '100%' }}
            >
              <Cpu size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
              <h3 className="orbitron" style={{ color: 'var(--primary)', marginBottom: '1rem' }}>TOPIC ENGINE</h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>GENERATE QUIZ FROM ANY CONCEPT IN THE NEURAL NETWORK</p>
              <button className="btn-primary" style={{ marginTop: '1.5rem' }}>INITIALIZE</button>
            </motion.div>
          </Link>

          <Link to="/dataset-quiz" style={{ textDecoration: 'none' }}>
            <motion.div 
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px var(--secondary-glow)' }}
              className="glass-card" 
              style={{ padding: '2rem', height: '100%' }}
            >
              <FileText size={48} color="var(--secondary)" style={{ marginBottom: '1.5rem' }} />
              <h3 className="orbitron" style={{ color: 'var(--secondary)', marginBottom: '1rem' }}>DATASET PARSER</h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>UPLOAD DATA TO EXTRACT KNOWLEDGE PARAMETERS</p>
              <button className="btn-secondary" style={{ marginTop: '1.5rem' }}>INITIALIZE</button>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
