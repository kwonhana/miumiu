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
const Lnbshoes = ({ isActive }) => {
  return (
    <div className={`lnb-shoes ${isActive ? '' : 'hidden'}`}>
      <div className="lnb-inner">
        <div className="lnb-shoes-left">
          <ul>
            <span>슈즈</span>
            {shoes.map((shoe) => (
              <li key={shoe.key}>
                <Link to={`/${shoe.key}`}>{shoe.label}</Link>
              </li>
            ))}
          </ul>
          <div className="shoes-imgs-left">
            <img src="/assets/images/lnb/shoes-list.jpg" alt="신발" />
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
            <img src="/assets/images/lnb/shoes-miu.jpg" alt="미우발레" />
            <img src="/assets/images/lnb/shoes-plum.jpg" alt="플룸" />
            <img src="/assets/images/lnb/shoes-winter.jpg" alt="겨울신발" />
            <img src="/assets/images/lnb/shoes-peny.jpg" alt="페니로퍼" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lnbshoes;
