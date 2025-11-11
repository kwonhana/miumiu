import React from 'react';
import './scss/Input.scss';

//TODO 비밀번호 input
const PasswordInput = () => {
  return (
    // 성공 success
    // 실패 failure
    <div className="base-input password ">
      <input type="password" placeholder="비밀번호를 입력해주세요*" required />
      <div className="icon"></div>
      <div className="info">유효한 비밀번호를 입력하세요</div>
    </div>
  );
};

export default PasswordInput;
