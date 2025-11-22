import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './History.css';

function History({ currentUser, setCurrentUser }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/messages/history/?user=${currentUser}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="history-container">
      <div className="history-header">
        <h2>Histórico de Mensagens - Usuário {currentUser}</h2>
        <div className="header-buttons">
          <button onClick={() => navigate('/chat')} className="back-button">
            Voltar ao Chat
          </button>
          <button onClick={() => { setCurrentUser(null); navigate('/'); }} className="logout-button">
            Trocar Usuário
          </button>
        </div>
      </div>

      <div className="history-content">
        {loading ? (
          <div className="loading-message">Carregando histórico...</div>
        ) : messages.length === 0 ? (
          <div className="empty-message">
            Nenhuma mensagem encontrada para o Usuário {currentUser}.
          </div>
        ) : (
          <div className="messages-list">
            {messages.map((msg) => (
              <div key={msg.id} className="history-message-card">
                <div className="message-date">{formatDate(msg.created_at)}</div>
                
                <div className="message-pair">
                  <div className="user-message">
                    <strong>Você:</strong>
                    <p>{msg.message}</p>
                  </div>
                  
                  <div className="bot-response">
                    <strong>Sistema:</strong>
                    <p>{msg.response}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
