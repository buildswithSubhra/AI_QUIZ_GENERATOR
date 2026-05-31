import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateQuiz } from '../utils/gemini';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft, Upload } from 'lucide-react';

const DatasetQuiz = () => {
  const [datasetText, setDatasetText] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setDatasetText(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleGenerateQuiz = async () => {
    if (!datasetText) return;
    setLoading(true);
    try {
      const prompt = `From the following dataset, create 5 MCQ quiz questions. Return in JSON format ONLY: [{"question":"","options":["","","",""],"answer":""}] \n\nDataset: \n${datasetText}`;
      const quizData = await generateQuiz(prompt);
      navigate('/quiz', { state: { quizData } });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card"
        style={{ maxWidth: '600px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
          <button onClick={() => navigate('/dashboard')} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
            <ArrowLeft size={24} />
          </button>
          <FileText size={32} color="var(--secondary)" />
          <h2 className="orbitron gradient-text" style={{ fontSize: '1.5rem', margin: 0 }}>DATASET PARSER</h2>
        </div>

        <p style={{ color: 'var(--text-dim)', marginBottom: '1.5rem' }}>UPLOAD KNOWLEDGE REPOSITORY FOR ANALYSIS</p>
        
        <label className="input-field" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          cursor: 'pointer',
          padding: '2rem',
          border: '1px dashed rgba(255, 255, 255, 0.2)'
        }}>
          <Upload size={32} style={{ marginBottom: '1rem' }} />
          <span style={{ fontSize: '0.9rem' }}>{fileName || 'CLICK TO SELECT DATA FILE'}</span>
          <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
        </label>

        <button 
          onClick={handleGenerateQuiz} 
          disabled={loading || !datasetText}
          className="btn-secondary"
        >
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <div className="loader" style={{ width: '20px', height: '20px', borderWidth: '2px', borderColor: 'var(--secondary)' }}></div>
              <span>PARSING...</span>
            </div>
          ) : 'START ANALYSIS'}
        </button>
      </motion.div>
    </div>
  );
};

export default DatasetQuiz;
