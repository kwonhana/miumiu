import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../api/authStore';
import './login.scss';

import { auth, db } from '../../../api/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

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
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { onGoogleLogin, setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    await onGoogleLogin();
    navigate('/');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // 입력값 없으면 무반응
    if (!id.trim() || !password.trim()) {
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, id, password);
      const firebaseUser = userCredential.user;

      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        alert('사용자 정보가 존재하지 않습니다. 관리자에게 문의해주세요.');
        return;
      }

      const userData = userSnap.data();
      setUser(userData);

      alert(`${userData.name || userData.displayName || '고객'}님, 환영합니다!`);
      navigate('/');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        alert('가입되지 않은 이메일입니다.');
      } else if (err.code === 'auth/wrong-password') {
        alert('비밀번호가 일치하지 않습니다.');
      } else if (err.code === 'auth/invalid-email') {
        alert('이메일 형식이 올바르지 않습니다.');
      } else {
        alert('로그인 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <section className="login-wrap">
      <div className="login-container">
        <div className="login-inner">
          <h2>SIGN IN</h2>
          <p className="subTitle">미우미우를 찾아주셔서 감사합니다.</p>

          <div className="login-input">
            <form onSubmit={handleLogin}>
              {/*  이메일 입력칸 — 한글 입력 차단 */}
              <input
                className="inputID"
                value={id}
                placeholder="이메일"
                type="text"
                required
                onChange={(e) => {
                  const value = e.target.value;
                  const noKorean = value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '');
                  setId(noKorean);
                }}
                onKeyDown={(e) => {
                  if (/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]$/.test(e.key)) {
                    e.preventDefault();
                  }
                  if (e.key === 'Enter') handleLogin(e);
                }}
              />

              {/* 🔥 패스워드 → 엔터키 로그인 */}
              <input
                className="inputPassword"
                value={password}
                placeholder="비밀번호"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
              />
            </form>

            <div className="half">
              <p>
                <Link className="link">비밀번호를 잊으셨나요?</Link>
              </p>
              <p>
                <Link to="/Join" className="link">
                  회원가입
                </Link>
              </p>
            </div>

            {/* 버튼 UI 그대로 유지 */}
            <div className="button-wrap">
              <p>
                <button type="button" className="btnLogin" onClick={handleLogin}>
                  로그인
                </button>
              </p>
              <p>
                <button type="button" className="btnGoogle" onClick={handleGoogleLogin}>
                  구글 계정으로 로그인
                </button>
              </p>
            </div>

            <ul className="info">
              {list.map((el, i) => (
                <li key={i}>
                  <span className="icon">{el.icon}</span>
                  <span>{el.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
