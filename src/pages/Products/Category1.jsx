import React, { useEffect, useState } from 'react';
import { useProductsStore } from '../../store/useProductsStore';
import { useParams } from 'react-router-dom';
import ProductBanner from './layout/ProductBanner';
import ProductFilterNav from './layout/ProductFilterNav';
import './scss/Category1.scss';
import ProductList from './layout/ProductList';

const Category1 = () => {
  const { category1, category2, tags } = useParams();
  const { filtered, onFetchItems, onCateOnly, onCateTag, onCate1 } = useProductsStore();
  // const { cateImg, setCateImg } = useState('');

  useEffect(() => {
    onFetchItems();
  }, []);
  useEffect(() => {
    if (category1 && category2 && tags) {
      onCateOnly(category1, category2);
    } else if (category1 && tags && !category2) {
      onCateTag(category1, tags);
    } else if (category1 && category2 && !tags) {
      onCateOnly(category1, category2);
    } else if (category1 && !category2 && !tags) {
      onCate1(category1);
    }
  }, [category1, category2, tags, onFetchItems, onCateOnly, onCateTag, onCate1]);

  let filterCategory1 = Array.from(new Set(filtered.map((el) => el.categoryKor1)));

  return (
    <div className="Category1">
      <ProductBanner bannerTitle={category1} korTitle={filterCategory1} />
      <ProductFilterNav list={filtered} />
      <div className="inner">
        <div className="sub-title">
          {category1 === 'bags' && (
            <>
              <h3>미우미우 가방</h3>
              <p>
                라인에 대한 연구와 세련된 아티잔 크래프트맨십이 백 컬렉션의 본질을 담아냅니다.
                <br />
                아카이벌 인스피레이션과 컨템퍼러리 미학이 만나 아이코닉한 모델을 끊임없이
                진화시킵니다.
              </p>
            </>
          )}
          {category1 === 'shoes' && (
            <>
              <h3>미우미우 신발</h3>
              <p>
                신발 컬렉션은 클래식한 스타일과 소재가 스포티한 실루엣의 역동적인 특성과 만나
                <br />
                아이코닉한 디테일로 더욱 돋보이는 현대적인 다양성을 표현합니다.
              </p>
            </>
          )}
          {category1 === 'jewellery' && (
            <>
              <h3>미우미우 악세사리</h3>
              <p>
                섬세한 색조 또는 클래식 뉘앙스가 인상적인 미우미우의 대표적인 가죽고 모티프로 제작한
                세련된 액세서리
              </p>
            </>
          )}
          {category1 === 'wallets' && (
            <>
              <h3>미우미우 지갑</h3>
              <p>메세지 추가필요 메세지 추가필요</p>
            </>
          )}
        </div>
      </div>
      <ProductList />
    </div>
  );
};

export default Category1;
