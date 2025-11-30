import { useState } from 'react';
import './scss/Input.scss';

const PasswordInput = ({ value, onChange }) => {
  // 비밀번호(정규식) 상태
  const [status, setStatus] = useState('');
  const [passwordTouch, setPasswordTouch] = useState(false);

  // 비밀번호 정규식 체크
  const validatePass = (userPassword) => {
    if (!userPassword && passwordTouch) {
      setStatus('failure');
      return false;
    }
    if (!userPassword) {
      setStatus('');
      return false;
    }

    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*?]{6,12}$/;

    if (passRegex.test(userPassword)) {
      setStatus('success');
      return true;
    } else {
      setStatus('failure');
      return false;
    }
  };

  // 비밀번호 입력
  const handlePassChange = (e) => {
    const val = e.target.value;
    const filterValue = val.replace(/[^a-zA-Z0-9!@#$%^&*?]/g, '');

    if (onChange) onChange(filterValue); // 부모로 전달
    validatePass(filterValue);
  };

  const handlePassBlur = () => {
    setPasswordTouch(true);
    validatePass(value);
  };

  return (
    <>
      {/* 🔹 비밀번호 입력 */}
      <div className={`base-input password ${status}`}>
        <div className="input-box">
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요*"
            value={value}
            onChange={handlePassChange}
            onBlur={handlePassBlur}
            required
          />
        </div>

        <div className="icon"></div>
        <div className="info">대소문자, 숫자, 특수문자를 포함한 6~12자 비밀번호를 입력하세요</div>
      </div>
    </>
  );
};

export default PasswordInput;
