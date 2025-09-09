import { Icon } from "@iconify/react";
function ProductCard({
  title,
  image,
  price,
  category,
}: {
  title: string;
  image: string;
  price: number;
  category: string;
}) {
  return (
    <div className="flex flex-col gap-2 border-gray-300 hover:shadow-2xl p-2">
      <div className="w-full aspect-[49/50] overflow-hidden">
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>
          <div className="flex flex-col">
        <p className="text-[12px] text-gray-500 uppercase">{category}</p>
        <p className="text-[14px] text-gray-700 ">{title}</p>
        <p className="text-gray-800 text-[16px] font-bold pt-2 pb-1">₦{price}</p>
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
