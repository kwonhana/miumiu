import './scss/PasswordCheck.scss';

const PasswordCheck = () => {
  return (
    <div className="base-input password">
      <div className="passCheck-wrap">
        <div className="input-box">
          <input type="password" placeholder="비밀번호를 입력해주세요" required />
        </div>
        <div className="icon"></div>
      </div>
    </div>
  );
};

export default PasswordCheck;
