import React from "react";

const ClubLayout = ({ sendItem }) => {
  return (
    <>
      <div className="club-box">
        <img src={sendItem.src} alt={sendItem.alt} />
      </div>
      <div className="text-box">
        <h3>{sendItem.menu}</h3>
        <p>{sendItem.title}</p>
      </div>
    </>
  );
};

export default ClubLayout;
