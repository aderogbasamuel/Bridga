import PageLayout from "../../components/PageLayout";
import ProductsList from "./components/ProductList";
import { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
function ShopPage() {

const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(items);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <PageLayout title="Shop" >
        <div className=" px-4 sm:px-4 md:px-24  py-10">
              <div className="px-20 text-[#555]">
                  
              <p className="text-[12px]">Showing 1–24 Products of 36 Products</p>
              </div>
        <ProductsList
          
          products={products} 
          
        /></div>
      </PageLayout>
    </>
  );
}

export default ShopPage;
