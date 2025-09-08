import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useWishlist } from "../hooks/useWishlist";
function ProductItemCard({
  image,
  category,
  price,
  title,
  slug,
  id,
  product,
}: {
  image: string;
  category: string;
  price: number;
    title: string;
    slug: string;
    id: string;
    product: any;
  }) {

  const { wishlist, user, toggleWishlist } = useWishlist();

  const isWished = wishlist.some((item) => item.id === product.id);

  return (
    <div className="flex flex-col gap-2 border-gray-300 hover:shadow-2xl p-3">
          <div className="w-full aspect-[49/50] overflow-hidden relative">
              <button className="absolute top-1 right-1 z-20" onClick={(e) => {
          e.preventDefault();
          if (!user) {
            alert("Please login to add to wishlist");
            return;
          }
          toggleWishlist(user.uid, product);
        }}
        >
          {isWished ? (
            <Icon icon="gridicons:heart-outline" width="24" height="24" />
          ):
          (
          <Icon icon="gridicons:heart" width="24" height="24" color="#3d0d0d" />
          )}
              </button>
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col">
        <p className="text-[12px] text-gray-500 uppercase">{category}</p>
        <p className="text-[14px] text-gray-700 ">{title}</p>
        <p className="text-gray-800 text-[16px] font-bold pt-2 pb-1">
          ₦{price}
        </p>
        <div className="flex gap-2">
          <Link className="uppercase bg-[#3d0d0d] text-white p-2 w-fit font-bold text-[14px]"     to={`/product/${slug}`}>
            <Icon icon="clarity:indent-line" width="24" height="24" />
          </Link>
          <button className="border-gray-300 border-1 p-2 w-fit">
            <Icon icon="circum:shuffle" width="24" height="24" />
                  </button>
                  <button className="border-gray-300 border-1 p-2 w-fit">
                  <Icon icon="mdi-light:magnify-plus" width="24" height="24" />
                  </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItemCard;
