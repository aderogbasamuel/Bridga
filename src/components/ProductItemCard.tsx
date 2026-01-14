import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "../hooks/useWishlist";
import { Timestamp } from "firebase/firestore";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const isNewProduct = (createdAt: Timestamp) => {
  const now = new Date();
  const createdDate = createdAt.toDate();
  const diffInDays =
    (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
  return diffInDays <= 7; // <= 7 days old = "NEW"
};

function ProductItemCard({ product }: { product: any }) {
  const navigate = useNavigate();
  const { wishlist, user, toggleWishlist } = useWishlist();
  const isWished = wishlist.some((item) => item.id === product.id);
  const newItem = isNewProduct(product.createdAt);

  return (
    <div className="
      flex flex-col gap-2 
      bg-white 
      border border-[#E5E7EB] 
      rounded-lg 
      p-3 
      hover:shadow-xl 
      transition
      h-full
    ">
      <div className="w-full aspect-[49/50] overflow-hidden relative rounded-md">
        {newItem && (
          <span className="
            absolute top-2 left-2 
            bg-[#2B4162] 
            text-white 
            text-xs font-bold 
            px-2 py-1 
            rounded
          ">
            NEW
          </span>
        )}

        {/* Wishlist */}
        <button
          className="absolute top-2 right-2 z-20 bg-white/80 rounded-full p-1"
          onClick={(e) => {
            e.preventDefault();
            if (!user) {
              alert("Please login to add to wishlist");
              return;
            }
            toggleWishlist(user.uid, product);
          }}
        >
          <Icon
            icon={isWished ? "gridicons:heart" : "gridicons:heart-outline"}
            width="22"
            height="22"
            color={isWished ? "#F4A261" : "#6C7A93"}
          />
        </button>

        <img
          src={product.imageUrl}
          alt={product.name}
          className="
            w-full h-full 
            object-cover 
            cursor-pointer 
            hover:scale-105 
            transition
          "
          onClick={() => navigate(`/product/${product.slug}`)}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1">
        <p className="text-[11px] text-[#6C7A93] uppercase tracking-wide">
          {product.category}
        </p>

        <p className="text-[14px] text-[#1F2937] font-medium capitalize">
          {product.name}
        </p>

        <p className="text-[#2B4162] text-[15px] font-bold pt-2">
          ₦{Number(product.price).toLocaleString()}
        </p>
          {/* Actions */}
          <div className="h-full flex items-end w-full">
          <div className="flex gap-2 pt-2 w-full">

            <button className="
            
            p-2 px-4 w-full rounded-md 
            bg-[#2B4162] 
              hover:bg-[#223353] 
              text-white 
          "><div className="flex items-center justify-center gap-2">
              <Icon icon="solar:cart-plus-linear" width="22" height="22" />
              <p className="text-sm font-medium">Add to Cart</p>
              </div>
            </button>
            <Link
              className="
              uppercase 
              border border-[#E5E7EB] 
             hover:bg-[#F7F9FC]
              
              p-2 
              rounded-md 
              font-bold 
              text-[13px] 
              transition
            "
              to={`/product/${product.slug}`}
            >
              <Icon icon="clarity:indent-line" width="22" height="22" />
            </Link>

            <Dialog>
              <DialogTrigger asChild>
                <button className="
                border border-[#E5E7EB] 
                p-2 rounded-md 
                hover:bg-[#F7F9FC]
              ">
                  <Icon icon="mdi-light:magnify-plus" width="22" height="22" />
                </button>
              </DialogTrigger>

              <DialogContent className="max-w-3xl bg-white p-4 rounded-lg">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-auto object-contain rounded"
                />
              </DialogContent>
            </Dialog>
          </div></div>
        </div></div>
 
  );
}

export default ProductItemCard;
