import React from "react";
import "../../App.scss"
import "../../styles/footer.scss";
import Logo from "./Logo";

const footermenu = [
  {
    title: "법적고지",
    menu: [
      "이용약관",
      "개인정보 처리방침",
      "쿠키 정책",
      "쿠키 설정",
      "판매 약관",
    ],
  },
  {
    title: "회사",
    menu: ["프라다 그룹", "사회적 책임", "채용정보"],
  },
  {
    title: "지원",
    menu: ["미우미우 서비스", "주문 추적", "FAQ", "반품"],
  },
];

const Footer = () => {
  return (
    <footer>
      <div className="inner">
        <div className="footer-top">
          <div className="footer-logo">
            <Logo color="black" />
          </div>
          <div className="footer-right">
            {footermenu.map((menus) => (
              <div key={menus.title} className="menu-box">
                <div className="menu-title">{menus.title}</div>
                <ul>
                  {menus.menu.map((subm, index) => (
                    <li key={index}>{subm}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <address>
            <p>
              회사명: 프라다 코리아 (유). 사업자등록번호: 213-86-18599. 대표자:
              최문영. 개인정보 보호책임자: 조우제. 통신판매신고번호:
              2017-서울강남-04082. 주소: 서울시 강남구 압구정로 439 06010.
              클라이언트 서비스: 080-522-7198.
              이메일: CLIENT.SERVICE.KR@MIUMIU.COM.
            </p>
            <p>
              법적고지 및 이용약관 (링크를 확인하세요). 호스팅 서비스: WIIT.
              구매안전서비스: NHN한국 사이버결제 주식회사에 가입하여 고객님의
              안전한 거래를 보장하고 있습니다. 모든제품은 2016년 1월 이후 생산된
              제품 입니다.
            </p>
          </address>
          <p className="copy">
            © PRADA 2005 - 2025 | Tax registration number is 213-86-18599
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
