import React from 'react';

const Modal = ({ title }) => {
  return (
    <div className="M odal">
      <div className="Modal-wrap">
        <div className="top">
          <span>{title}</span>
          <button>X</button>
        </div>

        <div className="info"></div>
      </div>
    </div>
  );
};

export default Modal;
