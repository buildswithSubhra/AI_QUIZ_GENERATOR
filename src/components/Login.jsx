import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { motion } from 'framer-motion';

const Login = () => {
  return (
    <div className="container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-card"
        style={{ textAlign: 'center' }}
      >
        <h1 className="gradient-text" style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>NEURAL QUIZ</h1>
        <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>LOG IN TO ACCESS THE GENERATIVE ENGINE</p>
        
        <SignIn 
          appearance={{
            elements: {
              rootBox: "cl-rootBox",
              card: "cl-card",
            }
          }}
          routing="path" 
          path="/" 
        />
      </motion.div>
    </div>
  );
};

export default Login;
