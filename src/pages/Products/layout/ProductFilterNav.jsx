import React from 'react';
import '../scss/ProductFilterWrap.scss';
import { Link, useParams } from 'react-router-dom';
import { useProductsStore } from '../../../store/useProductsStore';
import { CustomItem } from '../../../store/data';

const ProductFilterNav = ({ list, query, onFilter }) => {
  const { setFiltered, onCustomStyle,onCateOnly} = useProductsStore();
  const { category1,category2 } = useParams();

  const isSearchPage = Boolean(query); // 검색 페이지 여부
  const isCustomPage = category1 === "CustomStudio"; // CustomStudio 페이지 여부
  console.log("누구", category1,category2)

  // 카테고리2 메뉴 가공 (중복 제거)
  const cateObj = Array.from(
    new Map(
      list.map((el) => {
        const key = `${el.categoryKor2}-${el.category1}-${el.category2}`;
        return [
          key,
          {
            kor1: el.categoryKor1,
            kor2: el.categoryKor2,
            cate1: el.category1,
            cate2: el.category2,
          },
        ];
      })
    ).values()
  );

  /** ------------------------------
   *  필터 버튼 클릭 처리
   * ------------------------------ */
  // 모든 룩 보기가 안됨 custom에서??? 여기 링크주ㅡ소는??/
  // 
  // 



  const handleFilter = (filterKey) => {
    if (isSearchPage && onFilter) {
      // 검색 페이지: categoryKor1 기준 필터
      onFilter(list.filter(item => item.categoryKor1 === filterKey));
      return;
    }

    // if (isCustomPage) {
    //   // CustomStudio 페이지: CustomItem 스타일 기준 필터
    //   const filteredCustom = list.filter(item =>
    //     CustomItem.some(c => c.style === filterKey && c.itemId === item.id)
    //   );
    //   setFiltered(filteredCustom); // 상태 업데이트
    //   return;
    // }

    // 일반 카테고리: categoryKor1 기준 필터
    setFiltered(list.filter(item => item.categoryKor1 === filterKey));
    console.log(list.filter(item => item.categoryKor1 === filterKey))
  };

  /** ------------------------------
   *  "모든 룩 보기" 버튼
   * ------------------------------ */
  const handleShowAll = () => {
    if (isSearchPage && onFilter) {
      onFilter(list);
    } else if (isCustomPage) {
    onCustomStyle(category2)
    }
  };

  return (
    <div className="ProductNav">
      <div className="nav-inner">
        <ul>
          {/* 모든 룩 보기 */}
          <li>
            {!isSearchPage && !isCustomPage ? (
              <Link to={`/${list[0]?.category1 || ''}`} className="link">
                모든 룩 보기
              </Link>
            ) : (
              <button className="link" onClick={handleShowAll}>
                모든 룩 보기
              </button>
            )}
          </li>

          {/* 조건 분기 */}
          {isSearchPage || isCustomPage ? (
            // 검색 페이지 / CustomStudio → 버튼
            cateObj.map((el, i) => (
              <li key={i}>
                <button className="link" onClick={() => handleFilter(el.kor1)}>
                  {el.kor2}
                </button>
              </li>
            ))
          ) : (
            // 일반 카테고리 → Link
            cateObj.map((el, i) => (
              <li key={i}>
                <Link to={`/${el.cate1}/${el.cate2}`} className="link">
                  {el.kor2}
                </Link>
              </li>
            ))
          )}
        </ul>

        {/* 필터 및 정렬 버튼 */}
        <div className="button-wrap">
          <button>필터 및 정렬</button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilterNav;