import React, { useState } from 'react';
import './scss/Input.scss';

//TODO 비밀번호 input
const PasswordInput = () => {
  const [userPassword, setUserPassword] = useState('');
  const [status, setStatus] = useState('');
  const [passwordTouch, setPasswordTouch] = useState('');
  const validatePass = (userPassword) => {
    if (!userPassword && passwordTouch) {
      setStatus('failure');
      return;
    }
    if (!userPassword) {
      setStatus('');
      return;
    }
    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*?]{6,12}$/;
    if (passRegex.test(userPassword)) {
      setStatus('success');
    } else {
      setStatus('failure');
    }
  };
  const handlePassChange = (e) => {
    const value = e.target.value;
    const filtervalue = value.replace(/[^a-zA-Z0-9!@#$%^&*?]/g, '');
    setUserPassword(filtervalue);
    validatePass(filtervalue);
  };
  const handleblur = () => {
    setPasswordTouch(true);
    validatePass(userPassword);
  };

  return (
    // 성공 success
    // 실패 failure
    <div className={`base-input password ${status}`}>
      <div className="input-box">
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요*"
          value={userPassword}
          onChange={handlePassChange}
          onBlur={handleblur}
          required
        />
      </div>
      <div className="icon"></div>
      <div className="info">유효한 비밀번호를 입력하세요</div>
    </div>
  );
};

export default PasswordInput;
