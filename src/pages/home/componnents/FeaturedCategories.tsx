import CategoryCard from "@/components/CategoryCard";
import carparts from "../../../assets/c-joyful-heFTscwGDCA-unsplash.webp";
import electronics from "../../../assets/sam-loyd-qy27JnsH9sU-unsplash.webp";
import tyresrims from "../../../assets/christopher-john-eLbCls7vc6A-unsplash.webp";
import accessories from "../../../assets/alvis-taurens-BQOLjcESMl0-unsplash.webp";

function FeaturedCategories() {
  return (
    <section className=" px-4 sm:px-4 md:px-18  py-10">
      <h3 className="heading text-[16px] uppercase font-bold mb-12">
        Featured Categories
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[
          {
            image: carparts,
            title: "Car Parts",
            slug: "car-parts",
            products: 14,
          },
          {
            image: accessories,
            title: "Accessories",
            slug: "accessories",
            products: 18,
          },
          {
            image: tyresrims,
            title: "Tyres & Rims",
            products: 22,
            slug: "tyres-rims",
          },
          {
            image: electronics,
            title: "Electronics",
            slug: "electronics",

            products: 10,
          },
        ].map((category, index) => (
          <CategoryCard
            key={index}
            image={category.image}
            title={category.title}
            products={category.products}
            slug={category.slug}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedCategories;
