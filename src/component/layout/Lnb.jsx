import React from 'react';
import { Link } from 'react-router-dom';
import LnbBags from './LnbBags';

const Lnb = () => {
  return (
    <nav className="lnb-wrap">
      <ul>
        <LnbBags />
      </ul>
    </nav>
  );
};

export default Lnb;
