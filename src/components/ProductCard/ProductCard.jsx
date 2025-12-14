import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const { _id, title, price_min, price_max, image } = product;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Image Container with Overlay Effect */}
      <Link
        to={`/productDetails/${_id}`}
        className="relative h-72 overflow-hidden rounded-xl"
      >
        <img
          className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
          src={image}
          alt={title}
        />

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick View Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-xs font-semibold text-purple-600">
            Quick View
          </span>
        </div>
      </Link>

      {/* Content Section */}
      <div className="flex flex-col grow p-5">
        {/* Title */}
        <Link to={`/productDetails/${_id}`}>
          <h5 className="text-[#001931] text-2xl font-medium leading-7 line-clamp-2 min-h-14 mb-3 group-hover:text-purple-600 transition-colors">
            {title}
          </h5>
        </Link>

        {/* Price Section */}
        <div className="mt-auto">
          <div className="mb-4">
            <p className="text-gray-500 mb-1">Price Range</p>
            <span className="text-2xl font-bold bg-linear-to-br from-[#632ee3] to-[#9f62f2] text-transparent bg-clip-text leading-6">
              ${price_min} - {price_max}{" "}
            </span>
          </div>
        </div>

        {/* View Details Button */}
        <Link
          to={`/productDetails/${_id}`}
          className="btn w-full px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-[#632EE3] font-semibold rounded-lg shadow-lg border-2 border-[#632EE3] hover:bg-purple-50 transition-all"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
