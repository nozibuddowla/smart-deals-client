import React from "react";
import MyContainer from "../MyContainer";
import { ScaleLoader } from "react-spinners";

const HydrationFallback = () => {
  return (
    <div className="p-12">
      <MyContainer>
        <div className="min-h-screen flex flex-col items-center justify-center space-y-2">
          <ScaleLoader
            color="#e74c3c"
            height={70}
            margin={4}
            radius={4}
            width={8}
          />
          <div className=" text-center text-xl">
            <h1>Preparing the App...</h1>
            <p>Please wait a moment.</p>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default HydrationFallback;
