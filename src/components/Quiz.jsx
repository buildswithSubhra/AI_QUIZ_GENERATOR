import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, HelpCircle } from 'lucide-react';

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [quizData] = useState(() => {
    try {
      let data = location.state.quizData;
      // Remove possible markdown code blocks
      data = data.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(data);
    } catch (error) {
      console.error("Failed to parse quiz data:", error);
      return [];
    }
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleAnswer = (option) => {
    const newAnswers = [...selectedAnswers, option];
    setSelectedAnswers(newAnswers);
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate('/result', { state: { quizData, selectedAnswers: newAnswers } });
    }
  };

  if (!quizData || quizData.length === 0) {
    return (
      <div className="container">
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <h2 className="orbitron" style={{ color: '#ff4b4b' }}>SYSTEM ERROR</h2>
          <p style={{ margin: '1.5rem 0', color: 'var(--text-dim)' }}>DATA STREAM CORRUPTED OR EMPTY.</p>
          <button onClick={() => navigate('/dashboard')} className="btn-primary">REBOOT TO DASHBOARD</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ position: 'fixed', top: '2rem', right: '2rem' }}>
        <p className="orbitron" style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>
          ANALYSIS PROGRESS: {Math.round(((currentQuestion) / quizData.length) * 100)}%
        </p>
        <div style={{ width: '200px', height: '4px', background: 'rgba(255, 255, 255, 0.1)', marginTop: '0.5rem', borderRadius: '2px' }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion) / quizData.length) * 100}%` }}
            style={{ height: '100%', background: 'var(--primary)', borderRadius: '2px', boxShadow: '0 0 10px var(--primary)' }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentQuestion}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          className="glass-card"
          style={{ maxWidth: '800px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <HelpCircle color="var(--primary)" size={32} />
            <h2 className="orbitron" style={{ fontSize: '1.2rem', margin: 0 }}>QUERY {currentQuestion + 1} / {quizData.length}</h2>
          </div>

          <h3 style={{ fontSize: '1.5rem', marginBottom: '2.5rem', lineHeight: '1.4' }}>{quizData[currentQuestion].question}</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {quizData[currentQuestion].options.map((option, index) => (
              <motion.button 
                key={index} 
                whileHover={{ scale: 1.02, background: 'rgba(0, 242, 255, 0.1)' }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary" 
                style={{ 
                  textAlign: 'left', 
                  padding: '1.2rem', 
                  textTransform: 'none', 
                  fontSize: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
                onClick={() => handleAnswer(option)}
              >
                <span>{option}</span>
                <ArrowRight size={18} />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
