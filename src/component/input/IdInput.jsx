import React, { useState } from 'react';
import './scss/Input.scss';

const IdInput = () => {
  const [userId, setuserId] = useState('');
  const [status, setStatus] = useState('');
  const [idTouch, setIdTouch] = useState('');
  const validateId = (userId) => {
    if (!userId && idTouch) {
      setStatus('failure');
      return;
    }
    if (!userId) {
      setStatus('');
      return;
    }
    const idRegex = /^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]+$/;
    if (idRegex.test(userId)) {
      setStatus('success');
    } else {
      setStatus('failure');
    }
  };

  const handleIdChange = (e) => {
    const value = e.target.value;
    const filtervalue = value.replace(/[^a-zA-Z0-9]/g, '');
    setuserId(filtervalue);
    validateId(filtervalue);
  };
  const handleblur = () => {
    setIdTouch(true);
    validateId(userId);
  };

  return (
    <div className={`base-input userId ${status}`}>
      <div className="input-box">
        <input
          type="text"
          placeholder="아이디를 입력해주세요*"
          value={userId}
          onChange={handleIdChange}
          onBlur={handleblur}
          required
        />
      </div>
      <div className="icon"></div>
      <div className="info">아이디를 입력하세요</div>
    </div>
  );
};

export default IdInput;
