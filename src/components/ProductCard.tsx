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
    <div className="flex flex-col gap-2 border-gray-300 hover:shadow-2xl p-3">
      <div className="w-full aspect-[49/50] overflow-hidden">
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>
          <div className="flex flex-col">
        <p className="text-[12px] text-gray-500 uppercase">{category}</p>
        <p className="text-[14px] text-gray-700 ">{title}</p>
        <p className="text-gray-800 text-[16px] font-bold pt-2 pb-1">₦{price}</p>
        <button className="uppercase bg-[#3d0d0d] text-white p-3 w-fit font-bold text-[14px]">
          Select options
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
