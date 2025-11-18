import React from 'react';
import { Link } from 'react-router-dom';
import IdInput from '../../../component/input/IdInput';
import PasswordInput from '../../../component/input/PasswordInput';
import NameInput from '../../../component/input/NameInput';
import PhoneInput from '../../../component/input/PhoneInput';
import BirthdayInput from '../../../component/input/BirthdayInput';
import './Join.scss';

const Join = () => {
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
          <div className="input-list">
            <div className="id-input">
              <p>아이디*</p>
              <IdInput />
            </div>
            <div className="password-input">
              <p>비밀번호*</p>
              <PasswordInput />
            </div>

            <div className="name-input">
              <NameInput />
            </div>
            <div className="phone-input">
              <p>전화번호*</p>
              <PhoneInput />
            </div>
            <div className="nation-input">
              <p>국가*</p>
              <input type="text" placeholder="korea" readOnly />
            </div>
            <div className="birthday-input">
              <p>생년월일*</p>
              <BirthdayInput />
            </div>
            <div className="check-wrap">
              <div className="agree-check">
                <input type="checkbox" />
                <div className="agree-title">
                  <label>
                    개인정보 국외 이전 동의(필수)
                    <Link>추가정보</Link>
                  </label>
                </div>
              </div>
              <div className="agree-check">
                <input type="checkbox" />
                <div className="agree-title">
                  <label>
                    <span>개인 데이터 수집 및 사용 동의(필수)</span>
                    <br />
                    <span>
                      본인은 개인 계정을 만들고 <Link>개인정보 처리방침</Link>에 명시된 대로 등록된
                      고객에게만 제공되는 개인화되고 맞춤화된 경험과 기타 독점 서비스 및 혜택을
                      제공받기 위해 개인 데이터를 수집, 사용 및 공개하는 데 동의합니다.
                      <Link>추가정보</Link>
                    </span>
                  </label>
                </div>
              </div>
              <div className="agree-radio">
                <label className="radio-item">
                  <input type="radio" name="agree" value="yes" />
                  동의합니다
                </label>
                <label className="radio-item">
                  <input type="radio" name="agree" value="no" />
                  동의하지 않습니다
                </label>
              </div>
            </div>
          </div>
          <Link to="/mypage" className="join-button">
            가입하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Join;
