import React from 'react';
import '../scss/ProductFilterWrap.scss';
import { Link } from 'react-router-dom';
import Button from '../../../component/layout/Button';

const ProductFilterNav = ({ list }) => {
  const cateKor = Array.from(new Set(list.map((el) => el.categoryKor2)));
  const cate = Array.from(new Set(list.map((el) => el.category1)));
  const cate2 = Array.from(new Set(list.map((el) => el.category2)));

  const cateObj = Array.from(
    new Map(
      list.map((el) => {
        const key = `${el.categoryKor2}-${el.category1}-${el.category2}`;
        return [
          key,
          {
            kor: el.categoryKor2,
            cate: el.category1,
            cate2: el.category2,
          },
        ];
      })
    ).values()
  );

  console.log(cateObj);

  return (
    <div className="ProductNav">
      <div className="nav-inner">
        <ul>
          <li>
            <Link to={`/${cate}`} className="link">
              모든 룩 보기
            </Link>
          </li>
          {cateObj.map((el, i) => {
            return (
              <li key={i}>
                <Link to={`/${el.cate}/${el.cate2}`} className="link">
                  {el.kor}
                </Link>{' '}
              </li>
            );
          })}
        </ul>
        <div className="button-wrap">
          <Button title="필터 및 정렬" />
        </div>
      </div>
    </div>
  );
};

export default ProductFilterNav;
