import React, { useEffect, useState } from 'react';
import Button from '../../component/layout/Button';
import './scss/ProductDetail.scss';
import { useParams } from 'react-router-dom';
import { useProductsStore } from '../../store/useProductsStore';
import ProductSkeleton from './layout/ProductSkeleton';
import ProductDetailNav from './layout/ProductDetailNav';

const ProductDetail = () => {
  const { id } = useParams();
  const { items, onFecthItems } = useProductsStore();
  //상품을 저장하는 변수
  const [product, setProduct] = useState(null);
  //이미지를 저장하는 변수
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    if (items.length === 0) {
      onFecthItems();
    }
  }, []);

  useEffect(() => {
    const findItem = items.find((item) => item.id === id);
    setProduct(findItem);
  }, [id, items]);

  useEffect(() => {
    if (product?.local_detail_images?.length > 0) {
      setMainImage(product.local_detail_images[0]); // 이때 mainImage는 string으로 가정
    }
  }, [product]);

  if (!product) {
    return <ProductSkeleton />;
  }
  console.log(setMainImage, mainImage, '이미지');

  console.log(product, '상세페이지 상품');

  return (
    <>
      <section className="ProductDetail-wrap">
        <div className="inner">
          <div className="ProductDetail-top">
            <div className="top-left">
              <div className="main-image">
                <img src={`/assets/images/detail/${mainImage}`} alt="" />
              </div>
              <ul className="sub-image">
                {product.local_detail_images.map((img, index) => {
                  return (
                    <li key={index} className={mainImage === img ? 'active' : ''}>
                      <img
                        src={`/assets/images/detail/${img}`}
                        onClick={() => setMainImage(img)}
                        alt={product.name}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="top-right">
              <p className="title">
                <span className="tag">{product.tags ? product.tags : ''}</span>
                <div className="wish-icon"></div>
              </p>
              <h3>{product.name}</h3>
              <p className="price">{product.price}</p>

              <div className="button-wrap">
                <Button title="장바구니 담기" />
                <Button title="구매하기" />
              </div>
            </div>
          </div>
        </div>
        <div className="ProductDetail-bottom">
          <ProductDetailNav />
          <div className="inner">
            <div className="product-info">
              <ul className="info-list">
                {product.local_detail_images.map((img, index) => {
                  return (
                    <React.Fragment key={index}>
                      <li>
                        <img src={`/assets/images/detail/${img}`} alt={product.name} />
                      </li>

                      {index === 1 && (
                        <div className="product-acc-info">
                          <div className="info">
                            <h4>{product.name}</h4>
                            <p>{product.subtitle}</p>
                          </div>
                        </div>
                      )}

                      {index === 3 && (
                        <div className="product-acc-info flex">
                          <div className="info">
                            <h4>사이즈</h4>
                            <ul>
                              {product.size_info.map((el, i) => {
                                return <li key={i}>· {el}</li>;
                              })}
                            </ul>
                          </div>

                          <div className="info">
                            <h4>소재</h4>
                            <ul>
                              <li>· {product.material}</li>
                            </ul>
                          </div>

                          <div className="info">
                            <h4>추가 정보 </h4>
                            <ul>
                              {product.bullet_points.map((el, i) => {
                                return <li key={i}>· {el}</li>;
                              })}
                            </ul>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="RelatedProducts">
        <h3>관련 제품</h3>

        <div className="products-wrap"></div>
      </section>
    </>
  );
};

export default ProductDetail;
