import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IdInput from '../../../component/input/IdInput';
import PasswordInput from '../../../component/input/PasswordInput';
import NameInput from '../../../component/input/NameInput';
import PhoneInput from '../../../component/input/PhoneInput';
import BirthdayInput from '../../../component/input/BirthdayInput';
import './Join.scss';
import EmailInput from '../../../component/input/EmailInput';

const Join = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: '',
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

  // 👇 1. 일반 입력 및 자식 컴포넌트의 값 변경을 처리하는 함수
  // (key: 상태 객체의 키, value: 변경된 값)
  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // 👇 2. 체크박스의 변경을 처리하는 함수
  // (key: 상태 객체의 키)
  const handleCheckboxChange = (key) => (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: e.target.checked,
    }));
  };

  // 👇 3. 라디오 버튼의 변경을 처리하는 함수
  const handleRadioChange = (e) => {
    const value = e.target.value === 'yes'; // 'yes'는 true, 'no'는 false로 변환
    setFormData((prevData) => ({
      ...prevData,
      marketingAgree: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.userId ||
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

    // localStorage에 저장
    localStorage.setItem('userData', JSON.stringify(formData));
    alert('회원가입이 완료되었습니다!');
    navigate('/login');
  };
  return (
    <div className="join-wrap">
      <div className="join-container">
        <div className="join-inner">
          <h2>계정 만들기</h2>
          <p>
            계정을 만들면 동의에 따라 온라인 및 매장 모두에서 개별적이고 맞춤화된 경험을 제공하고
            요청한 제품, 서비스, 정보를 제공하며 고객과 소통합니다. 또한 프라다 그룹 고객
            데이터베이스에 등록된 고객을 위한 익스클루시브 서비스와 혜택을 제공합니다.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="input-list">
              <div className="id-input">
                <p>아이디*</p>
                <IdInput
                  value={formData.userId}
                  onChange={(value) => handleInputChange('userId', value)}
                />
              </div>
              <div className="password-input">
                <p>비밀번호*</p>
                <PasswordInput
                  value={formData.password}
                  onChange={(value) => handleInputChange('password', value)}
                />
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
              <div className="email-input">
                <p>이메일*</p>
                <EmailInput
                  value={formData.email}
                  onChange={(value) => handleInputChange('email', value)}
                />
              </div>
              <div className="nation-input">
                <p>국가*</p>
                <input type="text" placeholder="korea" readOnly />
              </div>
              <div className="birthday-input">
                <p>생년월일*</p>
                <BirthdayInput
                  value={formData.birthday}
                  onChange={(value) => handleInputChange('birthday', value)}
                />
              </div>
              <div className="check-wrap">
                <div className="agree-check">
                  <input
                    type="checkbox"
                    checked={formData.dataTransferAgree}
                    onChange={handleCheckboxChange('dataTransferAgree')}
                  />
                  <div className="agree-title">
                    <label>
                      개인정보 국외 이전 동의(필수)
                      <Link>추가정보</Link>
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
                        본인은 개인 계정을 만들고 <Link>개인정보 처리방침</Link>에 명시된 대로
                        등록된 고객에게만 제공되는 개인화되고 맞춤화된 경험과 기타 독점 서비스 및
                        혜택을 제공받기 위해 개인 데이터를 수집, 사용 및 공개하는 데 동의합니다.
                        <Link>추가정보</Link>
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
