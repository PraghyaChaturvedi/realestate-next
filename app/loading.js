import React from "react";

const loading = () => {
  return (
    <div className="h-screen flex mt-20 justify-center">
      <div
        className="animate-spin rounded-full border-t-2 border-b-2 border-red-600 border-solid"
        style={{
          height: "4rem",
          width: "4rem",
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
        }}
      />
    </div>
  );
};

export default loading;

