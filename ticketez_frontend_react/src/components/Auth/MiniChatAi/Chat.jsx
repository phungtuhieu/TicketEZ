import React, { useState } from 'react';
import './App.scss';
import { Modal } from 'antd';
const API_KEY = "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";
const systemMessage = {
  "role": "system",
  "content": "Please feel free to ask any questions. I'm here to help!"
};

function Chat() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything.",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState('');

  const openChat = () => {
    setIsChatOpen(true);
  };
  
  const closeChat = () => {
    setIsChatOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSend = async () => {
    if (inputMessage.trim() === '') {
      return;
    }

    const newMessage = {
      message: inputMessage,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setInputMessage('');
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages
      ]
    };

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      });

      const data = await response.json();
      console.log(data);
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT"
      }]);
    } catch (error) {
      console.error("Error while sending data: ", error);
    } finally {
      setIsTyping(false);
    }
  }
  

  return (
    <div className="App">
      <div className="chat-button" onClick={isChatOpen ? closeChat : openModal}>
        <div className="chat-icon">
          <span className="chat-icon-text">Chat</span>
        </div>
      </div>
      <Modal
        visible={modalIsOpen}
        onCancel={closeModal}
        className="chat-modal"
        centered
      >
        <div className="chat-container">
          <div className="message-list" scrollBehavior="smooth">
            {messages.map((message, i) => (
              <div key={i} className={`message ${message.sender === 'ChatGPT' ? 'assistant' : 'user'}`}>
                {message.message}
              </div>
            ))}
            {isTyping && <div className="typing-indicator">ChatGPT is typing...</div>}
          </div>
          <div className="message-input-container">
            <input
              type="text"
              placeholder="Enter your message here"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }}
            />
            <button className="send-button" onClick={handleSend}>Send</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Chat;
