import React from "react";
import MyContainer from "../MyContainer";
import { ScaleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div>
      <MyContainer>
        <div className="min-h-screen flex items-center justify-center">
          <ScaleLoader
            color="#e74c3c"
            height={70}
            margin={4}
            radius={4}
            width={8}
          />
        </div>
      </MyContainer>
    </div>
  );
};

export default Loader;
