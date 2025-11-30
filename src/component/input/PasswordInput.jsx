import { useState } from 'react';
import './scss/Input.scss';

const PasswordInput = ({ value, onChange }) => {
  // 비밀번호(정규식) 상태
  const [status, setStatus] = useState('');
  const [passwordTouch, setPasswordTouch] = useState(false);

  // 비밀번호 확인 상태 + 값(내부 관리)
  const [confirm, setConfirm] = useState('');
  const [confirmStatus, setConfirmStatus] = useState('');
  const [confirmTouch, setConfirmTouch] = useState(false);

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
    if (onChange) onChange(filterValue); // 부모로 비밀번호 전달
    validatePass(filterValue);

    // 비밀번호가 바뀌면 확인 값도 다시 검증
    if (confirm) validateConfirm(confirm, filterValue);
  };

  const handlePassBlur = () => {
    setPasswordTouch(true);
    validatePass(value);
  };

  // 비밀번호 확인 체크
  const validateConfirm = (confirmVal, origin) => {
    if (!confirmVal && confirmTouch) {
      setConfirmStatus('failure');
      return false;
    }
    if (!confirmVal) {
      setConfirmStatus('');
      return false;
    }

    if (confirmVal === origin) {
      setConfirmStatus('success');
      return true;
    } else {
      setConfirmStatus('failure');
      return false;
    }
  };

  // 비밀번호 확인 입력
  const handleConfirmChange = (e) => {
    const val = e.target.value;
    const filterValue = val.replace(/[^a-zA-Z0-9!@#$%^&*?]/g, '');
    setConfirm(filterValue); // ✅ 내부 상태 업데이트
    validateConfirm(filterValue, value);
  };

  const handleConfirmBlur = () => {
    setConfirmTouch(true);
    validateConfirm(confirm, value);
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
        <div className="info">대소문자, 특수문자를 포함한 비밀번호를 입력하세요</div>
      </div>

      {/* 🔹 비밀번호 확인 입력 */}
      <div className={`base-input password confirm ${confirmStatus}`}>
        <div className="input-box">
          <input
            type="password"
            placeholder="비밀번호를 확인해주세요*"
            value={confirm}
            onChange={handleConfirmChange}
            onBlur={handleConfirmBlur}
            required
          />
        </div>
        <div className="icon"></div>

        {confirmTouch && confirmStatus === 'failure' && (
          <div className="info failure">비밀번호가 일치하지 않습니다</div>
        )}
        {confirmTouch && confirmStatus === 'success' && (
          <div className="info success">비밀번호가 일치합니다</div>
        )}
      </div>
    </>
  );
};

export default PasswordInput;
