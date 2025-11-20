import React, { useState } from 'react';
import './scss/Input.scss';

const DetailAddress = () => {
  const [detailAddress, setDetailAddress] = useState('');

  const handleDetailAddress = (e) => {
    setDetailAddress(e.target.value);
  };

  return (
    <div className="base-input">
      <p>상세 주소(선택)</p>
      <input
        type="text"
        placeholder="상세 주소를 입력해주세요"
        value={detailAddress}
        onChange={handleDetailAddress}
      />
    </div>
  );
};

export default DetailAddress;
