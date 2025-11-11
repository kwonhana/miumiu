import React from 'react';
import './scss/Input.scss';

//TODO 이메일 input
const EmailInput = () => {
  return (
    // 성공 success
    // 실패 failure
    <div className="base-input">
      <input type="email" placeholder="이메일를 입력해주세요*" required />
      <div className="icon"></div>
      <div className="info">올바른 형식의 이메일 주소를 입력해주세요.</div>
    </div>
  );
};

export default EmailInput;
