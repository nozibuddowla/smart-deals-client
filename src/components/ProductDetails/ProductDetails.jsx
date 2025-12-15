import { Link, useLoaderData } from "react-router";
import Loader from "../Loader/Loader";
import MyContainer from "../MyContainer";
import { FaArrowLeft } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const product = useLoaderData();
  const [bids, setBids] = useState([]);
  // console.log(product);
  const bidModalRef = useRef(null);
  const { user } = useContext(AuthContext);
  // console.log(user);

  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("bids for this product", data);
        setBids(data);
      });
  }, []);

  const {
    _id,
    title,
    category,
    image,
    condition,
    usage,
    description,
    price_min,
    price_max,
    seller_image,
    seller_name,
    location,
    seller_contact,
    status,
  } = product;

  const date = new Date(product.created_at);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };

  const handleBidSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.buyer_name.value;
    const email = form.buyer_email.value;
    const image = form.buyer_image.value;
    const bid = parseInt(form.bid_price.value);

    // console.log(_id, name, email, bid);

    const newBid = {
      product: _id,
      buyer_name: name,
      buyer_email: email,
      buyer_image: image,
      bid_price: bid,
      status: "pending",
    };

    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          bidModalRef.current.close();

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your bid has been placed",
            showConfirmButton: false,
            timer: 1500,
          });

          // add the new bid to the state
          newBid._id = data.insertedId;
          
          const newBids = [...bids, newBid];
          newBids.sort((a, b) => b.bid_price - a.bid_price);

          setBids(newBids);
        }
      });
  };

  return (
    <div>
      <MyContainer>
        {/* product info */}
        <div className="px-6 my-10 md:my-20">
          {product ? (
            <div>
              {/* Header Section - Shows First on Mobile */}
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-0 md:hidden">
                <Link to="/all-products" className="flex gap-2 items-center">
                  <FaArrowLeft
                    color="#001931"
                    size={20}
                    className="md:w-6 md:h-6"
                  />
                  <span className="text-lg md:text-xl font-medium leading-6">
                    Back to Products
                  </span>
                </Link>
                <h1 className="text-[#001931] text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                  {title}
                </h1>
                <p className="w-fit flex justify-center items-center py-1.5 px-3 bg-linear-to-br from-purple-600/15 to-purple-400/15 rounded-full">
                  <span className="bg-linear-to-br from-purple-600 to-purple-400 bg-clip-text text-transparent text-xs font-medium leading-4">
                    {category}
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col space-y-7">
                  {/* Fixed Image Container */}
                  <figure className="w-full h-[500px] rounded-lg overflow-hidden border-2 border-gray-300">
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-full object-contain"
                    />
                  </figure>

                  <div className="bg-white rounded-lg shadow-2xl p-6 space-y-6">
                    <h3 className="text-[#001931] text-2xl font-semibold leading-7">
                      Product Description
                    </h3>
                    <div className="flex flex-col lg:flex-row justify-between items-center border-b-2 border-b-[#444444] p-3 ">
                      <div className="font-semibold leading-5">
                        <span className="bg-linear-to-br from-[#632ee3] to-[#9f62f2] text-transparent bg-clip-text">
                          Condition:{" "}
                        </span>
                        {condition}
                      </div>
                      <div className="font-semibold leading-5">
                        <span className="bg-linear-to-br from-[#632ee3] to-[#9f62f2] text-transparent bg-clip-text">
                          Usage Time:{" "}
                        </span>
                        {usage}
                      </div>
                    </div>
                    <p className="text-[#969a9d] font-medium leading-5 min-h-48 ">
                      {description}
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-4 hidden md:block">
                    <Link to="/all-products" className="flex gap-2">
                      <FaArrowLeft color="#001931" size={24} />
                      <span className="text-xl font-medium leading-6">
                        Back to Products
                      </span>{" "}
                    </Link>
                    <h1 className="text-[#001931] text-3xl lg:text-4xl xl:text-5xl font-bold leading-14">
                      {title}
                    </h1>
                    <p className="w-fit flex justify-center items-center py-1.5 px-2.5 bg-linear-to-br from-purple-600/15 to-purple-400/15 rounded-full">
                      <span className="bg-linear-to-br from-purple-600 to-purple-400 bg-clip-text text-transparent text-xs font-medium leading-4">
                        {category}
                      </span>
                    </p>
                  </div>
                  <div className="rounded-lg bg-white space-y-2 p-6 shadow-2xl">
                    <h3 className="text-[#4caf50] text-3xl font-bold leading-8 ">
                      Price: ${price_min} - {price_max}
                    </h3>
                    <p className="text-[#001931] leading-5">
                      Price starts from{" "}
                    </p>
                  </div>
                  <div className="rounded-lg bg-white p-6 shadow-2xl">
                    <h3 className="text-[#001931] text-2xl font-semibold leading-7 mb-6">
                      Product Details
                    </h3>
                    <p className="text-[#001931] leading-5 mb-3">
                       <span className="font-semibold">Product ID: </span> {_id}
                    </p>
                    <p className="text-[#001931] leading-5">
                       <span className="font-semibold">Posted: </span>{" "}
                      {formattedDate}
                    </p>
                  </div>
                  <div className="rounded-lg bg-white p-6 shadow-2xl">
                    <h3 className="text-[#001931] text-2xl font-semibold leading-7 mb-6">
                      Seller Information
                    </h3>
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={seller_image}
                        alt={seller_name}
                        className="w-14 h-14 rounded-full"
                      />
                      <div className="text-[#001931] space-y-2 ">
                        <h4 className="font-semibold leading-5">
                          {" "}
                          {seller_name}{" "}
                        </h4>
                        <p> {product.email} </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-[#001931] leading-5">
                         <span className="font-semibold">Location: </span>{" "}
                        {location}
                      </p>
                      <p className="text-[#001931] leading-5">
                         <span className="font-semibold">Contact:  </span>{" "}
                        {seller_contact}
                      </p>
                      <p className="flex items-center gap-2 text-[#001931] leading-5">
                         <span className="font-semibold">Status:  </span>{" "}
                        <span className="w-fit flex justify-center items-center bg-[#FFC107] text-[#001931] rounded-full py-1.5 px-2.5 text-xs">
                          {status}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={handleBidModalOpen}
                      className="btn w-full flex justify-center items-center text-white py-3 px-4 bg-[linear-gradient(125.07deg,#632ee3,#9f62f2_100%)] rounded-sm"
                    >
                      I want Buy This Product
                    </button>

                    <dialog
                      ref={bidModalRef}
                      className="modal modal-bottom sm:modal-middle"
                    >
                      <div className="modal-box">
                        <h3 className="font-bold text-lg text-center">
                          Give Seller Your Offered Price!
                        </h3>
                        <form onSubmit={handleBidSubmit}>
                          <fieldset className="fieldset space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex flex-col">
                                <label className="label">Buyer Name</label>
                                <input
                                  type="text"
                                  name="buyer_name"
                                  className="input w-full"
                                  placeholder="Your Name"
                                  defaultValue={user?.displayName || user?.name}
                                />
                              </div>
                              <div className="flex flex-col">
                                <label className="label">Buyer Email</label>
                                <input
                                  type="email"
                                  name="buyer_email"
                                  className="input w-full"
                                  readOnly
                                  defaultValue={user?.email}
                                  placeholder="Your Email"
                                />
                              </div>
                            </div>

                            <div className="flex flex-col">
                              <label className="label">Buyer Image URL</label>
                              <input
                                type="text"
                                className="input w-full"
                                name="buyer_image"
                                defaultValue={user?.photoURL || user?.photo}
                                placeholder="https://...your_img_url"
                              />
                            </div>

                            <div className="flex flex-col">
                              <label className="label">Place your Price</label>
                              <input
                                type="text"
                                className="input w-full"
                                name="bid_price"
                                placeholder="e.g. Artisan Roasters"
                              />
                            </div>

                            <div className="flex flex-col">
                              <label className="label">Contact Info</label>
                              <input
                                type="text"
                                className="input w-full"
                                name="buyer_contact"
                                placeholder="e.g. +1-555-1234"
                              />
                            </div>
                            <div className="flex justify-end items-center gap-4">
                              <button className="btn bg-linear-to-br from-[#632ee3] to-[#9f62f2] text-white py-3.5 px-4">
                                Submit Bid
                              </button>
                            </div>
                          </fieldset>
                        </form>
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn py-3.5 px-4">Cancel</button>
                        </form>
                      </div>
                    </dialog>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </div>

        {/* bids for this products */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold ">
          {" "}
          Bids For This Products:{" "}
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

export default ProductDetails;
