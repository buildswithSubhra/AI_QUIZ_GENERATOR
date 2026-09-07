import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import TopicQuiz from './components/TopicQuiz';
import DatasetQuiz from './components/DatasetQuiz';
import Quiz from './components/Quiz';
import Result from './components/Result';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-dim)' }}>INITIALIZING...</p>
        </div>
      </div>
    );
  }

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" replace />}
        />
        <Route
          path="/topic-quiz"
          element={user ? <TopicQuiz /> : <Navigate to="/" replace />}
        />
        <Route
          path="/dataset-quiz"
          element={user ? <DatasetQuiz /> : <Navigate to="/" replace />}
        />
        <Route
          path="/quiz"
          element={user ? <Quiz /> : <Navigate to="/" replace />}
        />
        <Route
          path="/result"
          element={user ? <Result /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
