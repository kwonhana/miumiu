import React, { useState } from 'react';
import './scss/Input.scss';

const Address = () => {
  const [address, setAddress] = useState('');

  //한글 영문 숫자 공백 특수기호
  // const addressInput = /^[가-힣a-zA-Z0-9\s\-\#\/\(\),]*$/;

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  return (
    <div className="base-input">
      <p>주소*</p>
      <input
        type="text"
        placeholder="주소를 입력해주세요"
        value={address}
        onChange={handleAddress}
      />
    </div>
  );
};

export default Address;
