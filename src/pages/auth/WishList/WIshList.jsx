import React, { useState } from 'react';
import { useAuthStore } from '../../../api/authStore';
import { useProductsStore } from '../../../store/useProductsStore';
import { count } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './WishList.scss';
import './WishListPopup.scss';

const WIshList = () => {
  const wishList = useProductsStore((state) => state.wishList);
  const onAddToCart = useProductsStore((state) => state.onAddToCart);
  const onToggleWish = useProductsStore((state) => state.onToggleWish);

  const user = useAuthStore((state) => state.user);
  const fullName = [user.lastName, user.name].filter(Boolean).join('');

  // TODO 삭제 팝업용
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  //TODO 카트 아이콘 클릭
  const handleClickCart = (wish) => {
    // 장바구니에 담고
    onAddToCart(wish, wish.count || 1);
    // 위시에서 제거
    onToggleWish(wish);
  };

  // TODO 쓰레기통아이콘 클릭 -> 팝업 열기
  const handleClickDeleteIcon = (wish) => {
    setDeleteTarget(wish);
    setIsDeleteOpen(true);
  };

  // TODO 팝업에서 삭제
  const handlePopupDelete = () => {
    if (!deleteTarget) return;
    onToggleWish(deleteTarget);
    setDeleteTarget(null);
    setIsDeleteOpen(false);
  };
  // TODO 팝업에서 취소누르거나 바깥을 클릭
  const handleCancelDelete = () => {
    setDeleteTarget(null);
    setIsDeleteOpen(false);
  };

  const navigate = useNavigate();
  return (
    <div className="container">
      <section className="WishList">
        <div className="WishList-inner">
          <div className="WishList-wrap">
            <h2>{fullName || user.displayName}님의 위시리스트</h2>
            <div className="WishList-items">
              {wishList.length === 0 ? (
                <div className="wish-empty">
                  <h2>위시리스트가 비어 있습니다.</h2>
                  <p>관심있는 상품을 추가해 보세요</p>
                  <button onClick={() => navigate('/bags')}>쇼핑하러 가기</button>
                </div>
              ) : (
                <ul className="WishList-item">
                  {wishList.map((wish) => (
                    <li key={wish.id || wish.productId}>
                      <div className="img">
                        <img
                          src={
                            wish.local_detail_images?.[0]
                              ? `/assets/images/detail/${wish.local_detail_images[0]}`
                              : '/assets/images/default-product-image.png'
                          }
                          alt={wish.name}
                        />
                      </div>

                      <div className="wish-info">
                        <div className="wish-info-left">
                          <p className="wishId">{wish.id}</p>
                          <p className="wishName">{wish.name}</p>
                          <p className="wishCount">수량 : {wish.count}</p>
                        </div>
                        <div className="wish-info-right">
                          <div className="wish-icon">
                            <button onClick={() => handleClickCart(wish)}>
                              <img src="/assets/icon/cart_Black.svg" alt="cart" />
                            </button>
                            <button onClick={() => handleClickDeleteIcon(wish)}>
                              <img src="/assets/icon/delete_black.svg" alt="delete" />
                            </button>
                          </div>
                          <p className="wishPrice">{wish.price}원</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        {isDeleteOpen && (
          <div className="wish-delete-backdrop" onClick={handleCancelDelete}>
            <div className="wish-delete-modal" onClick={(e) => e.stopPropagation()}>
              <p>해당 상품을 삭제하시겠습니까?</p>
              <div className="btn-area">
                <button className="btn-cancel" onClick={handleCancelDelete}>
                  취소
                </button>
                <button className="btn-delete" onClick={handlePopupDelete}>
                  확인
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default WIshList;
