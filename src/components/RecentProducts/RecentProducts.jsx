import React, { use, useContext } from "react";
import MyContainer from "../MyContainer";
import ProductCard from "../ProductCard/ProductCard";
import { Link } from "react-router";

const RecentProducts = ({ recentProductsPromise }) => {
  const recentProducts = use(recentProductsPromise);
    // console.log(recentProducts);

  return (
    <div className="my-20">
      <MyContainer>
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-center ">
          Recent{" "}
          <span className="bg-linear-to-br from-[#632ee3] to-[#9f62f2] text-transparent bg-clip-text">
            Products
          </span>{" "}
        </h2>

        {recentProducts.length === 0 ? (
          <div className="flex justify-center items-center ">
            <p className="text-red-500 font-bold bg-white rounded-2xl p-5">
              No products available
            </p>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10 mx-5">
              {recentProducts.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })}
            </div>
            <div className="flex justify-center items-center">
              <Link
                to="/all-products"
                className="btn bg-linear-to-br  from-[#632EE3] to-[#9F62F2] text-white py-3 px-4 rounded-lg"
              >
                Show All
              </Link>
            </div>
          </div>
        )}
      </MyContainer>
    </div>
  );
};

export default RecentProducts;
