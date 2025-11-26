import React from 'react';
import MypageBanner from '../../auth/MyPage/MypageBanner';
import MypageNav from '../../auth/MyPage/MypageNav';
import RecentOrderTable from './RecentOrderTable';
import OngoingProcess from './OngoingProcess';
import './scss/MyOrder.scss';
import OngoingNone from './OngoingNone';
import RecentNone from './RecentNone';

const MyOrder = () => {
  return (
    <div className="myOrder">
      <div className="myOrder-inner">
        <MypageBanner />
        <MypageNav />

        <div className="container">
          <section className="ongoingOrder">
            <div className="ongoingOrder-inner">
              <h2>진행중인 주문</h2>
              <OngoingProcess />
              <div className="ongoingCard-wrap">
                <div className="ongoingCard">
                  <div className="img-box">
                    <img src="" alt="" />
                  </div>
                  <div className="text-box">
                    <div className="productOption">
                      <p className="productName">아이비 코듀로이 핸드백</p>
                      <p className="size">사이즈: </p>
                      <p className="count">수량: </p>
                    </div>
                    <p className="productCode">5BA284_2F81_F0124_V_OON</p>
                    <p className="date">2025. 11. 01</p>
                    <p className="orderState">주문 완료</p>
                  </div>
                </div>
                <div className="ongoingCard">
                  <div className="img-box">
                    <img src="" alt="" />
                  </div>
                  <div className="text-box">
                    <div className="productOption">
                      <p className="productName">아르카디 마테라쎄 나파 가죽 백</p>
                      <p className="size">사이즈: </p>
                      <p className="count">수량: </p>
                    </div>
                    <p className="productCode">5BA284_2F81_F0124_V_OON</p>
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
