import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import TopicQuiz from './components/TopicQuiz';
import DatasetQuiz from './components/DatasetQuiz';
import Quiz from './components/Quiz';
import Result from './components/Result';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <Navigate to="/dashboard" replace />
              </SignedIn>
              <SignedOut>
                <Login />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <SignedIn>
              <Dashboard />
            </SignedIn>
          }
        />
        <Route
          path="/topic-quiz"
          element={
            <SignedIn>
              <TopicQuiz />
            </SignedIn>
          }
        />
        <Route
          path="/dataset-quiz"
          element={
            <SignedIn>
              <DatasetQuiz />
            </SignedIn>
          }
        />
        <Route
          path="/quiz"
          element={
            <SignedIn>
              <Quiz />
            </SignedIn>
          }
        />
        <Route
          path="/result"
          element={
            <SignedIn>
              <Result />
            </SignedIn>
          }
        />
        <Route path="*" element={<RedirectToSignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
