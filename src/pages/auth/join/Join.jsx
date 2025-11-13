import React from 'react';
import AuthInput from '../../../component/input/AuthInput';
import EmailInput from '../../../component/input/EmailInput';
import './Join.scss';
import NameInput from '../../../component/input/NameInput';
import PhoneInput from '../../../component/input/PhoneInput';
import BirthdayInput from '../../../component/input/BirthdayInput';

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
            <div className="email-input">
              <EmailInput />
              <AuthInput />
            </div>
            <div className="name-input">
              <NameInput />
            </div>
            <div className="phone-input">
              <PhoneInput />
            </div>
            <div className="nation-input">
              <p>국가*</p>
              <input type="text" placeholder="korea" />
            </div>
            <div className="birthday-input">
              <BirthdayInput />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
