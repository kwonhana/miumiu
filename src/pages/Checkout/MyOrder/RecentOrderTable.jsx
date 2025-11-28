// src/pages/.../RecentOrderTable.jsx
import React from 'react';
import './scss/RecentOrderTable.scss';

// 🔹 MyOrder에서 props로 orders를 전달받는다
const RecentOrderTable = ({ orders = [] }) => {
  // 날짜 포맷
  const formatDate = (ts) => {
    if (!ts) return '';
    try {
      const d = ts.toDate ? ts.toDate() : new Date(ts);
      return d.toLocaleDateString('ko-KR'); // 예: 2025. 11. 10
    } catch {
      return '';
    }
  };

  // 금액 포맷
  const formatPrice = (price) => {
    if (price == null) return '-';
    const num =
      typeof price === 'number' ? price : parseInt(String(price).replace(/[^0-9]/g, ''), 10);
    if (isNaN(num)) return '-';
    return num.toLocaleString('ko-KR') + '원';
  };

  const hasOrders = orders && orders.length > 0;

  return (
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

        {/* 주문이 없을 때 */}
        {!hasOrders && (
          <tr>
            <td colSpan={6}>최근 주문 내역이 없습니다.</td>
          </tr>
        )}

        {/* 주문 배열을 돌면서 행 렌더링 */}
        {hasOrders &&
          orders.map((order) => {
            const items = order.items || [];
            const firstItem = items[0];

            // 상품명: 첫 상품 이름 + 외 N건
            let productName = '-';
            if (firstItem?.name) {
              productName =
                items.length > 1 ? `${firstItem.name} 외 ${items.length - 1}건` : firstItem.name;
            }

            // 총 개수
            const totalCount = items.reduce((sum, it) => sum + (it.count || 1), 0);

            // 금액: finalPrice 있으면 우선, 없으면 totalPrice
            const amount = order.finalPrice ?? order.totalPrice ?? null;

            // 🔹 MyOrder에서 미리 계산해서 넣어준 상태값 사용
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
  );
};

export default RecentOrderTable;
