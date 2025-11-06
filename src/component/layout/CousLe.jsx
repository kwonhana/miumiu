import React from "react";
import "../../App.scss";
import "../../styles/cousLe.scss";

const CousLe = () => {
  return (
    <section className="CousLetter-wrap">
      <div className="inner">
        <div className="box">
          <div className="boxlayout">
            <p className="title">CUSTOMER SERVICE</p>
            <p className="sub-title">도움이 필요하신가요?</p>
            <button>GO</button>
          </div>
          <div className="boxlayout">
            <p className="title">NEW LETTER</p>
            <p className="sub-title">최신 캠페인과 컬렉션 소식을 메일을 통해<br/>빠르게 만나보세요!</p>
            <input type="email" placeholder="이메일 주소*" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CousLe;
