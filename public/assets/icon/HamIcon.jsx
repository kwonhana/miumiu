import React from 'react';
import { Link } from 'react-router-dom';

const HamIcon = ({ color = '#D9D9D9' }) => {
  return (
    <div className="ham-icon">
      <Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none">
          <rect x="2" y="5" width="20" height="2" rx="1" fill={color} />
          <rect x="2" y="11" width="20" height="2" rx="1" fill={color} />
          <rect x="2" y="17" width="20" height="2" rx="1" fill={color} />
        </svg>
      </Link>
    </div>
  );
};

export default HamIcon;
