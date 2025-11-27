import React from 'react';
import RecentOrderTable from './RecentOrderTable';
import OngoingProcess from './OngoingProcess';
import './scss/MyOrder.scss';
import OngoingNone from './OngoingNone';
import RecentNone from './RecentNone';
import { useNavigate } from 'react-router-dom';

// TODO 결제
const MyOrder = () => {
  const navigate = useNavigate();
  return (
    <div className="myOrder">
      <div className="myOrder-inner">
        <div className="container">
          <section className="ongoingOrder">
            <div className="ongoingOrder-inner">
              <h2>진행중인 주문</h2>
              <OngoingProcess />
              <div className="ongoingCard-wrap">
                <div className="ongoingCard">
                  <div
                    className="img-box"
                    onClick={() => navigate('/product/5BA284_2F81_F0124_V_OON')}>
                    <img
                      src="/assets/images/detail/5BA284_2F81_F0124_V_OON_detail_thumbnail.jpg"
                      alt="handbag"
                    />
                  </div>
                  <div className="text-box">
                    <div className="productOption">
                      <p className="productName">아이비 코듀로이 핸드백</p>
                      {/* <p className="size">사이즈: </p> */}
                      <p className="count">수량: 1</p>
                    </div>
                    <p className="productCode">5BA284_2F81_F0124_V_OON</p>
                    <p className="date">2025. 11. 01</p>
                    <p className="orderState">주문 완료</p>
                  </div>
                </div>
                <div className="ongoingCard">
                  <div
                    className="img-box"
                    onClick={() => navigate('/product/5BA284_2F81_F0124_V_OON')}>
                    <img
                      src="/assets/images/detail/5BB179_2ICY_F0002_V_OOO_detail_thumbnail.jpg"
                      alt="bags"
                    />
                  </div>
                  <div className="text-box">
                    <div className="productOption">
                      <p className="productName">나파 가죽 포켓 탑핸들 백</p>
                      {/* <p className="size">사이즈: </p> */}
                      <p className="count">수량: 1</p>
                    </div>
                    <p className="productCode">5BB179_2ICY_F0002_V_OOO</p>
                    <p className="date">2025. 11. 01</p>
                    <p className="orderState">주문 완료</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="recentOrder">
            <div className="recentOrder-inner">
              <div className="title-wrap">
                <h2>최근 구매 내역</h2>
                <p>최근 6개월 간의 온라인 구매 내역을 확인하실 수 있습니다.</p>
              </div>
              <RecentOrderTable />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
