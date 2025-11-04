import React from 'react';
import { Link } from 'react-router-dom';

const shoes = [
  { key: '부츠', label: '부츠' },
  { key: '로퍼 및 레이스업', label: '로퍼 및 레이스업' },
  { key: '스니커즈', label: '스니커즈' },
  { key: '발레리나', label: '발레리나' },
  { key: '샌들', label: '샌들' },
  { key: '펌프스', label: '펌프스' },
];
const conicshoes = [
  { key: '미우 발레', label: '미우 발레' },
  { key: '페니 로퍼', label: '페니 로퍼' },
  { key: '윈터 슈즈', label: '윈터 슈즈' },
  { key: '플룸', label: '플룸' },
  { key: '김나지움', label: '김나지움' },
  { key: '루슈', label: '루슈' },
];
const Lnbshoes = () => {
  return (
    <div className="lnb-shoes">
      <div className="lng-shoes-left">
        <ul>
          <span>슈즈</span>
          {shoes.map((shoe) => (
            <li key={shoe.key}>
              <Link to={`/${shoe.key}`}>{shoe.label}</Link>
            </li>
          ))}
        </ul>
        <div className="shoes-imgs-left">
          <img src="" alt="" />
        </div>
      </div>

      <div className="lnb-shoes-right">
        <ul>
          <span>아이코닉 슈즈</span>
          {conicshoes.map((conicshoe) => (
            <li key={conicshoe.key}>
              <Link to={`/${conicshoe.key}`}>{conicshoe.label}</Link>
            </li>
          ))}
        </ul>
        <div className="shoes-imgs-right">
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Lnbshoes;
