import React from 'react';
import './scss/Button.scss';

const Button = ({ title }) => {
  return <button className={`miu-btn`}>{title}</button>;
};

export default Button;
