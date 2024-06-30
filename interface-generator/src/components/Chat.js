import React, { useState, useEffect } from 'react';
import './Chat.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    setMessages([{ text: "Hello, how can I help you?", isBot: true }]);
  }, []);

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      setMessages(prevMessages => [...prevMessages, { text: inputMessage, isBot: false }]);
      setInputMessage('');

      try {
        const response = await fetch('http://localhost:3001/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: inputMessage }),
        });

        if (!response.ok) {
          throw new Error('Failed to get response from AI');
        }

        const data = await response.json();
        setMessages(prevMessages => [...prevMessages, { text: data.reply, isBot: true }]);
      } catch (error) {
        console.error('Error in AI communication:', error);
        setMessages(prevMessages => [...prevMessages, { text: "Sorry, I'm having trouble responding right now.", isBot: true }]);
      }
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:3001/save-interface', {
        method: 'POST',
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'chat_interface.zip';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        alert('Interface saved successfully. Please choose where to save the file.');
      } else {
        throw new Error('Failed to save interface');
      }
    } catch (error) {
      console.error('Failed to save interface:', error);
      alert('Failed to save interface. Please try again.');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.isBot ? 'bot' : 'user'}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <button onClick={handleSave} className="save-button">Save Interface</button>
    </div>
  );
}

export default Chat;