import React from 'react';

const RadioCard = ({ id, name, value, checked, onChange, title, script, number }) => {
  return (
    <>
      <li className="radio-card">
        <label className="cardLabel" htmlFor={id}>
          <input
            type="radio"
            id={id}
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
          />
          <div className="text-box">
            <label>{title}</label>
            <p className="info">{script}</p>
            <p className="info">{number}</p>
          </div>
        </label>
      </li>
    </>
  );
};

export default RadioCard;
