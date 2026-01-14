import image1 from "../../../assets/c-joyful-heFTscwGDCA-unsplash.webp";
import image2 from "../../../assets/chad-kirchoff-xe-e69j6-Ds-unsplash.webp";
import image3 from "../../../assets/sam-loyd-qy27JnsH9sU-unsplash.webp";
import ProductItemCard from "../../../components/ProductItemCard";
function ProductsList({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {/* [
        {
          image: image1,
          title: "Car Parts",
          price: 14000,
          category: "Car Parts",
        },
        {
          image: image2,
          title: "Accessories",
          price: 18000,
          category: "Accessories",
        },
        {
          image: image3,
          title: "Tyres & Rims",
          price: 22000,
          category: "Tyres & Rims",
        },
        {
          image: image1,
          title: "Electronics",
          price: 10000,
          category: "Electronics",
        },
        ] */}
      {products.map((product) => (
        <div key={product.id} className="">
          <ProductItemCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductsList;
