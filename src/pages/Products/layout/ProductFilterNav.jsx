import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../component/layout/Button';
import ProductFilterWrap from './ProductFilterWrap';
import '../scss/ProductFilterWrap.scss';

const normalizeMaterial = (mat) => (mat ? mat.replace(/^주 소재:\s*/, '').trim() : '');

const ProductFilterNav = ({ list = [], onFilterChange }) => {
  const [filterOpen, setFilterOpen] = useState(false);

  const cate = Array.from(new Set(list.map((el) => el.category1)));
  const currentCategory = cate[0] || '';

  const isCollecCate = ['bags', 'shoes'].includes(currentCategory);

  const collectionList = isCollecCate
    ? Array.from(new Set(list.map((el) => el.tags).filter((tag) => tag && tag.trim() !== '')))
    : [];

  const fabricList = Array.from(
    new Set(list.map((el) => normalizeMaterial(el.material)).filter((m) => m && m.trim() !== ''))
  );

  const cateObj = Array.from(
    new Map(
      list.map((el) => {
        const key = `${el.categoryKor2}-${el.category2}`;
        return [
          key,
          {
            kor2: el.categoryKor2,
            cate: el.category1,
            cate2: el.category2,
          },
        ];
      })
    ).values()
  );

  const handleApplyFilter = ({ collection, fabric }) => {
    let result = [...list];

    if (collection) {
      result = result.filter((item) => item.tags === collection);
    }
    if (fabric) {
      result = result.filter((item) => normalizeMaterial(item.material) === fabric);
    }

    onFilterChange && onFilterChange(result);
    setFilterOpen(false);
  };
  return (
    <div className="ProductNav">
      <div className="nav-inner">
        <ul>
          <li>
            <Link to={`/${cate}`} className="link">
              모든 룩 보기
            </Link>
          </li>

          {!query
            ? cateObj.map((el, i) => (
                <li key={i}>
                  <Link to={`/${el.cate}/${el.ce2}`} className="link">
                    {el.kor2}
                  </Link>
                </li>
              ))
            : cate.map((c, id) => (
                <li key={id}>
                  <button onClick={() => handleFilter(c)}>{c}</button>
                </li>
              ))}
        </ul>

        <div className="button-wrap" onClick={() => setFilterOpen(true)}>
          <Button title="필터 및 정렬" />
        </div>
      </div>

      <ProductFilterWrap
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        collection={collectionList}
        fabric={fabricList}
        onApplyFilter={handleApplyFilter}
      />
    </div>
  );
};

export default ProductFilterNav;
