import React from "react";
const BanList = (list) => {
  console.log(list);
  console.log(list.length);
  list.map((item) => {
    console.log(item);
  });
  return (
    <>
      <div className="rightList">
        <h1>Ban List</h1>
      </div>
    </>
  );
};

export default BanList;
