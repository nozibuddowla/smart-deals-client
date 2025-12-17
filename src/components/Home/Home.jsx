import React, { Suspense } from "react";
import Hero from "../Hero/Hero";
import RecentProducts from "../RecentProducts/RecentProducts";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";

const recentProductsPromise = fetch(
  `${import.meta.env.VITE_API_URL}/recent-products`
)
  .then((res) => {
    console.log("API Response status:", res.status);
    console.log("API URL:", import.meta.env.VITE_API_URL);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    // Check if response is JSON
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Response is not JSON");
    }

    return res.json();
  })
  .catch((error) => {
    console.error("Failed to fetch recent products:", error);
    throw error;
  });

const Home = () => {
  return (
    <div>
      <Hero />
      <Suspense fallback={<SkeletonLoader />}>
        <RecentProducts recentProductsPromise={recentProductsPromise} />
      </Suspense>
    </div>
  );
};

export default Home;
