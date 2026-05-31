import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateQuiz } from '../utils/gemini';
import { motion } from 'framer-motion';
import { Cpu, ArrowLeft } from 'lucide-react';

const TopicQuiz = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGenerateQuiz = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const prompt = `Generate 5 MCQ quiz questions on the topic "${topic}". Give output in JSON format ONLY, no other text: [{"question":"","options":["","","",""],"answer":""}]`;
      const quizData = await generateQuiz(prompt);
      if (!quizData) {
        throw new Error('Failed to generate quiz. Check API key and try again.');
      }
      navigate('/quiz', { state: { quizData } });
    } catch (err) {
      setError(err.message || 'Failed to generate quiz');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card"
        style={{ maxWidth: '600px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
          <button onClick={() => navigate('/dashboard')} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
            <ArrowLeft size={24} />
          </button>
          <Cpu size={32} color="var(--primary)" />
          <h2 className="orbitron gradient-text" style={{ fontSize: '1.5rem', margin: 0 }}>TOPIC ENGINE</h2>
        </div>

        <p style={{ color: 'var(--text-dim)', marginBottom: '1.5rem' }}>ENTER A TOPIC FOR KNOWLEDGE EXTRACTION</p>
        
        <input 
          type="text" 
          placeholder="e.g. QUANTUM PHYSICS, NEURAL NETWORKS..." 
          value={topic} 
          onChange={(e) => setTopic(e.target.value)} 
          className="input-field orbitron"
          disabled={loading}
          style={{ letterSpacing: '1px' }}
        />

        <button 
          onClick={handleGenerateQuiz} 
          disabled={loading || !topic.trim()}
          className="btn-primary"
        >
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <div className="loader" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
              <span>GENERATING...</span>
            </div>
          ) : 'INITIALIZE SEQUENCE'}
        </button>

        {error && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ color: '#ff4b4b', marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}
          >
            ERROR: {error}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default TopicQuiz;
