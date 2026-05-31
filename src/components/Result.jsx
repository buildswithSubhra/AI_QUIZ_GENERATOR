import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, RefreshCw, Home, CheckCircle2, XCircle } from 'lucide-react';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizData, selectedAnswers } = location.state;

  const calculateScore = () => {
    let score = 0;
    quizData.forEach((question, index) => {
      if (question.answer === selectedAnswers[index]) {
        score++;
      }
    });
    return score;
  };

  const score = calculateScore();
  const percentage = (score / quizData.length) * 100;

  return (
    <div className="container">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
        style={{ maxWidth: '800px', textAlign: 'center' }}
      >
        <Trophy size={64} color="var(--primary)" style={{ marginBottom: '1.5rem', filter: 'drop-shadow(0 0 10px var(--primary))' }} />
        <h2 className="orbitron gradient-text" style={{ fontSize: '2rem', marginBottom: '1rem' }}>ANALYSIS COMPLETE</h2>
        
        <div style={{ margin: '2rem 0' }}>
          <p style={{ color: 'var(--text-dim)', marginBottom: '0.5rem' }}>SUCCESS RATE</p>
          <h1 className="orbitron" style={{ fontSize: '4rem', color: percentage >= 50 ? 'var(--primary)' : '#ff4b4b' }}>
            {percentage}%
          </h1>
          <p style={{ color: 'var(--text-dim)' }}>
            {score} / {quizData.length} KNOWLEDGE PARAMETERS MATCHED
          </p>
        </div>

        <div style={{ textAlign: 'left', marginBottom: '3rem', maxHeight: '300px', overflowY: 'auto', paddingRight: '1rem' }}>
          {quizData.map((q, i) => (
            <div key={i} style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {q.answer === selectedAnswers[i] ? <CheckCircle2 size={18} color="#00ff88" /> : <XCircle size={18} color="#ff4b4b" />}
                <p style={{ fontWeight: '600' }}>{q.question}</p>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginLeft: '1.7rem' }}>
                RESULT: <span style={{ color: q.answer === selectedAnswers[i] ? '#00ff88' : '#ff4b4b' }}>{selectedAnswers[i] || 'NONE'}</span>
                {q.answer !== selectedAnswers[i] && <span style={{ marginLeft: '1rem' }}>EXPECTED: <span style={{ color: '#00ff88' }}>{q.answer}</span></span>}
              </p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <button onClick={() => navigate('/dashboard')} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Home size={18} />
            <span>RETURN TO DASH</span>
          </button>
          <button onClick={() => navigate(-2)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <RefreshCw size={18} />
            <span>NEW ANALYSIS</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Result;
