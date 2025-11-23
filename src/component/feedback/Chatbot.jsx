import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import './scss/Chatbot.scss';
import { csButtons, responses, subMenus, detailedResponses } from '../../store/data';
import { useChatStore } from '../../store/useChat';

export const Chatbot = () => {
  const messagesEndRef = useRef(null);

  const {
    isOpen,
    messages,
    inputValue,
    toggleChat,
    closeChat,
    addMessages,
    resetMessages,
    initializeMessages,
    setInputValue,
    clearInput,
  } = useChatStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      initializeMessages();
    }
  }, [isOpen, initializeMessages]);

  const handleReset = () => {
    resetMessages();
    clearInput();
  };

  // 1단계: 메인 카테고리 클릭
  const handleButtonClick = (category) => {
    const currentTime = new Date().toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const userMessage = {
      text: csButtons.find((btn) => btn.category === category)?.label || '',
      type: 'user',
      time: currentTime,
      id: Date.now() + '-user',
    };

    const botMessage = {
      text: responses[category] || '문의해주셔서 감사합니다.\n 곧 답변드리겠습니다.',
      type: 'bot',
      time: currentTime,
      id: Date.now() + '-bot',
    };

    addMessages([userMessage, botMessage]);

    // 서브메뉴가 있는 카테고리인 경우
    if (subMenus[category]) {
      setTimeout(() => {
        addMessages([
          {
            text: '',
            type: 'bot',
            time: new Date().toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            }),
            subButtons: subMenus[category],
            parentCategory: category, // 부모 카테고리 저장
            id: Date.now() + '-submenu',
          },
        ]);
      }, 500);
    }
  };

  // 2단계: 서브 메뉴 클릭
  const handleSubButtonClick = (subCategory, label) => {
    const currentTime = new Date().toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    // "전 단계로 가기" 클릭 시
    if (subCategory === 'back') {
      handleReset();
      return;
    }

    const userMessage = {
      text: label,
      type: 'user',
      time: currentTime,
      id: Date.now() + '-user',
    };

    const botMessage = {
      text: detailedResponses[subCategory] || '해당 정보를 확인하고 있습니다. 잠시만 기다려주세요.',
      type: 'bot',
      time: currentTime,
      id: Date.now() + '-bot',
    };

    addMessages([userMessage, botMessage]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const currentTime = new Date().toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const userMessage = {
      text: inputValue,
      type: 'user',
      time: currentTime,
      id: Date.now() + '-user',
    };

    // 메인 버튼 매칭
    const matchedButton = csButtons.find(
      (btn) => inputValue.includes(btn.label) || btn.label.includes(inputValue)
    );

    // 서브 메뉴 매칭
    let matchedSubButton = null;
    if (!matchedButton) {
      for (const category in subMenus) {
        matchedSubButton = subMenus[category].find(
          (btn) => inputValue.includes(btn.label) || btn.label.includes(inputValue)
        );
        if (matchedSubButton) break;
      }
    }

    const botMessage = {
      text: matchedButton
        ? responses[matchedButton.category]
        : matchedSubButton
        ? detailedResponses[matchedSubButton.subCategory]
        : '문의 내용을 확인하고 있습니다. 잠시만 기다려주세요.',
      type: 'bot',
      time: currentTime,
      id: Date.now() + '-bot',
    };

    addMessages([userMessage, botMessage]);
    clearInput();
  };

  return (
    <div className="Chatbot">
      {isOpen && (
        <div className="chatbot-wrap">
          <div className="header">
            <div className="header-left">
              <div className="chatbot-logo">
                <img src="/assets/logo/logo_black.png" alt="미우미우챗봇로고" />
              </div>
              <span className="icon">
                <img src="/assets/icon/msg.png" alt="미우미우 챗봇" />
              </span>
            </div>
            <div className="header-right">
              <button onClick={handleReset} className="header-btn reset"></button>
              <button onClick={closeChat} className="header-btn close"></button>
            </div>
          </div>

          <div className="messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-wrapper ${msg.type}`}>
                {msg.type === 'bot' && (
                  <div className="avatar">
                    <img src="/assets/icon/MessagesIcon.png" alt="" />
                  </div>
                )}
                <div className={`message-content ${msg.type}`}>
                  {msg.type === 'bot' && <div className="sender">Miu Miu</div>}
                  {msg.text && <div className={`message-bubble ${msg.type}`}>{msg.text}</div>}
                  {msg.showButtons && (
                    <div className="cs-buttons">
                      {csButtons.map((btn) => (
                        <button
                          key={btn.id}
                          onClick={() => handleButtonClick(btn.category)}
                          className="cs-button">
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* 2단계: 서브 메뉴 버튼 */}
                  {msg.subButtons && (
                    <div className="action-buttons">
                      {msg.subButtons.map((btn) => (
                        <button
                          key={btn.id}
                          onClick={() => handleSubButtonClick(btn.subCategory, btn.label)}
                          className={`action-button ${
                            btn.subCategory === 'back' ? 'back-button' : ''
                          }`}>
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  )}
                  {msg.buttons && (
                    <div className="action-buttons">
                      {msg.buttons.map((btn, i) => (
                        <button
                          key={i}
                          onClick={() => btn.action === 'back' && handleReset()}
                          className="action-button">
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="time">{msg.time}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="input-wrapper">
            <div className="chatbot-input-container">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="메시지를 입력해주세요"
                className="chatbot-input"
              />
              <button onClick={handleSendMessage} className="chatbot-send-btn"></button>
            </div>
          </div>
        </div>
      )}

      <button onClick={toggleChat} className="chatbot-toggle-btn"></button>
    </div>
  );
};
