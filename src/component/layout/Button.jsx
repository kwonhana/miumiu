import React from 'react';
import './scss/Button.scss';

const Button = ({ title, color }) => {
  return <button className={`miu-btn ${color}`}>{title}</button>;
};

export default Button;
