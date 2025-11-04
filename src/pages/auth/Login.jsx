import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <section className="login-wrap">
      <div className="login-container">
        <h2>SIGN IN </h2>
        <p>미우미우를 찾아주셔서 감사합니다.</p>

        <div className="login-input">
          <input className="inputID" placeholder="이메일 / 휴대폰 번호" type="text" required />
          <input className="inputPassword" placeholder="비밀번호" type="password" required />
          <div className="helf">
            <p>
              <Link>비밀번호를 잊으셨나요?</Link>
            </p>
            <p>
              <Link>회원가입</Link>
            </p>

            <div className="button-wrap">
              <button>로그인</button>
              <button>구글 계정으로 로그인</button>
              <button>카카오 계정으로 로그인</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
