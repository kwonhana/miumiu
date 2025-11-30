import './scss/RecentOrderTable.scss';
import RecentNone from './RecentNone';

const RecentOrderTable = ({ orders = [] }) => {
  const hasOrders = Array.isArray(orders) && orders.length > 0;

  const formatDate = (ts) => {
    if (!ts) return '';
    try {
      const d = ts.toDate ? ts.toDate() : new Date(ts);
      return d.toLocaleDateString('ko-KR');
    } catch {
      return '';
    }
  };

  const formatPrice = (price) => {
    if (price == null) return '-';
    const num =
      typeof price === 'number' ? price : parseInt(String(price).replace(/[^0-9]/g, ''), 10);
    if (isNaN(num)) return '-';
    return num.toLocaleString('ko-KR') + '원';
  };

  return (
    <section className="recentOrder">
      <div className="recentOrder-inner">
        <div className="title-wrap">
          <h2>최근 구매 내역</h2>
          <p>최근 6개월 간의 온라인 구매 내역을 확인하실 수 있습니다.</p>
        </div>

        {/* TODO 주문 있을 때는 테이블 그대로, 없으면 다른 컴포넌트 렌더링 */}
        {hasOrders ? (
          <table className="order-table">
            <tbody>
              <tr>
                <th>주문번호</th>
                <th>주문일</th>
                <th>상품명</th>
                <th>구매 개수</th>
                <th>금액</th>
                <th>주문상태</th>
              </tr>

              {orders.map((order) => {
                const items = order.items || [];
                const firstItem = items[0];

                let productName = '-';
                if (firstItem?.name) {
                  productName =
                    items.length > 1
                      ? `${firstItem.name} 외 ${items.length - 1}건`
                      : firstItem.name;
                }

                const totalCount = items.length;
                const amount = order.finalPrice ?? order.totalPrice ?? null;
                const status = order.computedStatus || order.status || '주문 완료';

                return (
                  <tr key={order.id}>
                    <td>{order.orderNumber}</td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td>{productName}</td>
                    <td>{totalCount}</td>
                    <td>{formatPrice(amount)}</td>
                    <td>{status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          // TODO 여기서 네가 넣을 컴포넌트 렌더링 (import는 네가 추가)
          <RecentNone />
        )}
      </div>
    </section>
  );
};

export default RecentOrderTable;
