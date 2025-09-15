import { useParams } from "react-router-dom";
import { collection, query, where, getDocs,updateDoc,doc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useEffect, useState } from "react";
import { addToCart } from "@/services/addToCart"
import { useAuth } from "@/context/AuthContext";
import { notify } from "@/services/notify"
import QuantityCounter from "@/utils/QuantityCounter";


const ProductDetail = () => {
  const [selection,setSelection]=useState("Description")
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  useEffect(() => {
    const fetchProduct = async () => {
      const q = query(
        collection(db, "products"),
        where("slug", "==", slug)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        setProduct({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
      }
    };
    fetchProduct();
  }, [slug]);
const { user } = useAuth()
// const updateQuantity = async (id: string, newQty: number) => {
//     if (!user || newQty < 1) return
//     const itemRef = doc(db, "users", user.uid, "cart", id)
//     await updateDoc(itemRef, { quantity: newQty })
//   }
  const handleAddToCart = async () => {
    if (!user) {
      notify.error("Please log in first")
      return
    }
    await addToCart(user.uid, product)
    // alert("Added to cart ✅")
    notify.success("Added to cart")
  }

  if (!product) return <p>Loading...</p>;

  return (
    <div className="w-full mx-auto p-6 px-6 sm:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <img src={product.imageUrl} alt={product.name} className="w-full object-cover rounded" />
      </div>
      <div className="ml-0 sm:ml-6 flex-1 p-12 px-0 sm:px-12">
        <p className="text-[12px] text-[#555] capitalize">Home / Shop / {product.category} / {product.name}</p>
      <h1 className="text-[18px] font-light mt-4 text-black">{product.name}</h1>
      <p className="text-xl font-bold mt-4 text-[28px]" >${product.price}</p>
        <p className="text-green-500 py-3">In stock</p>
        <div className="flex gap-2 items-center">
          <div className="flex gap-3 items-center">
            <button className="p-2 rounded-full border w-10 h-10">-</button>
            <div className=" border p-2 w-10 h-10">1</div>
          <button className="border rounded-full p-2 w-10 h-10">+</button>
          </div>
          <button className="bg-[#222222] text-white font-bold px-3 py-2 uppercase text-[14px] " onClick={handleAddToCart}>Add to cart</button>
        </div>
        {/* <QuantityCounter
                            value={product.quantity}
                            onChange={(newQty) => updateQuantity(product.id, newQty)}
                            min={1}
                          /> */}
        <div className="flex gap-3 py-3">
          <button className="font-medium text-[14px]">Add to wishlist</button>
          <button>Compare</button>
        </div>
        <p className="font-light text-[#555] text-[14px] capitalize"><span className="font-bold">Category:</span> { product.category}</p>
        </div>
      </div>
      <div className="my-6 ">
        <div className="flex gap-6 sm:gap-6 flex-wrap">
          {[
            "Description","Additional Information","Review"
          ].map((select, index) => (
            <button key={index} onClick={()=>setSelection(select)} className={`text-[16px] text-[#333] py-3 uppercase font-bold ${selection===select? "border-black border-b-2  ":""}`}>{ select}</button>
          ))}
          </div>
      </div>
      <div>
        <h2 className="text-[20px] text-[#333] font-bold w-20 border-b-2 border-black text-nowrap">Related Proudcts</h2>
      </div>
    </div>
  );
};

export default ProductDetail;
