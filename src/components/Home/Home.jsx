import React, { Suspense } from "react";
import Hero from "../Hero/Hero";
import RecentProducts from "../RecentProducts/RecentProducts";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";

const recentProductsPromise = fetch(
  `${import.meta.env.VITE_API_URL}/recent-products`
).then((res) => res.json());

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
