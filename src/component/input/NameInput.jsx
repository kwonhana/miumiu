import React, { useEffect, useState } from 'react';
import './scss/Input.scss';

const NameInput = () => {
  const [lastName, setLastName] = useState('');
  const [name, setName] = useState('');
  const [nameStatus, setNameStatus] = useState('');
  const [lastNameStatus, setLastNameStatus] = useState('');
  const koreanRegex = /^[가-힣]*$/;
  const validateLastName = () => {
    if (!lastName) {
      setLastNameStatus('');
      return;
    }
    if (!koreanRegex.test(lastName)) {
      setLastNameStatus('failure');
      return;
    }
    const LastNameFormetRegex = /^[가-힣]{1,2}$/;
    if (LastNameFormetRegex.test(lastName)) {
      setLastNameStatus('success');
    } else {
      setLastNameStatus('failure');
    }
  };
  const validateName = () => {
    if (!name) {
      setNameStatus('');
      return;
    }
    if (!koreanRegex.test(name)) {
      setNameStatus('failure');
      return;
    }
    const NameFormetRegex = /^[가-힣]{1,3}$/;
    if (NameFormetRegex.test(name)) {
      setNameStatus('success');
    } else {
      setNameStatus('failure');
    }
  };
  const handleLastNameChange = (e) => {
    const value = e.target.value;
    if (koreanRegex.test(value) && value.length <= 2) {
      setLastName(value);
    }
  };
  const handleNameChange = (e) => {
    const value = e.target.value;
    if (koreanRegex.test(value) && value.length <= 3) {
      setName(value);
    }
  };
  useEffect(() => {
    validateLastName();
  }, [lastName]);
  useEffect(() => {
    validateName();
  }, [name]);

  return (
    <div className="base-input">
      <div className="name-wrap">
        <span>이름*</span>
        <div className="inputBox">
          <input
            className="lastName-input"
            type="text"
            placeholder="성"
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
          {lastNameStatus === 'success' && (
            <div className="icon">
              <img src="/assets/icon/input-success.png" alt="check" />
            </div>
          )}
          {lastNameStatus === 'failure' && <div className="info">성을 입력하세요</div>}
          <input
            className="name-input"
            type="text"
            placeholder="이름(성 제외)"
            value={name}
            onChange={handleNameChange}
            required
          />
          {nameStatus === 'success' && (
            <div className="icon">
              <img src="/assets/icon/input-success.png" alt="check" />
            </div>
          )}
          {nameStatus === 'failure' && <div className="info">이름을 입력하세요</div>}
        </div>
      </div>
    </div>
  );
};

export default NameInput;
