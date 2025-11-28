// // src/pages/Products/layout/ProductFilterNav.jsx
// import React from 'react';
// import '../scss/ProductFilterWrap.scss';
// import { Link } from 'react-router-dom';

// const ProductFilterNav = ({ list, query, activeCategory, onChangeCategory, onOpenFilter }) => {
//   // 🔹 검색 결과(list) 안에 있는 category1 / categoryKor1 쌍만 추출
//   const catePairs = Array.from(
//     new Map(
//       list.map((el) => [el.category1, el.categoryKor1]) // key: code, value: label
//     ).entries()
//   );

//   const handleClickAll = () => {
//     if (!query) return;
//     onChangeCategory(null); // 🔥 전체 보기
//   };

//   const handleClickCategory = (cateCode) => {
//     if (!query) return;
//     onChangeCategory(cateCode); // 🔥 해당 카테고리 선택
//   };

//   return (
//     <div className="ProductNav">
//       <div className="nav-inner">
//         <ul>
//           {/* 모든 룩 보기 */}
//           <li>
//             {!query ? (
//               <Link to="/" className="link">
//                 모든 룩 보기
//               </Link>
//             ) : (
//               <button
//                 className={`link ${!activeCategory ? 'active' : ''}`}
//                 type="button"
//                 onClick={handleClickAll}>
//                 모든 룩 보기
//               </button>
//             )}
//           </li>

//           {/* 검색 결과에 등장한 카테고리1 탭 */}
//           {query &&
//             catePairs.map(([code, label]) => (
//               <li key={code}>
//                 <button
//                   type="button"
//                   className={activeCategory === code ? 'active' : ''}
//                   onClick={() => handleClickCategory(code)}>
//                   {label}
//                 </button>
//               </li>
//             ))}
//         </ul>

//         <div className="button-wrap">
//           <button type="button" onClick={onOpenFilter}>
//             필터 및 정렬
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductFilterNav;

//-----------적용-------------------
// src/pages/Products/layout/ProductFilterNav.jsx
import React from 'react';
import '../scss/ProductFilterWrap.scss';
import { useNavigate } from 'react-router-dom';

const ProductFilterNav = ({
  category1,
  category2,
  sendClick,
  list,
  onOpenFilter,
  category2List,
  custom,
}) => {
  const navigate = useNavigate();
  const cateObj = Array.from(
    new Map(
      list
        .filter((item) => item.category1 === category1)
        .map((el) => [
          el.category2,
          {
            kor2: el.categoryKor2,
            cate: el.category1, //
            cate2: el.category2,
          },
        ])
    ).values()
  );

  console.log(cateObj, '한글???????');

  return (
    <div className="ProductNav">
      <div className="nav-inner">
        <ul>
          <li className={!category2 ? 'active' : ''} onClick={() => navigate(`/${category1}`)}>
            전체
          </li>

          {/* 여기서 props로 받은 category2List만 사용!! */}
          {custom
            ? category2List.map((sub, idx) => (
                <li key={idx}>
                  <button
                    className={category2 === sub ? 'active' : ''}
                    onClick={() => sendClick(sub)}
                  >
                    {sub}
                  </button>
                </li>
              ))
            : cateObj.map((sub, idx) => (
                <li key={idx}>
                  <button
                    className={category2 === sub.cate2 ? 'active' : ''}
                    onClick={() => sendClick(sub.cate2)}
                  >
                    {sub.kor2}
                  </button>
                </li>
              ))}
        </ul>

        <div className="button-wrap">
          {/* ✅ 여기서 필터 랩 열기 */}
          <button
            type="button"
            onClick={() => {
              if (onOpenFilter) onOpenFilter();
            }}
          >
            필터 및 정렬
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilterNav;
