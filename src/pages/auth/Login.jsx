import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth/login.scss';

const list = [
  { icon: '', title: '개인계정을 통해 특별한 쇼핑 경험을 느껴보세요.' },
  { icon: '', title: '전용 섹션에서 주문 및 반품 내역을 관리하고 배송 상태를 추적할 수 있습니다.' },
  { icon: '', title: '마음에 드는 제품은 위시리스트에 저장해보세요.' },
  { icon: '', title: '개인 맞춤 예약과 수선 요청 내역도 한눈에 확인하실 수 있습니다.' },
  { icon: '', title: '고객 서비스팀의 맞춤형 응대를 받아보세요.' },
  { icon: '', title: '온라인 익스클루시브 제품도 간편하게 만나보실 수 있습니다.' },
  { icon: '', title: '고객님을 위한 특별 이벤트와 경험에 참여하세요.' },
];

const Login = () => {
  return (
    <section className="login-wrap">
      <div className="login-container">
        <div className="login-inner">
          <h2>SIGN IN</h2>
          <p className="subTitle">미우미우를 찾아주셔서 감사합니다.</p>

          <div className="login-input">
            <input className="inputID" placeholder="이메일 / 휴대폰 번호" type="text" required />
            <input className="inputPassword" placeholder="비밀번호" type="password" required />
            <div className="helf">
              <p>
                <Link className="link">비밀번호를 잊으셨나요?</Link>
              </p>
              <p>
                <Link className="link">회원가입</Link>
              </p>
            </div>

            <div className="button-wrap">
              <p>
                <button className="btnLogin">로그인</button>{' '}
              </p>
              <p>
                <button className="btnGoogle">구글 계정으로 로그인</button>
              </p>
              <p>
                <button className="btnKakao">카카오 계정으로 로그인</button>
              </p>
            </div>

            <ul className="info">
              {list.map((el) => {
                return (
                  <li>
                    <span className="icon">{el.icon}</span>
                    <span>{el.title}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
