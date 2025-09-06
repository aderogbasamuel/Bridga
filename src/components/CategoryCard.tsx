import image1 from '../assets/c-joyful-heFTscwGDCA-unsplash.jpg'
import image2 from '../assets/chad-kirchoff-xe-e69j6-Ds-unsplash.jpg'
import image3 from '../assets/sam-loyd-qy27JnsH9sU-unsplash.jpg'
function CategoryCard({ image, title, products }: { image: string; title: string; products: number }) {
  return (
    <div className="relative bg-red-900 aspect-[49/50] overflow-hidden">
      <img src={image} alt="" className="w-full h-full object-cover hover:scale-110 transition-normal duration-200" />
      <div className="absolute z-10 bottom-0 left-0 p-4 w-full">
        <button className="bg-[#f8cdcd] p-5 w-full">
          <p className="text-black text-[14px] font-bold uppercase">
            {title}
          </p>
          <p className="uppercase text-[11px]">{products} Products</p>
        </button>
      </div>
    </div>
  );
}

export default CategoryCard;
