import React from 'react';
import { useAuthStore } from '../../../api/authStore';
import { useProductsStore } from '../../../store/useProductsStore';

const WIshList = () => {
  const wishList = useProductsStore((state) => state.wishList);
  const user = useAuthStore((state) => state.user);
  const fullName = [user.lastName, user.name].filter(Boolean).join('');
  return (
    <div className="container">
      <section className="WishList">
        <div className="WishList-inner">
          <div className="WishList-wrap">
            <h2>{fullName || user.displayName}님의 위시리스트</h2>
            <div className="WishList-items">
              {wishList.length === 0 ? (
                <p>위시리스트에 담긴 상품이 없습니다.</p>
              ) : (
                <ul className="WishList-items">
                  {wishList.map((wish) => (
                    <li key={wish.id || wish.productId}>
                      <div className="img">
                        <img src={wish.image} alt={wish.title} />
                      </div>
                      <div className="wish-info">
                        <div className="wish-info-left">
                          <p>제품ID</p>
                          <p>{wish.title}</p>
                          <p>수량</p>
                        </div>
                        <div className="wish-info-right">
                          <button>
                            <img src="/assets/icon/CartIcon.svg" alt="cart" />
                          </button>
                          <button>
                            <img src="/assets/icon/delete.png" alt="delete" />
                          </button>
                          <p>{wish.price}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WIshList;
