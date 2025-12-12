import React, { use, useContext } from "react";
import MyContainer from "../MyContainer";
import ProductCard from "../ProductCard/ProductCard";

const RecentProducts = ({ recentProductsPromise }) => {
  const recentProducts = use(recentProductsPromise);
//   console.log(recentProducts);

  return (
    <div className="my-20">
      <MyContainer>
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-center ">
          Recent{" "}
          <span className="bg-linear-to-br from-[#632ee3] to-[#9f62f2] text-transparent bg-clip-text">
            Products
          </span>{" "}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10 mx-5">
          {recentProducts.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </div>
      </MyContainer>
    </div>
  );
};

export default RecentProducts;
