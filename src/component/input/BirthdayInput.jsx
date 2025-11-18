import React, { useState } from 'react';

const BirthdayInput = () => {
  const [value, setValue] = useState('');
  const [inputClass, setInputClass] = useState('');

  const handleChange = (e) => {
    let input = e.target.value.replace(/[^0-9]/g, '');
    let formatted = '';

    if (input.length <= 4) {
      formatted = input;
    } else if (input.length <= 6) {
      formatted = input.slice(0, 4) + '/' + input.slice(4);
    } else if (input.length <= 8) {
      formatted = input.slice(0, 4) + '/' + input.slice(4, 6) + '/' + input.slice(6);
    } else {
      formatted = input.slice(0, 4) + '/' + input.slice(4, 6) + '/' + input.slice(6, 8);
    }
    setValue(formatted);
    validateBirthday(input);
  };

  const validateBirthday = (input) => {
    if (input.length < 8) {
      setInputClass('failure');
      return;
    }

    const year = parseInt(input.slice(0, 4), 10);
    const month = parseInt(input.slice(4, 6), 10);
    const day = parseInt(input.slice(6, 8), 10);

    const currentYear = new Date().getFullYear();

    if (year < 1920 || year > currentYear) {
      setInputClass('failure');
      return;
    }

    if (month < 1 || month > 12 || day < 1 || day > 31) {
      setInputClass('failure');
      return;
    }

    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
      setInputClass('failure');
      return;
    }

    setInputClass('success');
  };

  return (
    // 성공 success
    // 실패 failure
    <div className={`base-input birthday ${inputClass}`}>
      <input
        type="text"
        placeholder="생년월일을 입력해주세요"
        value={value}
        onChange={handleChange}
        maxLength={12}
        required
      />
      <div className="icon"></div>
      <div className="info">유효한 생년월일을 입력하세요</div>
    </div>
  );
};

export default BirthdayInput;
