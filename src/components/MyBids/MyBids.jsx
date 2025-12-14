import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { div } from "framer-motion/client";
import MyContainer from "../MyContainer";

const MyBids = () => {
  const { user } = use(AuthContext);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bids?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setBids(data);
        });
    }
  }, [user?.email]);

  return (
    <div>
      <MyContainer>
        <h2>My Bids: {bids.length} </h2>
        <div className="relative overflow-x-auto bg-white shadow-sm rounded-lg border border-gray-200 my-10">
          <table className="w-full text-sm text-left text-gray-700">
            {/* head */}
            <thead className="text-sm text-gray-700 bg-gray-100 border-b border-gray-300">
              <tr>
                <th scope="col" className="w-14 p-2">
                  SL No
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Seller
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Bid Price
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
                  <th className="w-14 p-4 font-medium text-gray-900">
                    {index + 1}
                  </th>
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
                    {bid.bid_price}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="btn btn-outline border border-[#4CAF50] text-[#4caf50] px-2 py-1.5 btn-xs">
                        Accept Offer
                      </button>

                      <button className="btn btn-outline border border-[#FF3D00] text-[#FF3D00] px-2 py-1.5 btn-xs">
                        Reject Offer
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
