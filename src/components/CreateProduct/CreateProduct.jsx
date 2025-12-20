import React, { useContext, useState } from "react";
import MyContainer from "../MyContainer";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa6";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const CreateProduct = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([])
  const axiosInstance = useAxios();

  const handleCreateProductSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const productTitle = form.title.value;
    const productCategory = form.category.value;
    const productMinPrice = parseFloat(form.price_min.value);
    const productMaxPrice = form.price_max.value
      ? parseFloat(form.price_max.value)
      : parseFloat(form.price_min.value);
    const productCondition = form.condition.value;
    const productUsage = form.usage.value;
    const productImage = form.image.value;
    // const sellerName = form.seller_name.value;
    // const sellerEmail = form.email.value;
    const sellerContact = form.seller_contact.value;
    const sellerImage = form.seller_image.value;
    const sellerLocation = form.location.value;
    const productDescription = form.description.value;

    const newProduct = {
      title: productTitle,
      category: productCategory,
      price_min: productMinPrice,
      price_max: productMaxPrice,
      condition: productCondition,
      // email: sellerEmail,
      email: user.email,
      image: productImage,
      location: sellerLocation,
      seller_image: sellerImage,
      // seller_name: sellerName,
      seller_name: user.displayName,
      usage: productUsage,
      description: productDescription,
      seller_contact: sellerContact,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    axiosInstance.post("/products", newProduct)
      .then(res => {
      console.log(res.data);
      
    })

    // axios
    //   .post(`${import.meta.env.VITE_API_URL}/products`, newProduct)
    //   .then((res) => {
    //     // console.log(res.data);
    //     if (res.data.insertedId) {
    //       Swal.fire({
    //         position: "top-end",
    //         icon: "success",
    //         title: "Your Product has been created successfully!",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });

    //       form.reset();
    //       const newProductsArray = [...products, newProduct];
    //       setProducts(newProductsArray);
    //     }
    //   });

    // fetch(`${import.meta.env.VITE_API_URL}/products`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newProduct),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.insertedId) {
    //       Swal.fire({
    //         position: "top-end",
    //         icon: "success",
    //         title: "Product created successfully!",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //       form.reset();
    //       const newProductsArray = [...products, newProduct];
    //       setProducts(newProductsArray);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: "Something went wrong!",
    //     });
    //   });
  };

  return (
    <div className="my-20">
      <MyContainer>
        <div className="flex flex-col justify-center items-center space-y-3 md:space-y-4 mb-6 lg:mb-10">
          <Link to="/all-products" className="flex gap-2 items-center">
            <FaArrowLeft color="#001931" size={20} className="md:w-6 md:h-6" />
            <span className="text-lg md:text-xl font-medium leading-6">
              Back to Products
            </span>
          </Link>

          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-center">
            AllCreate{" "}
            <span className="bg-linear-to-br from-[#632ee3] to-[#9f62f2] text-transparent bg-clip-text">
              A Product
            </span>
          </h2>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="card bg-base-100 max-w-3xl shadow-sm p-10">
            <form onSubmit={handleCreateProductSubmit}>
              <fieldset className="fieldset space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-[#001931] text-sm font-medium leading-5">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="input w-full"
                      placeholder="e.g. Yamaha Fz Guitar for Sale"
                      required
                    />
                  </div>

                  <div className="flex flex-col text-[#627382] ">
                    <label className="label">Category</label>
                    <select
                      defaultValue=""
                      name="category"
                      className="select"
                      required
                    >
                      <option value="" disabled={true}>
                        Select a Category
                      </option>
                      <option value="Electronics">Electronics</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Sports">Sports</option>
                      <option value="Appliances">Appliances</option>
                      <option value="Gaming">Gaming</option>
                      <option value="Kids">Kids</option>
                      <option value="Vehicle">Vehicle</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="label">
                      Min Price You want to Sale ($)
                    </label>
                    <input
                      type="number"
                      name="price_min"
                      className="input w-full"
                      placeholder="e.g. 18.5"
                      step="0.01"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="label">
                      Max Price You want to Sale ($)
                    </label>
                    <input
                      type="number"
                      name="price_max"
                      className="input w-full"
                      placeholder="Optional (default = Min Price)"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-2.5">
                    <label className="label">Product Condition</label>
                    <div className="flex justify-between items-center ">
                      <div className=" flex items-center gap-3">
                        <input
                          type="radio"
                          name="condition"
                          value="Brand New"
                          className="radio radio-primary"
                          defaultChecked
                          required
                        />
                        <span>Brand New</span>
                      </div>

                      <div className=" flex items-center gap-3">
                        <input
                          type="radio"
                          name="condition"
                          value="Used"
                          className="radio radio-primary"
                          required
                        />{" "}
                        <span>Used</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="label">Product Usage time</label>
                    <input
                      type="text"
                      name="usage"
                      className="input w-full"
                      placeholder="e.g. 1 year 3 month"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="label">Your Product Image URL</label>
                  <input
                    type="url"
                    className="input w-full"
                    name="image"
                    placeholder="https://..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="label">Seller Name</label>
                    <input
                      type="text"
                      name="seller_name"
                      className="input w-full"
                      placeholder="e.g. Artisan Roasters"
                      defaultValue={user?.displayName || user?.name}
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="label">Seller Email</label>
                    <input
                      type="email"
                      name="email"
                      className="input w-full"
                      readOnly
                      defaultValue={user?.email}
                      placeholder="leli31955@nrlord.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="label">Seller Contact</label>
                    <input
                      type="text"
                      name="seller_contact"
                      className="input w-full"
                      placeholder="e.g. +1-555-1234"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="label">Seller Image URL</label>
                    <input
                      type="url"
                      name="seller_image"
                      className="input w-full"
                      defaultValue={user?.photoURL || user?.photo}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="label">Location</label>
                  <input
                    type="text"
                    className="input w-full"
                    name="location"
                    placeholder="City, Country"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="label">
                    Simple Description about your Product
                  </label>
                  <textarea
                    type="text"
                    className="textarea w-full h-28"
                    name="description"
                    placeholder="e.g. I bought this product 3 month ago. did not used more than 1/2 time. actually learning guitar is so tough..... "
                    required
                  />
                </div>

                <div className="flex justify-end items-center gap-4">
                  <button
                    type="submit"
                    className="btn w-full bg-linear-to-br from-[#632ee3] to-[#9f62f2] text-white py-3 px-4"
                  >
                    Create a Product
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default CreateProduct;
