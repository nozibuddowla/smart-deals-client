import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import MyContainer from "../MyContainer";

const MyProducts = () => {
  const { user } = use(AuthContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (user?.email) {
      fetch(`${import.meta.env.VITE_API_URL}/products?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          //   console.log(data);
          setProducts(data);
        });
    }
  }, [user?.email]);

  return (
    <div className="my-20">
      <MyContainer>
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-center">
          My Products:{" "}
          <span className="bg-linear-to-br from-[#632ee3] to-[#9f62f2] text-transparent bg-clip-text">
            {products.length}
          </span>
        </h2>
        <div className="relative overflow-x-auto bg-white shadow-sm rounded-lg border border-gray-200 my-10">
          <table className="w-full text-sm text-left text-gray-700">
            {/* head */}
            <thead className="text-sm text-gray-700 bg-gray-100 border-b border-gray-300">
              <tr>
                <th scope="col" className="w-14 p-2">
                  SL No
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Image
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Product Name
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Category
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Price
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {products.map((product, index) => (
                <tr
                  key={index}
                  className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="w-14 p-4 font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-10 w-14 overflow-hidden">
                      <img
                        src={product?.image}
                        alt={product?.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#001931] leading-5 line-clamp-1">
                      {product?.title.slice(0, 20)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p> {product?.category} </p>
                  </td>
                  <td className="px-4 py-4 font-semibold text-gray-900">
                    ${product?.price_min}
                  </td>
                  <td className="px-4 py-4">
                    {product?.status === "pending" ? (
                      <div className="bg-[#FFC107] text-[#001931] py-1.5 px-2.5 flex justify-center items-center rounded-full">
                        {product?.status}
                      </div>
                    ) : (
                      <div className="bg-[#4CAF50] text-[#001931] py-1.5 px-2.5 flex justify-center items-center rounded-full">
                        {product?.status}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="btn btn-outline border border-[#632EE3] text-[#632EE3] px-2 py-1.5 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-outline border border-[#FF3D00] text-[#FF3D00] px-2 py-1.5 font-medium"
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-outline border border-[#4CAF50] text-[#4CAF50] px-2 py-1.5 font-medium"
                      >
                        Make Sold
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MyContainer>
    </div>
  );
};

export default MyProducts;
