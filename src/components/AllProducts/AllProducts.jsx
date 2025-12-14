import React from "react";
import { useLoaderData } from "react-router";
import MyContainer from "../MyContainer";
import ProductCard from "../ProductCard/ProductCard";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";

const AllProducts = () => {
  const allProducts = useLoaderData();

  return (
    <div className="my-20">
      <MyContainer>
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-center">
          All{" "}
          <span className="bg-linear-to-br from-[#632ee3] to-[#9f62f2] text-transparent bg-clip-text">
            Products
          </span>
        </h2>

        {allProducts.length === 0 ? <SkeletonLoader /> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10 mx-5">
          {allProducts.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </div>}
      </MyContainer>
    </div>
  );
};

export default AllProducts;
