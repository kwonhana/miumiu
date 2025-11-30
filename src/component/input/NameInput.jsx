import React, { useEffect, useState, useCallback } from 'react';
import { useEffect, useState } from 'react';
import './scss/nameInput.scss';

const NameInput = ({ lastName, name, onLastNameChange, onNameChange }) => {
  const [nameStatus, setNameStatus] = useState('');
  const [lastNameStatus, setLastNameStatus] = useState('');
  const [lastNameTouch, setLastNameTouch] = useState(false);
  const [nameTouch, setNameTouch] = useState(false);
  const koreanRegex = /^[ㄱ-ㅎㅏ-ㅣ가-힣]*$/;

  // 🔥 성 검사
  const validateLastName = useCallback(() => {
    if (!lastNameTouch) return;

    if (!lastName) {
      setLastNameStatus('failure');
      return false;
    }
    if (!koreanRegex.test(lastName)) {
      setLastNameStatus('failure');
      return false;
    }

    const regex = /^[가-힣]{1,2}$/;
    if (regex.test(lastName)) {
      setLastNameStatus('success');
      return true;
    } else {
      setLastNameStatus('failure');
      return false;
    }
  }, [lastName, lastNameTouch]);

  // 🔥 이름 검사
  const validateName = useCallback(() => {
    if (!nameTouch) return false;

    if (!name) {
      setNameStatus('failure');
      return false;
    }
    if (!koreanRegex.test(name)) {
      setNameStatus('failure');
      return false;
    }

    const regex = /^[가-힣]{1,3}$/;
    if (regex.test(name)) {
      setNameStatus('success');
      return true;
    } else {
      setNameStatus('failure');
      return false;
    }
  }, [name, nameTouch]);

  const handleLastNameChange = (e) => {
    const val = e.target.value;
    if (!lastNameTouch) setLastNameTouch(true);
    if (koreanRegex.test(val) && val.length <= 4) {
      onLastNameChange(val);
    }
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    if (!nameTouch) setNameTouch(true);
    if (koreanRegex.test(val) && val.length <= 5) {
      onNameChange(val);
    }
  };

  // 🔥 deps를 함수로 교체 (경고 제거)
  useEffect(() => {
    validateLastName();
  }, [validateLastName]);

  useEffect(() => {
    validateName();
  }, [validateName]);

  return (
    <div className="base-input">
      <p>이름*</p>

      <div className="name-wrap">
        {/* 성 */}
        <div className={`input-box ${lastNameStatus}`}>
          <input
            className="lastName-input"
            type="text"
            placeholder="성"
            value={lastName || ''}
            onChange={handleLastNameChange}
            required
          />
          {lastNameStatus === 'success' && (
            <div className="icon">
              <img src="/assets/icon/input-success.png" alt="check" />
            </div>
          )}
          {lastNameStatus === 'failure' && <div className="info">성을 입력하세요</div>}
        </div>

        {/* 이름 */}
        <div className={`input-box ${nameStatus}`}>
          <input
            className="name-input"
            type="text"
            placeholder="이름(성 제외)"
            value={name || ''}
            onChange={handleNameChange}
            required
          />
          {nameStatus === 'success' && (
            <div className="icon">
              <img src="/assets/icon/input-success.png" alt="check" />
            </div>
          )}
          {nameStatus === 'failure' && <div className="info">이름을 입력하세요</div>}
        </div>
      </div>
    </div>
  );
};

export default NameInput;
