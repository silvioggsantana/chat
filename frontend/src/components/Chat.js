import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Chat.css';

function Chat({ currentUser, setCurrentUser }) {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchConversation();
  }, [currentUser]);

  const fetchConversation = async () => {
    setLoading(true);
    try {
      // Busca todas as mensagens de A e B, ordenadas por data
      const response = await axios.get('http://localhost:8000/api/messages/conversation/');
      
      // Mapeia as mensagens para o formato de pares de conversa
      const conversationPairs = response.data.map(msg => ({
        user: msg.user, // 'A' ou 'B'
        message: msg.message,
        response: msg.response,
        created_at: msg.created_at
      }));
      
      setChatHistory(conversationPairs);
    } catch (error) {
      console.error('Erro ao buscar conversa:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/messages/', {
        user: currentUser,
        message: userMessage
      });

      // Adiciona a nova mensagem e a resposta do sistema ao histórico
      // Para simular o chat de 2 usuários, vamos adicionar a mensagem
      // enviada pelo usuário ativo (A ou B) e a resposta do sistema.
      // O histórico completo é recarregado para incluir as mensagens do outro usuário.
      fetchConversation();
      
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      // Se der erro, apenas exibe uma mensagem de erro temporária
      setChatHistory(prev => [...prev, {
        user: currentUser,
        message: userMessage,
        response: 'Erro ao enviar. Tente novamente.',
        created_at: new Date().toISOString()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat - Usuário {currentUser}</h2>
        <div className="header-buttons">
          <button onClick={() => navigate('/historico')} className="history-button">
            Ver Histórico
          </button>
          <button onClick={handleLogout} className="logout-button">
            Trocar Usuário
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {chatHistory.length === 0 && (
          <div className="empty-message">
            Envie uma mensagem para começar a conversa!
          </div>
        )}
        
        {chatHistory.map((msg, index) => {
          // Determina se a mensagem é do usuário ativo ou do outro usuário
          const isCurrentUser = msg.user === currentUser;
          const messageType = isCurrentUser ? 'user' : 'other';
          
          // Simula a resposta do outro usuário (que é a mensagem do sistema)
          // Se for a mensagem do usuário ativo, exibe a mensagem enviada e a resposta do sistema
          // Se for a mensagem do outro usuário, exibe a mensagem enviada pelo outro usuário
          
          return (
            <div key={index} className="conversation-pair">
              {/* Mensagem enviada pelo usuário (A ou B) */}
              <div className={`message ${messageType}`}>
                <div className="message-content">
                  {msg.message}
                </div>
              </div>
              
              {/* Resposta do sistema (simulando a resposta do outro usuário) */}
              <div className={`message ${isCurrentUser ? 'bot' : 'user'}`}>
                <div className="message-content">
                  {msg.response}
                </div>
              </div>
            </div>
          );
        })}
        
        {loading && (
          <div className="message bot">
            <div className="message-content loading">
              Digitando...
            </div>
          </div>
        )}
      </div>

      <div className="chat-input">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua mensagem..."
          rows="3"
          disabled={loading}
        />
        <button 
          onClick={handleSendMessage} 
          disabled={loading || !message.trim()}
          className="send-button"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

export default Chat;
