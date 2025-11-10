import React from 'react';
import '../scss/couLet.scss';
import { Link } from 'react-router-dom';
import Button from '../../../component/layout/Button';

const CousLet = () => {
  return (
    <section className="CousLetter-wrap">
      <div className="inner">
        <div className="box">
          <div className="boxlayout">
            <p className="title">CUSTOMER SERVICE</p>
            <p className="sub-title">도움이 필요하신가요?</p>
            <Link className="go-btn" to="/">
              GO
            </Link>
          </div>
          <div className="boxlayout">
            <p className="title">NEW LETTER</p>
            <p className="sub-title">
              최신 캠페인과 컬렉션 소식을 메일을 통해
              <br />
              빠르게 만나보세요!
            </p>
            <input type="email" placeholder="이메일 주소*" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CousLet;
