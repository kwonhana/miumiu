import React from 'react';

import { Link } from 'react-router-dom';

const NewItemMain = ({ item, no }) => {
  return (
    <div className="new-container">
      <p>
        <img src={`/assets/images/detail/${no}.jpg`} alt={item} />
      </p>
      <div className="gradient-wrap">
        <span>WHAT'S NEW</span>
        <h2>{item}</h2>
        <Link className="link">구매하기</Link>
      </div>
    </div>
  );
};

export default NewItemMain;
