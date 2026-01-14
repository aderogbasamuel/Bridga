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
      to={`/shop/${slug}`}
      className="
        relative 
        h-full
        bg-white 
        border border-[#E5E7EB] 
        rounded-lg 
        overflow-hidden 
        hover:shadow-xl 
        transition
      "
    >
      {/* Image container (LOCKED HEIGHT) */}
      <div className="h-[220px] w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="
            w-full h-full 
            object-cover 
            hover:scale-105 
            transition
          "
        />
      </div>

      {/* Content */}
      <div className="p-4 bg-white flex flex-col items-center text-center">
        <p
          className="
            text-[#2B4162] 
            text-[14px] 
            font-bold 
            uppercase 
            line-clamp-1
            min-h-[20px]
          "
        >
          {title}
        </p>

        <p className="text-[#6C7A93] text-[11px] uppercase">
          {products} Products
        </p>

        {/* CTA */}
        <span
          className="
            mt-3 
            inline-block 
            bg-[#2B4162] 
            hover:bg-[#223353] 
            text-white 
            text-[12px] 
            font-bold 
            px-4 py-2 
            rounded-md 
            transition
          "
        >
          Explore
        </span>
      </div>
    </Link>
  );
}

export default CategoryCard;
