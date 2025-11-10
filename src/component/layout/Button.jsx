import React from 'react';

const Button = ({ title, color }) => {
  return <button className={`miu-btn ${color}`}>${title}</button>;
};

export default Button;
