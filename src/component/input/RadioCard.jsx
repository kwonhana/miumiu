import React from 'react';

const RadioCard = ({ id, name, value, checked, onChange, title, script, number }) => {
  return (
    <>
      <li className="radio-card">
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
      </li>
    </>
  );
};

export default RadioCard;
