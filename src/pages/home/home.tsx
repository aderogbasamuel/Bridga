import { useFeaturedProducts } from "@/hooks/useFeaturedProducts";
import SwiperSlider from "./componnents/SwiperSLide";
import FeaturedProducts from "./componnents/FeaturedProducts";
import FeaturedCategories from "./componnents/FeaturedCategories";
function HomePage() {
  const { products, loading } = useFeaturedProducts();
  return (
    <div>
        <SwiperSlider />
      <FeaturedCategories />
      <FeaturedProducts products={products} loading={loading} />
    </div>
  );
}

export default HomePage;
