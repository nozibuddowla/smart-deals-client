import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import MyContainer from "../MyContainer";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyBids = () => {
  const { user } = use(AuthContext);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();

  // console.log("token: ", user.accessToken);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axiosSecure.get(`/bids?email=${user.email}`);
        setBids(res.data || []);
      } catch (err) {
        console.error("Error fetching bids:", err);
        setError(err.message || "Failed to load bids");
        setBids([]);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchBids();
    }
  }, [user, axiosSecure]);

  // useEffect(() => {
  //   const fetchBids = async () => {
  //     if (user?.email) {
  //       try {
  //         setLoading(true);
  //         const token = await user.getIdToken();

  //         if (!token) {
  //           console.error("No token found");
  //           setError("Authentication required. Please login again.");
  //           setLoading(false);
  //           return;
  //         }

  //         const res = await fetch(
  //           `${import.meta.env.VITE_API_URL}/bids?email=${user.email}`,
  //           {
  //             headers: {
  //               authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );

  //         if (!res.ok) {
  //           throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  //         }

  //         const data = await res.json();
  //         // console.log("Bids data:", data);

  //         if (Array.isArray(data)) {
  //           setBids(data);
  //           setError(null);
  //         } else {
  //           console.error("Expected array but got:", data);
  //           setError(data.message || "Failed to load bids");
  //           setBids([]);
  //         }
  //       } catch (err) {
  //         console.error("Error fetching bids:", err);
  //         setError(err.message);
  //         setBids([]);
  //       } finally {
  //         setLoading(false); // ✅ Always set loading to false
  //       }
  //     }
  //   };

  //   fetchBids();
  // }, [user]);

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
          headers: {
            authorization: `Bearer ${token}`,
          },
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

  if (loading) {
    return (
      <div className="my-20">
        <MyContainer>
          <Loader />
        </MyContainer>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-20">
        <MyContainer>
          <div className="flex flex-col justify-center items-center min-h-[400px]">
            <div className="text-2xl font-semibold text-red-600 mb-4">
              Error Loading Bids
            </div>
            <p className="text-gray-600">{error}</p>
          </div>
        </MyContainer>
      </div>
    );
  }

  return (
    <div className="my-20">
      <MyContainer>
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-center">
          My Bids:{" "}
          <span className="bg-linear-to-br from-[#632ee3] to-[#9f62f2] text-transparent bg-clip-text">
            {bids.length}
          </span>
        </h2>
        {bids.length === 0 ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                No Bids Yet
              </h3>
              <p className="text-gray-500">
                You haven't placed any bids on products.
              </p>
            </div>
          </div>
        ) : (
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
                    key={bid._id}
                    className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="w-14 p-4 font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-2 sm:px-3 md:px-4 lg:px-6 py-3 md:py-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 shrink-0 overflow-hidden rounded-md bg-gray-50">
                          <img
                            src={bid?.product_details?.image}
                            alt={bid?.product_details?.title}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-[#001931] leading-5 line-clamp-1 mb-1">
                            {bid?.product_details?.title}
                          </div>
                          <div className="text-xs sm:text-sm leading-4 text-[#001931] opacity-80 font-semibold">
                            ${bid?.product_details?.price_min}
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
        )}
      </MyContainer>
    </div>
  );
};

export default MyBids;
