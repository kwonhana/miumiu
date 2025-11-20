import React, { useState } from 'react';
import './scss/Input.scss';

const PostCode = () => {
  const [postCode, setPostCode] = useState('');

  const postInput = /^[0-9]*$/;

  const handlePostCode = (e) => {
    if (postInput.test(e.target.value)) {
      setPostCode(e.target.value);
    }
  };

  return (
    <div className="base-input">
      <p>우편번호*</p>
      <input
        type="text"
        placeholder="우편번호를 입력해주세요"
        value={postCode}
        maxLength={5}
        onChange={handlePostCode}
      />
    </div>
  );
};

export default PostCode;
