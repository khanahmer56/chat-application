import React from "react";

const layout = () => (Wrappedomponent) => {
  return (props) => (
    <div>
      <h1>layout</h1>
      <Wrappedomponent {...props} />
      <div>footer</div>
    </div>
  );
};

export default layout;
