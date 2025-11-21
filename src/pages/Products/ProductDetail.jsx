import React, { useEffect, useState } from 'react';
import Button from '../../component/layout/Button';
import { Link, useParams } from 'react-router-dom';
import { useProductsStore } from '../../store/useProductsStore';
import ProductSkeleton from './layout/ProductSkeleton';
import ProductDetailNav from './layout/ProductDetailNav';
import ProductShoesSize from './layout/ProductShoesSize';
import './scss/ProductDetail.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const { items, onFetchItems } = useProductsStore();
  //상품을 저장하는 변수
  const [product, setProduct] = useState(null);
  //이미지를 저장하는 변수
  const [mainImage, setMainImage] = useState('');
  // TODO 연관 아이템
  const [relatedProducts, setRelatedProducts] = useState([]);

  //TODO 데이터 존재 여부 확인하여 데이터 가지고 오기
  useEffect(() => {
    if (items.length === 0) {
      onFetchItems();
    }
  }, []);

  //TODO 불러와질 상품 찾기
  useEffect(() => {
    const findItem = items.find((item) => item.id === id);
    setProduct(findItem);
  }, [id, items]);

  //TODO 메인 이미지 찾기
  useEffect(() => {
    if (product?.local_detail_images?.length > 0) {
      setMainImage(product.local_detail_images[0]); // 이때 mainImage는 string으로 가정
    }
  }, [product]);

  //TODO 연관 상품 4개 추출
  useEffect(() => {
    if (product) {
      const related = items.filter(
        (item) => item.id !== product.id && item.category2 === product.category2
      );
      const shuffled = [...related].sort(() => 0.5 - Math.random());

      setRelatedProducts(shuffled.slice(0, 4));
    }
  }, [product, items]);

  console.log(product, '상세페이지 상품');

  const handleScroll = (targetID) => {
    const target = document.getElementById(targetID);

    if (target) {
      const navHeight = 300;
      const elementPosition = target.getBoundingClientRect().top;
      const offset = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offset,
        behavior: 'smooth',
      });
    } else {
      console.warn(`Target element with id #${target} not found.`);
    }
  };

  if (!product) {
    return <ProductSkeleton />;
  }

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
          <ProductDetailNav onScroll={handleScroll} />
          <div className="inner">
            <div className="product-info" id="detail-info">
              <ul className="info-list ">
                {product.local_detail_images.map((img, index) => {
                  return (
                    <React.Fragment key={index}>
                      <li>
                        <img src={`/assets/images/detail/${img}`} alt={product.name} />
                      </li>

                      {index === 1 && (
                        <div className="product-acc-info " id="info-text">
                          <div className="info">
                            <h4>{product.name}</h4>
                            <p>{product.subtitle}</p>
                          </div>
                        </div>
                      )}

                      {index === 3 && (
                        <div className="product-acc-info flex " id="product-size">
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
              {product.category1 === 'shoes' && <ProductShoesSize />}
            </div>
          </div>
        </div>
      </section>
      <section className="RelatedProducts">
        <h3>관련 제품</h3>
        <ul className="products-wrap">
          {relatedProducts.map((item) => (
            <li key={item.id}>
              <Link to={`/product/${item.id}`}>
                <img
                  src={
                    item.local_detail_images?.[0]
                      ? `/assets/images/detail/${item.local_detail_images[0]}`
                      : '/assets/images/default-product-image.png'
                  }
                  alt={item.name}
                />
                <div className="product-text-box">
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default ProductDetail;
