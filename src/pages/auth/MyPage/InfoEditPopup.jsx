import React from 'react';
import PhoneInput from '../../../component/input/PhoneInput';
import EmailInput from '../../../component/input/EmailInput';
import './InfoEditPopup.scss';

const InfoEditPopup = () => {
  return (
    <div className="edit-popup-wrap">
      <div className="edit-popup">
        <div className="title-wrap">
          <p>회원 정보 수정하기</p>
        </div>

        <div className="popup-content">
          <div className="input-wrap">
            <p>기본 정보</p>

            <div className="lockedName-input">
              <p>이름</p>
              <input type="text" placeholder="" readOnly />
            </div>

            <div className="lockedBirthday-input">
              <p>생년월일</p>
              <input type="text" placeholder="" readOnly />
            </div>

            <div className="phoneEdit-input">
              <p>휴대폰 번호</p>
              <PhoneInput />
            </div>

            <div className="emailEdit-input">
              <p>이메일</p>
              <EmailInput />
            </div>
          </div>
          <div className="button-wrap">
            <button>취소</button>
            <button>변경하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoEditPopup;
