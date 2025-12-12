import { useLoaderData } from 'react-router';

const ProductDetails = () => {
    const product = useLoaderData();
    // console.log(product);
    
    return (
      <div className="p-6">
        {product ? (
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <img
              src={product.image}
              alt={product.title}
              className="w-64 h-64 object-cover my-4"
            />
            <p className="text-xl">
              Price: ${product.price_min} - ${product.price_max}
            </p>
            <p>Category: {product.category}</p>
            <p>Condition: {product.condition}</p>
            <p>Location: {product.location}</p>
            <p>Description: {product.description}</p>
            <p>Seller: {product.seller_name}</p>
            <p>Contact: {product.seller_contact}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
};

export default ProductDetails;