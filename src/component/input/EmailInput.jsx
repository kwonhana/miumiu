import React, { useEffect, useState } from 'react';
import './scss/Input.scss';

//TODO 이메일 input
const EmailInput = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const validateEmail = () => {
    if (!email) {
      setStatus('');
      return;
    }

    const allowedCharsRegex = /^[a-zA-Z0-9@.]*$/;

    if (!allowedCharsRegex.test(email)) {
      setStatus('failure');
      return;
    }
    const emailFormatRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;

    if (emailFormatRegex.test(email)) {
      setStatus('success');
    } else {
      setStatus('failure');
    }
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
    const allowedCharsRegex = /^[a-zA-Z0-9@.]*$/;
    if (allowedCharsRegex.test(value)) {
      setEmail(value);
    }
  };
  useEffect(() => {
    validateEmail();
  }, [email]);

  return (
    // 성공 success
    // 실패 failure
    <div className={`base-input ${status}`}>
      <div className="email-wrap">
        <input
          type="text"
          placeholder="이메일을 입력해주세요*"
          value={email}
          onChange={handleEmailChange}
          required
          className="email-input"
        />
        {status === 'success' && (
          <div className="icon">
            <img src="/assets/icon/input-success.png" alt="check" />
          </div>
        )}
      </div>
      {status === 'failure' && (
        <div className="info">올바른 형식의 이메일 주소를 입력해주세요.</div>
      )}
    </div>
  );
};

export default EmailInput;
