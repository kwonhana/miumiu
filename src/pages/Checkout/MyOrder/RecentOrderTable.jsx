// src/pages/...?/RecentOrderTable.jsx
import React, { useEffect, useState } from 'react';
import './scss/RecentOrderTable.scss';

import { db } from '../../../api/firebase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useAuthStore } from '../../../api/authStore';

const RecentOrderTable = () => {
  const { user } = useAuthStore();
  const [recentOrders, setRecentOrders] = useState([]);

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

  useEffect(() => {
    const fetchRecentOrders = async () => {
      if (!user) return;

      const uid = user.uid || user.userId || user.id;

      const ordersRef = collection(db, 'users', uid, 'orders');

      // 최근 6개월만 (원하면 where 빼도 됨)
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      let q = query(
        ordersRef,
        where('createdAt', '>=', sixMonthsAgo),
        orderBy('createdAt', 'desc')
      );

      const snap = await getDocs(q);

      const orders = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRecentOrders(orders);
    };

    fetchRecentOrders();
  }, [user]);

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
        {(!recentOrders || recentOrders.length === 0) && (
          <tr>
            <td colSpan={6}>최근 주문 내역이 없습니다.</td>
          </tr>
        )}

        {/* 주문 배열을 돌면서 행 렌더링 */}
        {recentOrders.map((order) => {
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

          return (
            <tr key={order.id}>
              <td>{order.orderNumber}</td>
              <td>{formatDate(order.createdAt)}</td>
              <td>{productName}</td>
              <td>{totalCount}</td>
              <td>{formatPrice(amount)}</td>
              <td>{order.status || '주문 완료'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default RecentOrderTable;
