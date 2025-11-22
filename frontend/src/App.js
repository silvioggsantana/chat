import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Chat from './components/Chat';
import History from './components/History';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login setCurrentUser={setCurrentUser} />} />
          <Route 
            path="/chat" 
            element={currentUser ? <Chat currentUser={currentUser} setCurrentUser={setCurrentUser} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/historico" 
            element={currentUser ? <History currentUser={currentUser} setCurrentUser={setCurrentUser} /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
