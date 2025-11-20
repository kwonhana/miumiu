import React, { useState } from 'react';
import './scss/Input.scss';
import { country } from '../../store/data';

const Tellinput = () => {
  const [phoneCountry, setPhoneCountry] = useState('KR');
  const [value, setValue] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneNumber = (e) => {
    let onlyNumber = e.target.value.replace(/[^0-9]/g, '');

    let formatted = '';
    if (onlyNumber.length <= 3) {
      formatted = onlyNumber;
    } else if (onlyNumber.length <= 7) {
      formatted = onlyNumber.slice(0, 3) + '-' + onlyNumber.slice(3);
    } else {
      formatted =
        onlyNumber.slice(0, 3) + '-' + onlyNumber.slice(3, 7) + '-' + onlyNumber.slice(7, 11);
    }

    setValue(formatted);

    if (onlyNumber.length === 11) {
      setPhoneNumber('success');
    } else {
      setPhoneNumber('failure');
    }
  };
  const selectedDial = country.find((c) => c.code === phoneCountry)?.dial ?? '+82';

  return (
    <div className={`base-input phone ${phoneNumber}`}>
      <p>전화번호*</p>
      <div className="select-num">
        {/* TODO 국가 코드 선택 */}
        <select value={phoneCountry} onChange={(e) => setPhoneCountry(e.target.value)}>
          {country.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>
        <span className="iconArrow">
          <img src="/assets/icon/arrow.png" alt="arrow" />
        </span>
        <input
          type="text"
          value={value}
          maxLength={13}
          placeholder="전화번호를 입력해주세요"
          onChange={handlePhoneNumber}
        />
        <div className="icon"></div>
        <div className="info">이 필드는 필수 입력란입니다.</div>
      </div>
    </div>
  );
};

export default Tellinput;
