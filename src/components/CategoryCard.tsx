import { Link } from "react-router-dom";
function CategoryCard({
  image,
  title,
  products,
  slug,
}: {
  image: string;
  title: string;
  products: number;
  slug: string;
}) {
  return (
    <Link
      className="relative bg-red-900 aspect-[49/50] overflow-hidden"
      to={`/shop/${slug}`}
    >
      <img
        src={image}
        alt=""
        className="w-full h-full object-cover hover:scale-110 transition-normal duration-200"
      />
      <div className="absolute z-10 bottom-0 left-0 p-4 w-full">
        <button className="bg-[#f8cdcd] p-4 w-full">
          <p className="text-black text-[14px] font-bold uppercase">{title}</p>
          <p className="uppercase text-[11px]">{products} Products</p>
        </button>
      </div>
    </Link>
  );
}

export default CategoryCard;
