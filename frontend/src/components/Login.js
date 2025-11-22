import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ setCurrentUser }) {
  const [selectedUser, setSelectedUser] = useState('A');
  const navigate = useNavigate();

  const handleLogin = () => {
    setCurrentUser(selectedUser);
    navigate('/chat');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Chatbot de Atendimento</h1>
        <h2>Bem-vindo!</h2>
        <p>Selecione seu perfil para começar:</p>
        
        <div className="user-selection">
          <label>
            <input
              type="radio"
              value="A"
              checked={selectedUser === 'A'}
              onChange={(e) => setSelectedUser(e.target.value)}
            />
            Usuário A
          </label>
          
          <label>
            <input
              type="radio"
              value="B"
              checked={selectedUser === 'B'}
              onChange={(e) => setSelectedUser(e.target.value)}
            />
            Usuário B
          </label>
        </div>
        
        <button onClick={handleLogin} className="login-button">
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;
