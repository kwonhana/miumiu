// // import React, { useEffect, useState } from 'react';
// // import { useProductsStore } from '../../store/useProductsStore';
// // import { useParams } from 'react-router-dom';
// // import ProductBanner from './layout/ProductBanner';
// // import ProductFilterNav from './layout/ProductFilterNav';
// // import ProductFilterWrap from './layout/ProductFilterWrap';
// // import './scss/Category1.scss';
// // import ProductList from './layout/ProductList';

// // const Category1 = () => {
// //   const { category1, category2, tags } = useParams();
// //   const { filtered, onFetchItems, onCateOnly, onCateTag, onCate1, items } = useProductsStore();
// //   // const { cateImg, setCateImg } = useState('');
// //   const [extraFilteredList, setExtraFilteredList] = useState(null); // ✅ 추가
// //   const [isFilterOpen, setIsFilterOpen] = useState(false);
// //   console.log(category1, category2, 'zzzzzzzzzzz');

// //   useEffect(() => {
// //     onFetchItems();
// //   }, []);
// //   useEffect(() => {
// //     if (category1 && category2 && tags) {
// //       onCateOnly(category1, category2);
// //     } else if (category1 && tags && !category2) {
// //       onCateTag(category1, tags);
// //     } else if (category1 && category2 && !tags) {
// //       onCateOnly(category1, category2);
// //     } else if (category1 && !category2 && !tags) {
// //       onCate1(category1);
// //     }
// //   }, [category1, category2, tags, onFetchItems, onCateOnly, onCateTag, onCate1]);

// //   useEffect(() => {
// //     console.log('📌 filtered 변경됨:', filtered.length);
// //   }, [filtered]);

// //   const handleFilterChange = (result) => {
// //     if (!result || result.length === 0) {
// //       setExtraFilteredList(null);
// //     } else {
// //       setExtraFilteredList(result);
// //     }
// //   };

// //   const handleOpenFilter = () => {
// //     setIsFilterOpen(true);
// //   };

// //   const handleCloseFilter = () => {
// //     setIsFilterOpen(false);
// //   };

// //   const handleApplyFilter = (filters) => {
// //     console.log('🔵 필터 적용 시작');
// //     console.log('🔵 받은 filters:', filters);
// //     console.log('🔵 원본 filtered 길이:', filtered.length);

// //     let result = [...filtered];

// //     if (filters.collection) {
// //       result = result.filter((item) => item.tags === filters.collection);
// //       console.log('🔵 collection 필터 후:', result.length);
// //     }

// //     if (filters.fabric) {
// //       result = result.filter((item) => {
// //         if (!item.material) return false;
// //         const cleanMaterial = item.material.replace(/^주\s*소재:\s*/g, '').trim();
// //         return cleanMaterial === filters.fabric;
// //       });
// //       console.log('🔵 fabric 필터 후:', result.length);
// //     }

// //     if (filters.sort) {
// //       switch (filters.sort) {
// //         case 'name-asc':
// //           result.sort((a, b) => a.name.localeCompare(b.name));
// //           break;
// //         case 'name-desc':
// //           result.sort((a, b) => b.name.localeCompare(a.name));
// //           break;
// //         case 'price-asc':
// //           result.sort((a, b) => {
// //             const priceA = parseInt(a.price.replace(/[^\d]/g, '')) || 0;
// //             const priceB = parseInt(b.price.replace(/[^\d]/g, '')) || 0;
// //             return priceA - priceB;
// //           });
// //           break;
// //         case 'price-desc':
// //           result.sort((a, b) => {
// //             const priceA = parseInt(a.price.replace(/[^\d]/g, '')) || 0;
// //             const priceB = parseInt(b.price.replace(/[^\d]/g, '')) || 0;
// //             return priceB - priceA;
// //           });
// //           break;
// //         default:
// //           break;
// //       }
// //       console.log('🔵 정렬 후:', filters.sort);
// //     }

// //     if (!filters.collection && !filters.fabric && !filters.sort) {
// //       console.log('🔵 필터 없음 - 전체 표시');
// //       setExtraFilteredList(null);
// //     } else {
// //       console.log('🔵 최종 결과:', result.length);
// //       setExtraFilteredList(result);
// //     }

// //     setIsFilterOpen(false);
// //   };

// //   const displayList = extraFilteredList || filtered;
// //   const collectionArray = Array.from(new Set(filtered.map((item) => item.tags).filter(Boolean)));
// //   const fabricArray = Array.from(
// //     new Set(
// //       filtered
// //         .map((item) => {
// //           if (!item.material) return null;
// //           // "주 소재: 송아지 가죽" → "송아지 가죽"
// //           return item.material.replace(/^주\s*소재:\s*/g, '').trim();
// //         })
// //         .filter(Boolean)
// //     )
// //   );

// //   let filterCategory1 = Array.from(new Set(filtered.map((el) => el.categoryKor1)));

// //   console.log('🔍 collectionArray:', collectionArray);
// //   console.log('🔍 fabricArray:', fabricArray);
// //   console.log('🔍 filtered:', filtered);

// //   return (
// //     <div className="Category1">
// //       <ProductBanner bannerTitle={category1} korTitle={filterCategory1} />
// //       <ProductFilterNav
// //         list={filtered}
// //         query={false}
// //         onFilter={handleFilterChange}
// //         onOpenFilter={handleOpenFilter}
// //       />
// //       <div className="inner">
// //         <div className="sub-title">
// //           {category1 === 'bags' && (
// //             <>
// //               <h3>미우미우 가방</h3>
// //               <p>
// //                 라인에 대한 연구와 세련된 아티잔 크래프트맨십이 백 컬렉션의 본질을 담아냅니다.
// //                 <br />
// //                 아카이벌 인스피레이션과 컨템퍼러리 미학이 만나 아이코닉한 모델을 끊임없이
// //                 진화시킵니다.
// //               </p>
// //             </>
// //           )}
// //           {category1 === 'shoes' && (
// //             <>
// //               <h3>미우미우 신발</h3>
// //               <p>
// //                 신발 컬렉션은 클래식한 스타일과 소재가 스포티한 실루엣의 역동적인 특성과 만나
// //                 <br />
// //                 아이코닉한 디테일로 더욱 돋보이는 현대적인 다양성을 표현합니다.
// //               </p>
// //             </>
// //           )}
// //           {category1 === 'jewellery' && (
// //             <>
// //               <h3>미우미우 악세사리</h3>
// //               <p>
// //                 섬세한 색조 또는 클래식 뉘앙스가 인상적인 미우미우의 대표적인 가죽고 모티프로 제작한
// //                 세련된 액세서리
// //               </p>
// //             </>
// //           )}
// //           {category1 === 'wallets' && (
// //             <>
// //               <h3>미우미우 지갑</h3>
// //               <p>메세지 추가필요 메세지 추가필요</p>
// //             </>
// //           )}
// //         </div>
// //       </div>
// //       <ProductList filteredList={displayList} />

// //       <ProductFilterWrap
// //         collection={collectionArray}
// //         fabric={fabricArray}
// //         isOpen={isFilterOpen}
// //         onClose={handleCloseFilter}
// //         onApplyFilter={handleApplyFilter}
// //       />
// //     </div>
// //   );
// // };

// // export default Category1;

// //---------적용----------------------------------------
// import React, { useEffect, useState } from 'react';
// import { useProductsStore } from '../../store/useProductsStore';
// import { useNavigate, useParams } from 'react-router-dom';
// import ProductBanner from './layout/ProductBanner';
// import ProductFilterNav from './layout/ProductFilterNav';
// import ProductFilterWrap from './layout/ProductFilterWrap';
// import './scss/Category1.scss';
// import ProductList from './layout/ProductList';
// import { CustomItem } from '../../store/data';

// const Category1 = () => {
//   const { category1, category2 } = useParams();
//   const { items, filterCategory1, onCustomStyle } = useProductsStore();
//   // const { cateImg, setCateImg } = useState('');
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [extraFilteredList, setExtraFilteredList] = useState(null); // ✅ 추가
//   const [custom, setCustom] = useState(false);
//   const navigate = useNavigate();

//   // -----------------------------------------
//   // ⭐ Category1/Category2 기준 필터링 전체 로직
//   // -----------------------------------------
//   let filtered = [];

//   if (category1 && category2) {
//     if (category1 === 'CustomStudio') {
//       filtered = onCustomStyle(category2); // 계산만! store 변경 없음
//     } else {
//       filtered = items.filter(
//         (item) => item.category1 === category1 && item.category2 === category2
//       );
//     }
//   } else if (category1) {
//     filtered = items.filter((item) => item.category1 === category1);
//   } else {
//     filtered = items;
//   }

//   console.log('filtered??:,', category1, category2, filtered);

//   useEffect(() => {
//     if (category1 === 'CustomStudio') {
//       setCustom(true);
//     } else {
//       setCustom(false);
//     }
//   }, [category1]);

//   let category2List = [];

//   if (category1 === 'CustomStudio') {
//     // CustomStudio 전용 탭 (Closet / Custom)
//     category2List = Array.from(new Set(CustomItem.map((i) => i.style)));
//   } else {
//     // 일반 카테고리일 때 → 실제 제품의 category2 기준
//     category2List = Array.from(
//       new Set(items.filter((item) => item.category1 === category1).map((item) => item.category2))
//     );
//   }

//   console.log('cate2222222222222', category2List);
//   //  Category 클릭 시 이동
//   // -----------------------------------------
//   const handleCategoryClick = (sub) => {
//     navigate(`/${category1}/${sub}`);
//   };

//   //  필터 적용
//   // -----------------------------------------
//   const handleApplyFilter = (filters) => {
//     let result = [...filtered];

//     if (filters.collection) {
//       result = result.filter((item) => item.tags === filters.collection);
//     }

//     if (filters.fabric) {
//       result = result.filter((item) => {
//         if (!item.material) return false;
//         const cleanMaterial = item.material.replace(/^주\s*소재:\s*/g, '').trim();
//         return cleanMaterial === filters.fabric;
//       });
//     }

//     if (filters.sort) {
//       switch (filters.sort) {
//         case 'name-asc':
//           result.sort((a, b) => a.name.localeCompare(b.name));
//           break;
//         case 'name-desc':
//           result.sort((a, b) => b.name.localeCompare(a.name));
//           break;
//         case 'price-asc':
//           result.sort((a, b) => {
//             const priceA = parseInt(a.price.replace(/[^\d]/g, '')) || 0;
//             const priceB = parseInt(b.price.replace(/[^\d]/g, '')) || 0;
//             return priceA - priceB;
//           });
//           break;
//         case 'price-desc':
//           result.sort((a, b) => {
//             const priceA = parseInt(a.price.replace(/[^\d]/g, '')) || 0;
//             const priceB = parseInt(b.price.replace(/[^\d]/g, '')) || 0;
//             return priceB - priceA;
//           });
//           break;
//         default:
//           break;
//       }
//     }

//     if (!filters.collection && !filters.fabric && !filters.sort) {
//       setExtraFilteredList(null);
//     } else {
//       setExtraFilteredList(result);
//     }

//     setIsFilterOpen(false);
//   };

//   const handleFilterChange = (result) => {
//     if (!result || result.length === 0) {
//       setExtraFilteredList(null);
//     } else {
//       setExtraFilteredList(result);
//     }
//   };

//   const handleOpenFilter = () => setIsFilterOpen(true);
//   const handleCloseFilter = () => setIsFilterOpen(false);

//   // -----------------------------------------
//   // ⭐ 필터 리스트 생성
//   // -----------------------------------------
//   const collectionArray = Array.from(new Set(filtered.map((item) => item.tags).filter(Boolean)));

//   const fabricArray = Array.from(
//     new Set(
//       filtered
//         .map((item) => {
//           if (!item.material) return null;
//           return item.material.replace(/^주\s*소재:\s*/g, '').trim();
//         })
//         .filter(Boolean)
//     )
//   );

//   return (
//     <div className="Category1">
//       <ProductBanner bannerTitle={category1} korTitle={filterCategory1} />
//       <ProductFilterNav
//         category1={category1}
//         category2={category2}
//         list={items}
//         sendClick={handleCategoryClick}
//         onOpenFilter={handleOpenFilter}
//         category2List={category2List}
//         custom={custom}
//       />
//       <div className="inner">
//         <div className="sub-title">
//           {category1 === 'bags' && (
//             <>
//               <h3>미우미우 가방</h3>
//               <p>
//                 라인에 대한 연구와 세련된 아티잔 크래프트맨십이 백 컬렉션의 본질을 담아냅니다.
//                 <br />
//                 아카이벌 인스피레이션과 컨템퍼러리 미학이 만나 아이코닉한 모델을 끊임없이
//                 진화시킵니다.
//               </p>
//             </>
//           )}
//           {category1 === 'shoes' && (
//             <>
//               <h3>미우미우 신발</h3>
//               <p>
//                 신발 컬렉션은 클래식한 스타일과 소재가 스포티한 실루엣의 역동적인 특성과 만나
//                 <br />
//                 아이코닉한 디테일로 더욱 돋보이는 현대적인 다양성을 표현합니다.
//               </p>
//             </>
//           )}
//           {category1 === 'jewellery' && (
//             <>
//               <h3>미우미우 악세사리</h3>
//               <p>
//                 섬세한 색조 또는 클래식 뉘앙스가 인상적인 미우미우의 대표적인 가죽고 모티프로 제작한
//                 세련된 액세서리
//               </p>
//             </>
//           )}
//           {category1 === 'wallets' && (
//             <>
//               <h3>미우미우 지갑</h3>
//               <p>메세지 추가필요 메세지 추가필요</p>
//             </>
//           )}
//         </div>
//       </div>
//       <ProductList filteredList={extraFilteredList ?? filtered} />

//       <ProductFilterWrap
//         collection={collectionArray}
//         fabric={fabricArray}
//         isOpen={isFilterOpen}
//         onClose={handleCloseFilter}
//         onApplyFilter={handleApplyFilter}
//       />
//     </div>
//   );
// };

// export default Category1;

import React, { useEffect, useState } from 'react';
import { useProductsStore } from '../../store/useProductsStore';

import ProductBanner from './layout/ProductBanner';
import ProductFilterNav from './layout/ProductFilterNav';
import ProductFilterWrap from './layout/ProductFilterWrap';
import './scss/Category1.scss';
import ProductList from './layout/ProductList';
import { CustomItem } from '../../store/data';

import { Link, useParams, useNavigate } from 'react-router-dom';

const Category1 = () => {
  const { category1, category2 } = useParams();
  const { items, filterCategory1, onCustomStyle } = useProductsStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [extraFilteredList, setExtraFilteredList] = useState(null);
  const [custom, setCustom] = useState(false);
  const navigate = useNavigate();

  // -----------------------------------------
  // ⭐ Category1/Category2 기준 필터링 전체 로직
  // -----------------------------------------
  let filtered = [];

  if (category1 && category2) {
    if (category1 === 'CustomStudio') {
      filtered = onCustomStyle(category2); // 계산만! store 변경 없음
    } else {
      filtered = items.filter(
        (item) => item.category1 === category1 && item.category2 === category2
      );
    }
  } else if (category1) {
    filtered = items.filter((item) => item.category1 === category1);
  } else {
    filtered = items;
  }

  console.log('filtered??:,', category1, category2, filtered);

  useEffect(() => {
    if (category1 === 'CustomStudio') {
      setCustom(true);
    } else {
      setCustom(false);
    }
  }, [category1]);

  let category2List = [];

  if (category1 === 'CustomStudio') {
    // CustomStudio 전용 탭 (Closet / Custom)
    category2List = Array.from(new Set(CustomItem.map((i) => i.style)));
  } else {
    // 일반 카테고리일 때 → 실제 제품의 category2 기준
    category2List = Array.from(
      new Set(items.filter((item) => item.category1 === category1).map((item) => item.category2))
    );
  }

  console.log('cate2222222222222', category2List);
  //  Category 클릭 시 이동
  // -----------------------------------------
  const handleCategoryClick = (sub) => {
    navigate(`/${category1}/${sub}`);
  };

  //  필터 적용
  // -----------------------------------------
  const handleApplyFilter = (filters) => {
    let result = [...filtered];

    if (filters.collection) {
      result = result.filter((item) => item.tags === filters.collection);
    }

    if (filters.fabric) {
      result = result.filter((item) => {
        if (!item.material) return false;
        const cleanMaterial = item.material.replace(/^주\s*소재:\s*/g, '').trim();
        return cleanMaterial === filters.fabric;
      });
    }

    if (filters.sort) {
      switch (filters.sort) {
        case 'name-asc':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          result.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'price-asc':
          result.sort((a, b) => {
            const priceA = parseInt(a.price.replace(/[^\d]/g, '')) || 0;
            const priceB = parseInt(b.price.replace(/[^\d]/g, '')) || 0;
            return priceA - priceB;
          });
          break;
        case 'price-desc':
          result.sort((a, b) => {
            const priceA = parseInt(a.price.replace(/[^\d]/g, '')) || 0;
            const priceB = parseInt(b.price.replace(/[^\d]/g, '')) || 0;
            return priceB - priceA;
          });
          break;
        default:
          break;
      }
    }

    if (!filters.collection && !filters.fabric && !filters.sort) {
      setExtraFilteredList(null);
    } else {
      setExtraFilteredList(result);
    }

    setIsFilterOpen(false);
  };

  const handleFilterChange = (result) => {
    if (!result || result.length === 0) {
      setExtraFilteredList(null);
    } else {
      setExtraFilteredList(result);
    }
  };

  const handleOpenFilter = () => setIsFilterOpen(true);
  const handleCloseFilter = () => setIsFilterOpen(false);

  // -----------------------------------------
  // ⭐ 필터 리스트 생성
  // -----------------------------------------
  const collectionArray = Array.from(new Set(filtered.map((item) => item.tags).filter(Boolean)));

  const fabricArray = Array.from(
    new Set(
      filtered
        .map((item) => {
          if (!item.material) return null;
          return item.material.replace(/^주\s*소재:\s*/g, '').trim();
        })
        .filter(Boolean)
    )
  );

  return (
    <div className="Category1">
      <div className="inner">
        <ProductFilterNav
          category1={category1}
          category2={category2}
          list={items}
          sendClick={handleCategoryClick}
          onOpenFilter={handleOpenFilter}
          category2List={category2List}
          custom={custom}
        />

        {/* 필터 적용된 리스트가 있으면 그걸 표시 */}
        <ProductList filteredList={extraFilteredList ?? filtered} />

        {isFilterOpen && (
          <ProductFilterWrap
            collection={collectionArray}
            fabric={fabricArray}
            isOpen={isFilterOpen}
            onClose={handleCloseFilter}
            onApplyFilter={handleApplyFilter}
          />
        )}
      </div>
    </div>
  );
};

export default Category1;
