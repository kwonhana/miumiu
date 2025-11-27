import React from 'react';
import './scss/RecentOrderTable.scss';

const RecentOrderTable = () => {
  return (
    <table className="order-table">
      <tbody>
        <tr>
          <th>주문번호</th>
          <th>주문일</th>
          <th>상품명</th>
          <th>상품 옵션</th>
          <th>구매 개수</th>
          <th>금액</th>
          <th>주문상태</th>
        </tr>

        <tr>
          <td>2025-1110-000123</td>
          <td>2025.11.10</td>
          <td>벨벳 스크런치</td>
          <td>앨리베스터 핑크</td>
          <td>1</td>
          <td>550,000원</td>
          <td>주문 취소</td>
        </tr>

        <tr>
          <td>2025-1101-000123</td>
          <td>2025.10.01</td>
          <td>뉴발란스 X 미우미우 스웨이드 및 메쉬 스니커즈</td>
          <td>에크루 | 35</td>
          <td>1</td>
          <td>1,690,000원</td>
          <td>배송 완료</td>
        </tr>

        <tr>
          <td>2025-0927-000045</td>
          <td>2025.09.27</td>
          <td>나파 가족 포켓 백</td>
          <td>블랙</td>
          <td>1</td>
          <td>4,800,000원</td>
          <td>배송 완료</td>
        </tr>

        <tr>
          <td>2025-0719-000017</td>
          <td>2025.07.19</td>
          <td>마테라쎄 나파 가족 카드 홀더</td>
          <td>아쿠아마린</td>
          <td>1</td>
          <td>690,000원</td>
          <td>주문 취소</td>
        </tr>

        <tr>
          <td>2025-0612-000017</td>
          <td>2025.06.12</td>
          <td>에나멜 메탈 귀걸이</td>
          <td>아마란스 레드/메이즈 옐로우</td>
          <td>1</td>
          <td>490,000원</td>
          <td>배송 완료</td>
        </tr>
      </tbody>
    </table>
  );
};

export default RecentOrderTable;
