import React from 'react';
import './scss/Input.scss';

const PasswordInput = () => {
  return (
    <div className=" base-input success ">
      <input type="password" placeholder="비밀번호를 입력해주세요*" required />
      <div className="password-icon"></div>
      <div className="info">유효한 비밀번호를 입력하세요</div>
    </div>
  );
};

export default PasswordInput;
