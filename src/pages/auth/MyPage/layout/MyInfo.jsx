import { useEffect, useState } from 'react';
import InfoEditPopup from './InfoEditPopup';

// 🔹 Firestore import (경로는 프로젝트 구조에 맞게, 다른 파일들 기준으로 맞춰둠)
import { db } from '../../../../api/firebase';
import { doc, getDoc } from 'firebase/firestore';

//TODO 내정보
const MyInfo = ({ userData }) => {
  console.log(userData, '유저데이터값');

  // 🔹 Firestore에서 다시 읽어서 쓸 실제 데이터
  const [userInfo, setUserInfo] = useState(userData || null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔹 Firestore에서 항상 최신 유저 정보 다시 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userData) {
        setUserInfo(null);
        setLoading(false);
        return;
      }

      try {
        const uid = userData.uid || userData.userId;
        if (!uid) {
          // uid 없으면 전달받은 userData 그대로 사용
          setUserInfo(userData);
          setLoading(false);
          return;
        }

        const ref = doc(db, 'users', uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          // Firestore에 저장된 최신 값으로 덮어씀
          setUserInfo({
            uid,
            ...userData, // 기존 auth 정보 (displayName 등)
            ...snap.data(), // phone, email, name, birthday 등
          });
        } else {
          // 문서 없으면 일단 원래 userData 사용
          setUserInfo(userData);
        }
      } catch (err) {
        console.error('유저 정보 로딩 오류:', err);
        setUserInfo(userData || null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [userData]);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  if (loading) {
    return (
      <div className="container">
        <p>내 정보 불러오는 중...</p>
      </div>
    );
  }

  if (!userInfo) {
    return null;
  }

  const fullName =
    [userInfo.lastName, userInfo.name].filter(Boolean).join('') || userInfo.displayName || '-';

  return (
    <div className="container">
      <section className="basicInfo">
        <div className="basicInfo-inner">
          <div className="title-wrap">
            <h2>기본 정보</h2>
            <button className="editBtn" onClick={openPopup}>
              수정하기
            </button>
          </div>

          <table className="info-table">
            <tbody>
              <tr>
                <th>이름</th>
                <td>{fullName}</td>
                <th>생년월일</th>
                <td>{userInfo.birthday || '-'}</td>
              </tr>

              <tr>
                <th>이메일</th>
                <td>{userInfo.email || '-'}</td>
                <th>휴대폰 번호</th>
                <td>{userInfo.phone || '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="loginInfo">
        <div className="loginInfo-inner">
          <h2>로그인 정보</h2>
          <table className="login-table">
            <tbody>
              <tr>
                <th>아이디</th>
                <td>{userInfo.email || '-'}</td>
                <th>비밀번호</th>
                <td>**********</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="myCoupon">
        <div className="myCoupon-inner">
          <h2>내 쿠폰</h2>

          <div className="coupon-wrap">
            <div className="coupon-box">
              <p className="title">10% 할인 쿠폰</p>
              <p className="coupon-detail">
                <span className="desc">100만원 이상 구매시 사용가능</span>
                <span className="validDate">2026. 08. 31 까지</span>
              </p>
            </div>
            <div className="coupon-box">
              <p className="title">15% 할인 쿠폰</p>
              <p className="coupon-detail">
                <span className="desc">150만원 이상 구매시 사용가능</span>
                <span className="validDate">2026. 08. 31 까지</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {isOpen && <InfoEditPopup onclose={closePopup} userData={userInfo} />}
    </div>
  );
};

export default MyInfo;
