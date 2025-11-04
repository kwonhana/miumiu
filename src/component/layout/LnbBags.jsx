import React from 'react';
import { Link } from 'react-router-dom';
const bags = [
  { key: '백팩', label: '백팩' },
  { key: '미니백', label: '미니백' },
  { key: '호보백', label: '호보백' },
  { key: '탑핸들', label: '탑핸들' },
  { key: '토트백', label: '토트백' },
  { key: '숄더백', label: '숄더백' },
];
const conicBags = [
  { key: '완더', label: '완더' },
  { key: '아르카디', label: '아르카디' },
  { key: '포켓', label: '포켓' },
  { key: '보', label: '보' },
  { key: '아방뛰르', label: '아방뛰르' },
  { key: '아이비', label: '아이비' },
];
const LnbBags = () => {
  return (
    <li>
      <span>가방</span>
      <div>
        <ul>
          <span>가방</span>
          {bags.map((bag) => (
            <li key={bag.key}>
              <Link to={`/${bag.key}`}>{bag.label}</Link>
            </li>
          ))}
        </ul>
        <div>
          <img src="" alt="" />
        </div>
      </div>

      <div>
        <span>아이코닉백</span>
        <ul>
          {conicBags.map((conicbag) => (
            <li key={conicbag.key}>
              <Link to={`/${conicbag.key}`}>{conicbag.label}</Link>
            </li>
          ))}
        </ul>
        <ul>
          <li>
            <img src="" alt="" />
          </li>
          <li>
            <img src="" alt="" />
          </li>
          <li>
            <img src="" alt="" />
          </li>
          <li>
            <img src="" alt="" />
          </li>
        </ul>
      </div>
    </li>
  );
};

export default LnbBags;
