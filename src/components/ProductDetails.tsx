import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { useEffect, useState } from "react";
import { addToCart } from "@/services/addToCart";
import { useAuth } from "@/context/AuthContext";
import { notify } from "@/services/notify";
import { formatText } from "@/utils/formatText";
import ProductItemCard from "./ProductItemCard";

function RichText({ text }: { text: string }) {
  return (
    <div
      className="text-[#1F2937] text-[14px] sm:text-[16px] leading-7"
      dangerouslySetInnerHTML={{ __html: formatText(text) }}
    />
  );
}

const ProductDetail = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState<any>(null);
  const [tab, setTab] = useState("Description");
const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
useEffect(() => {
  if (!product?.category) return;

  const fetchRelated = async () => {
    const q = query(
      collection(db, "products"),
      where("category", "==", product.category)
    );

    const snapshot = await getDocs(q);

    const items = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((item: any) => item.id !== product.id)
      .slice(0, 4); // limit to 4

    setRelatedProducts(items);
  };

  fetchRelated();
}, [product]);

  useEffect(() => {
    const fetchProduct = async () => {
      const q = query(collection(db, "products"), where("slug", "==", slug));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        setProduct({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
      }
    };
    fetchProduct();
  }, [slug]);

  const handleAddToCart = async () => {
    if (!user) {
      notify.error("Please log in first");
      return;
    }
    await addToCart(user.uid, product);
    notify.success("Added to cart");
  };

  if (!product) return <p className="p-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-12 py-10">
      {/* MAIN PRODUCT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* IMAGE */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-[420px] object-cover rounded-lg"
          />
        </div>

        {/* INFO */}
        <div className="flex flex-col gap-4">
          <p className="text-[12px] text-[#6C7A93] capitalize">
            Home / Shop / {product.category} / {product.name}
          </p>

          <h1 className="text-[24px] font-semibold text-[#1F2937]">
            {product.name}
          </h1>

          <p className="text-[28px] font-bold text-[#2B4162]">
            ₦{Number(product.price).toLocaleString()}
          </p>

          <p className="text-green-600 text-sm font-medium">In stock</p>

          {/* ACTIONS */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddToCart}
              className="
                bg-[#2B4162] 
                hover:bg-[#223353] 
                text-white 
                px-6 py-3 
                rounded-lg 
                font-bold 
                uppercase 
                text-[14px]
                transition
              "
            >
              Add to cart
            </button>

            <button
              className="
                border border-[#E5E7EB] 
                px-5 py-3 
                rounded-lg 
                text-[#2B4162] 
                font-bold 
                uppercase 
                text-[14px]
              "
            >
              Wishlist
            </button>
          </div>

          <p className="text-[14px] text-[#6C7A93] mt-4">
            <span className="font-semibold text-[#1F2937]">Category:</span>{" "}
            {product.category}
          </p>
        </div>
      </div>

      {/* TABS */}
      <div className="mt-14">
        <div className="flex gap-8 border-b border-[#E5E7EB]">
          {["Description", "Additional Information", "Review"].map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`
                pb-3 uppercase font-bold text-[14px]
                ${
                  tab === item
                    ? "text-[#2B4162] border-b-2 border-[#2B4162]"
                    : "text-[#6C7A93]"
                }
              `}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-6 max-w-4xl">
          {tab === "Description" && (
            <RichText text={product.description} />
          )}

          {tab === "Additional Information" && (
            <p className="text-[#6C7A93] text-sm">
              No additional information available for this product.
            </p>
          )}

          {tab === "Review" && (
            <p className="text-[#6C7A93] text-sm">
              There are no reviews yet for this product.
            </p>
          )}
        </div>
      </div>

      {/* RELATED */}
      <div className="mt-16">
        <h2 className="text-[20px] font-bold text-[#1F2937] mb-6">
          Related Products
        </h2>

        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"> */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
  {relatedProducts.map((item) => (
    <ProductItemCard key={item.id} product={item} />
  ))}
{/* </div> */}

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
