import CategoryCard from "@/components/CategoryCard";
import carparts from "../../../assets/shunya-koide-1emWndlDHs0-unsplash.jpg";
import gadgets from "../../../assets/gio-rosado-9NrhZlZLsl0-unsplash.jpg";
import electronics from "../../../assets/freestocks-_3Q3tsJ01nc-unsplash.jpg";
import tyresrims from "../../../assets/jakub-zerdzicki-fkJFL1P3BGQ-unsplash.jpg";

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
            title: "Books &  Materials",
            slug: "car-parts",
            products: 14,
          },
          {
            image: gadgets,
            title: "Electronics & Gadgets",
            slug: "Gadgets",
            products: 18,
          },
          {
            image: tyresrims,
            title: "Fashion & Accessories",
            products: 22,
            slug: "tyres-rims",
          },
          {
            image: electronics,
            title: "Living Essentials",
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
