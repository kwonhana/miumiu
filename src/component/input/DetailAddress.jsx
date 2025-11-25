import React, { useState } from 'react';
import './scss/Input.scss';

const DetailAddress = ({ detailAddress, onDeAddress }) => {
  return (
    <div className="base-input">
      <p>상세 주소(선택)</p>
      <input
        type="text"
        placeholder="상세 주소를 입력해주세요"
        value={detailAddress}
        onChange={(de) => onDeAddress(de.target.value)}
      />
    </div>
  );
};

export default DetailAddress;
