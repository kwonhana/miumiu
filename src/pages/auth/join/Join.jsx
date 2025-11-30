import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../../component/input/PasswordInput';
import NameInput from '../../../component/input/NameInput';
import PhoneInput from '../../../component/input/PhoneInput';
import BirthdayInput from '../../../component/input/BirthdayInput';
import EmailInput from '../../../component/input/EmailInput';
import PasswordCheck from '../../../component/input/PasswordCheck';
import './scss/Join.scss';

// 🔹 Firebase
import { auth, db } from '../../../api/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Join = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: '',
    lastName: '',
    name: '',
    phone: '',
    email: '',
    birthday: '',
    dataTransferAgree: false,
    personalDataAgree: false,
    marketingAgree: null,
  });

  // 일반 인풋
  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // 체크박스
  const handleCheckboxChange = (key) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [key]: e.target.checked,
    }));
  };

  // 라디오 버튼
  const handleRadioChange = (e) => {
    const value = e.target.value === 'yes';
    setFormData((prev) => ({
      ...prev,
      marketingAgree: value,
    }));
  };

  // ✅ 회원가입 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.password ||
      !formData.lastName ||
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.birthday ||
      !formData.dataTransferAgree ||
      !formData.personalDataAgree
    ) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    try {
      // 1) Firebase Auth에 계정 생성
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const firebaseUser = userCredential.user;

      // 2) Firestore에 프로필 정보 저장 (users/{uid})
      const userDocRef = doc(db, 'users', firebaseUser.uid);

      const userProfile = {
        uid: firebaseUser.uid,
        lastName: formData.lastName,
        name: formData.name,
        fullName: formData.lastName + formData.name,
        phone: formData.phone,
        email: formData.email,
        birthday: formData.birthday,
        dataTransferAgree: formData.dataTransferAgree,
        personalDataAgree: formData.personalDataAgree,
        marketingAgree: formData.marketingAgree,
        provider: 'email',
        createdAt: new Date().toISOString(),
        wishList: [],
        cartItem: [],
      };

      await setDoc(userDocRef, userProfile);

      navigate('/joinComplete');
    } catch (err) {
      console.error('회원가입 에러:', err);
      if (err.code === 'auth/email-already-in-use') {
        alert('이미 사용 중인 이메일입니다.');
      } else {
        alert('회원가입 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="join-wrap">
      <div className="join-container">
        <div className="join-inner">
          <h2>계정 만들기</h2>

          <p>
            계정을 만들면 동의에 따라 온라인 및 매장 모두에서 개별적이고 맞춤화된 경험을 제공하고
            요청한 제품, 서비스, 정보를 제공하며 고객과 소통합니다.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-list">
              <div className="email-input">
                <p>이메일*</p>
                <EmailInput
                  value={formData.email}
                  onChange={(value) => handleInputChange('email', value)}
                />
              </div>

              <div className="password-input">
                <p>비밀번호*</p>
                <PasswordInput
                  value={formData.password}
                  onChange={(value) => handleInputChange('password', value)}
                />
              </div>

              <div className="passCheck-input">
                <p>비밀번호 확인*</p>
                <PasswordCheck />
              </div>

              <div className="name-input">
                <NameInput
                  lastName={formData.lastName}
                  name={formData.name}
                  onLastNameChange={(value) => handleInputChange('lastName', value)}
                  onNameChange={(value) => handleInputChange('name', value)}
                />
              </div>

              <div className="phone-input">
                <p>전화번호*</p>
                <PhoneInput
                  value={formData.phone}
                  onChange={(value) => handleInputChange('phone', value)}
                />
              </div>

              <div className="nation-input">
                <p>국가*</p>
                <input type="text" placeholder="Korea" readOnly />
              </div>

              <div className="birthday-input">
                <p>생년월일*</p>
                <BirthdayInput
                  value={formData.birthday}
                  onChange={(value) => handleInputChange('birthday', value)}
                />
              </div>

              {/* 약관 */}
              <div className="check-wrap">
                <div className="agree-check">
                  <input
                    type="checkbox"
                    checked={formData.dataTransferAgree}
                    onChange={handleCheckboxChange('dataTransferAgree')}
                  />
                  <div className="agree-title">
                    <label>
                      개인정보 국외 이전 동의(필수) <Link>추가정보</Link>
                    </label>
                  </div>
                </div>

                <div className="agree-check">
                  <input
                    type="checkbox"
                    checked={formData.personalDataAgree}
                    onChange={handleCheckboxChange('personalDataAgree')}
                  />
                  <div className="agree-title">
                    <label>
                      <span>개인 데이터 수집 및 사용 동의(필수)</span>
                      <br />
                      <span>
                        개인정보 처리방침에 명시된 대로 등록된 고객에게만 제공되는 개인화된 경험과
                        서비스를 위해 동의합니다. <Link>추가정보</Link>
                      </span>
                    </label>
                  </div>
                </div>

                <div className="agree-radio">
                  <label className="radio-item">
                    <input
                      type="radio"
                      name="agree"
                      value="yes"
                      checked={formData.marketingAgree === true}
                      onChange={handleRadioChange}
                    />
                    동의합니다
                  </label>
                  <label className="radio-item">
                    <input
                      type="radio"
                      name="agree"
                      value="no"
                      checked={formData.marketingAgree === false}
                      onChange={handleRadioChange}
                    />
                    동의하지 않습니다
                  </label>
                </div>
              </div>
            </div>

            <button type="submit" className="join-button">
              가입하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Join;
