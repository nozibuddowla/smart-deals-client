import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const { _id, title, price_min, price_max, image } = product;
  return (
    <div className="p-4 flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <Link
        to={`/productDetails/${_id}`}
        className="mx-3 mt-3 flex h-[278px] overflow-hidden rounded-xl"
      >
        <img className="object-cover" src={image} alt={title} />
      </Link>
      <div className="mt-4">
        <Link to={`/productDetails/${_id}`}>
          <h5 className="text-[#001931] text-2xl font-medium leading-7 line-clamp-2 min-h-14">
            {title}
          </h5>
        </Link>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-xl font-semibold bg-linear-to-br from-[#632ee3] to-[#9f62f2] text-transparent bg-clip-text leading-6">
              ${price_min} - {price_max}{" "}
            </span>
          </p>
        </div>

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
