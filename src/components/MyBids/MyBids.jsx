import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import MyContainer from "../MyContainer";
import Swal from "sweetalert2";

const MyBids = () => {
  const { user } = use(AuthContext);
  const [bids, setBids] = useState([]);

  // console.log("token", user.accessToken);

  useEffect(() => {
    if (user?.email) {
      fetch(`${import.meta.env.VITE_API_URL}/bids?email=${user.email}`, {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          //   console.log(data);
          setBids(data);
        });
    }
  }, [user?.email]);

  const handleDeleteBid = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/bids/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your bid has been deleted.",
                icon: "success",
              });

              const remainingBids = bids.filter((bid) => bid._id !== _id);
              setBids(remainingBids);
            }
          });
      }
    });
  };

  return (
    <div className="my-20">
      <MyContainer>
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-center">
          My Bids:{" "}
          <span className="bg-linear-to-br from-[#632ee3] to-[#9f62f2] text-transparent bg-clip-text">
            {bids.length}
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
                  Product
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Seller
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Bid Price
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
              {bids.map((bid, index) => (
                <tr
                  key={index}
                  className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="w-14 p-4 font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-16 overflow-hidden">
                        <img
                          src={bid?.product_details?.image}
                          alt={bid?.product_details?.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-[#001931] leading-5 line-clamp-1">
                          {bid?.product_details?.title.slice(0, 25)}
                        </div>
                        <div className="text-sm leading-4 text-[#001931] opacity-80">
                          ${bid?.product_details?.price_min}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img
                          src={bid?.buyer_image}
                          alt={bid?.buyer_name}
                          className=" w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-[#001931] leading-5">
                          {bid.buyer_name}
                        </div>
                        <div className="text-sm leading-4 text-[#001931] opacity-80">
                          {bid.buyer_email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-semibold text-gray-900">
                    ${bid.bid_price}
                  </td>
                  <td className="px-4 py-4">
                    {bid.status === "pending" ? (
                      <div className="bg-[#FFC107] text-[#001931] py-1.5 px-2.5 flex justify-center items-center rounded-full">
                        {bid.status}
                      </div>
                    ) : (
                      <div className="bg-[#4CAF50] text-[#001931] py-1.5 px-2.5 flex justify-center items-center rounded-full">
                        {bid.status}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteBid(bid._id)}
                        className="btn btn-outline border border-[#FF3D00] text-[#FF3D00] px-2 py-1.5 font-medium"
                      >
                        Remove Bid
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

export default MyBids;
