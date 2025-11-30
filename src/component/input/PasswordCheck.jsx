import React, { useState, useEffect } from 'react';
import './scss/PasswordCheck.scss';

const PasswordCheck = ({ password }) => {
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState(''); // '', 'success', 'failure'
  const [touched, setTouched] = useState(false);

  // 비밀번호 확인 검증
  const validateConfirm = (confirmVal, originPassword) => {
    // 아직 아무것도 안 쳤으면 상태 비움
    if (!confirmVal) {
      setStatus('');
      return false;
    }

    if (confirmVal === originPassword) {
      setStatus('success');
      return true;
    } else {
      setStatus('failure');
      return false;
    }
  };

  // 입력할 때
  const handleChange = (e) => {
    const val = e.target.value;
    // 🔥 PasswordInput이랑 동일한 필터 적용
    const filtered = val.replace(/[^a-zA-Z0-9!@#$%^&*?]/g, '');
    setConfirm(filtered);

    if (touched) {
      validateConfirm(filtered, password);
    }
  };

  // 블러(포커스 빠져나갈 때)
  const handleBlur = () => {
    if (!touched) setTouched(true);
    validateConfirm(confirm, password);
  };

  // 🔥 원래 비밀번호가 바뀔 때도 다시 검사
  useEffect(() => {
    if (touched && confirm) {
      validateConfirm(confirm, password);
    }
  }, [password, confirm, touched]);

  return (
    <div className={`base-input password ${status}`}>
      <div className="passCheck-wrap">
        <div className="input-box">
          <input
            type="password"
            placeholder="비밀번호를 확인해주세요"
            value={confirm}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </div>

        <div className="icon"></div>

        {touched && status === 'failure' && (
          <div className="info failure">비밀번호가 일치하지 않습니다</div>
        )}
        {touched && status === 'success' && (
          <div className="info success">비밀번호가 일치합니다</div>
        )}
      </div>
    </div>
  );
};

export default PasswordCheck;
