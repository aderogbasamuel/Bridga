import { Icon } from "@iconify/react";
import { Timestamp } from "firebase/firestore"
const isNewProduct = (createdAt: Timestamp) => {
  const now = new Date()
  const createdDate = createdAt.toDate()
  const diffInDays = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
  return diffInDays <= 7 // <= 7 days old = "NEW"
}


function ProductCard({ product }: { product: any }) {
  const newItem = isNewProduct(product.createdAt)
  return (
    <div className="flex flex-col gap-2 border-gray-300 hover:shadow-2xl p-2 relative">

      {newItem && (
        <span className="absolute top-2 left-2 bg-[#fa9f42] text-white text-xs font-bold px-2 py-1 rounded">
          NEW
        </span>

      )}

      <div className="w-full aspect-[49/50] overflow-hidden ">
        <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col">
        <p className="text-[12px] text-gray-500 uppercase">{product.category}</p>
        <p className="text-[14px] text-gray-700 capitalize font-medium">{product.name}</p>
        <p className="text-[12px] font-bold pt-2 pb-1 text-[#fa9f42]">₦{product.price}</p>
        <div className="flex gap-2">
          <div className="uppercase bg-[#3d0d0d] text-white p-2 w-fit font-bold text-[14px]">
            <Icon icon="clarity:indent-line" width="24" height="24" />
          </div>
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

export default ProductCard;
