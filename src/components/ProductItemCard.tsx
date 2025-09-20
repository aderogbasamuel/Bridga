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
    <div className="flex flex-col gap-2 border-gray-300 hover:shadow-2xl p-3">
      <div className="w-full aspect-[49/50] overflow-hidden relative">
        {newItem && (
          <span className="absolute top-2 left-2 bg-[#3d0d0d] text-white text-xs font-bold px-2 py-1 rounded">
            NEW
          </span>
        )}

        <button
          className="absolute top-1 right-1 z-20"
          onClick={(e) => {
            e.preventDefault();
            if (!user) {
              alert("Please login to add to wishlist");
              return;
            }
            toggleWishlist(user.uid, product);
          }}
        >
          {isWished ? (
            <Icon icon="gridicons:heart" width="24" height="24" />
          ) : (
            <Icon
              icon="gridicons:heart-outline"
              width="24"
              height="24"
              color="#3d0d0d"
            />
          )}
        </button>

        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => navigate(`/product/${product.slug}`)}
        />
      </div>

      <div className="flex flex-col">
        <p className="text-[12px] text-gray-500 uppercase">
          {product.category}
        </p>
        <p className="text-[14px] text-gray-700 capitalize">
          {product.name}
        </p>
        <p className="text-gray-800 text-[16px] font-bold pt-2 pb-1">
          ₦{Number(product.price).toLocaleString()}
        </p>

        <div className="flex gap-2">
          <Link
            className="uppercase bg-[#3d0d0d] text-white p-2 w-fit font-bold text-[14px]"
            to={`/product/${product.slug}`}
          >
            <Icon icon="clarity:indent-line" width="24" height="24" />
          </Link>

          <button className="border-gray-300 border-1 p-2 w-fit">
            <Icon icon="circum:shuffle" width="24" height="24" />
          </button>

          {/* 🔍 Preview Modal Trigger */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="border-gray-300 border-1 p-2 w-fit">
                <Icon icon="mdi-light:magnify-plus" width="24" height="24" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl p-2 bg-transparent border-0 shadow-none">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-auto object-contain rounded-sm"
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default ProductItemCard;
