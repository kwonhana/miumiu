// src/pages/.../MyOrder.jsx
import { useEffect, useState } from 'react';
import RecentOrderTable from './RecentOrderTable';
import OngoingProcess from './OngoingProcess';
import './scss/MyOrder.scss';
import RecentNone from './RecentNone';
import { useNavigate } from 'react-router-dom';

// TODO 파이어베이스 관련 import
import { db } from '../../../api/firebase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useAuthStore } from '../../../api/authStore';

// TODO 시간 기준으로 주문 상태 계산하는 함수
const getOrderStatusByTime = (paymentTime) => {
  if (!paymentTime) return '결제완료';

  const now = new Date();
  const payTime = paymentTime.toDate ? paymentTime.toDate() : new Date(paymentTime);

  const diffMs = now - payTime; // 밀리초 단위 차이
  const hours = diffMs / (1000 * 60 * 60); // 시간
  const days = diffMs / (1000 * 60 * 60 * 24); // 일

  // 1) 6시간 미만: 결제완료
  if (hours < 6) return '결제완료';

  // 2) 6시간 이상 ~ 1일 미만: 배송 준비 중
  if (days < 1) return '배송 준비 중';

  // 3) 1일 이상 ~ 3일 미만: 배송 중
  if (days < 3) return '배송 중';

  // 4) 3일 이상: 배송 완료
  return '배송 완료';
};

// TODO 날짜 포맷 도우미
const formatDate = (ts) => {
  if (!ts) return '';
  try {
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString('ko-KR'); // 예: 2025. 11. 01
  } catch {
    return '';
  }
};

const MyOrder = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  // TODO 전체 주문 목록 (computedStatus 포함해서 저장)
  const [orders, setOrders] = useState([]);

  // 진행중인 주문 목록 (배송 완료 아닌 것만)
  const [ongoingOrders, setOngoingOrders] = useState([]);

  // 상태별 카운트
  const [statusCounts, setStatusCounts] = useState({
    payment: 0,
    prepare: 0,
    delivering: 0,
    delivered: 0,
  });

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      const uid = user.uid || user.userId || user.id;

      const ordersRef = collection(db, 'users', uid, 'orders');

      // TODO 최근 6개월만 가져오기 (테이블이랑 동일 기준)
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      const q = query(
        ordersRef,
        where('createdAt', '>=', sixMonthsAgo),
        orderBy('createdAt', 'desc')
      );

      const snap = await getDocs(q);

      const rawOrders = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // TODO 각 주문에 시간 기준 상태(computedStatus) 붙이기
      const withStatus = rawOrders.map((order) => {
        const baseTime = order.paymentTime || order.createdAt; // paymentTime 없으면 createdAt 사용
        const computedStatus = getOrderStatusByTime(baseTime);
        return {
          ...order,
          computedStatus,
        };
      });

      // TODO 전체 주문 저장 (테이블에 props로 내려줄 것)
      setOrders(withStatus);

      // TODO 진행중 주문 = 배송 완료가 아닌 주문들
      const ongoing = withStatus.filter((order) => order.computedStatus !== '배송 완료');
      setOngoingOrders(ongoing);

      // TODO 상태별 카운트 계산 (📌 진행중 주문 + 아이템 수량 기준)
      const counts = ongoing.reduce(
        (acc, order) => {
          // 이 주문에 포함된 아이템 수량 합산
          const itemCount = order.items?.length ?? 0;

          switch (order.computedStatus) {
            case '결제완료':
              acc.payment += itemCount;
              break;
            case '배송 준비 중':
              acc.prepare += itemCount;
              break;
            case '배송 중':
              acc.delivering += itemCount;
              break;
            case '배송 완료':
              acc.delivered += itemCount;
              break;
            default:
              break;
          }

          return acc;
        },
        { payment: 0, prepare: 0, delivering: 0, delivered: 0 }
      );

      setStatusCounts(counts);
    };

    fetchOrders();
  }, [user]);

  // TODO OngoingProcess에 넘겨줄 기준 시간 (가장 최근 진행중 주문 기준)
  const latestOngoing = ongoingOrders[0];
  const latestPaymentTime = latestOngoing
    ? latestOngoing.paymentTime || latestOngoing.createdAt
    : null;
  console.log(ongoingOrders, statusCounts);
  return (
    <div className="myOrder">
      <div className="myOrder-inner">
        <div className="container">
          {/* 진행중 주문 섹션 */}
          <section className="ongoingOrder">
            <div className="ongoingOrder-inner">
              <h2>진행 중인 주문</h2>

              {ongoingOrders.length > 0 && latestPaymentTime && (
                <OngoingProcess paymentTime={latestPaymentTime} counts={statusCounts} />
              )}

              <div className="ongoingCard-wrap">
                {ongoingOrders.length === 0 && <RecentNone />}

                {ongoingOrders.map((order) =>
                  order.items?.map((item, idx) => {
                    // TODO text-box 안에서 사용할 데이터 배열 만들기
                    const textBoxData = [
                      {
                        key: 'productName',
                        className: 'productName',
                        value: item.name,
                      },
                      {
                        key: 'count',
                        className: 'count',
                        value: `수량: ${item.count || 1}`,
                      },
                      {
                        key: 'productCode',
                        className: 'productCode',
                        value: item.id, // 또는 item.code / sku
                      },
                      {
                        key: 'date',
                        className: 'date',
                        value: formatDate(order.createdAt),
                      },
                      {
                        key: 'orderState',
                        className: 'orderState',
                        // TODO 여기서도 computedStatus 사용
                        value: order.computedStatus || '결제완료',
                      },
                    ];

                    return (
                      <div className="ongoingCard" key={`${order.id}-${item.id}-${idx}`}>
                        <div className="img-box" onClick={() => navigate(`/product/${item.id}`)}>
                          <img
                            src={
                              item.detail_images[0]?.url
                                ? `${item.detail_images[0].url}`
                                : '/assets/images/default-product-image.png'
                            }
                            alt={item.name}
                          />
                        </div>

                        <div className="text-box">
                          <div className="productOption">
                            {/* TODO 이름 + 수량 */}
                            {textBoxData.slice(0, 2).map((t) => (
                              <p key={t.key} className={t.className}>
                                {t.value}
                              </p>
                            ))}
                          </div>

                          {/* TODO 코드 / 날짜 / 상태 */}
                          {textBoxData.slice(2).map((t) => (
                            <p key={t.key} className={t.className}>
                              {t.value}
                            </p>
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </section>

          {/*TODO 최근 주문 테이블 섹션 */}
          <RecentOrderTable orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
