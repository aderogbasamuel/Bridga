import PageLayout from "../../components/PageLayout";
import ProductsList from "./components/ProductList";
import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { db } from "../../services/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { categories } from "../../data/cateogries"

function ShopPage() {

// const [products, setProducts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchProducts = async () => {
//     const querySnapshot = await getDocs(collection(db, "products"));
//     const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     setProducts(items);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

  const { slug } = useParams() // grab /shop/:slug if present
  const [products, setProducts] = useState<any[]>([])

  const category = categories.find((c) => c.slug === slug)

  useEffect(() => {
    const fetchProducts = async () => {
      let q
      if (slug) {
        // filter by category
        q = query(collection(db, "products"), where("category", "==", slug))
      } else {
        // get all products
        q = collection(db, "products")
      }
      const snap = await getDocs(q)
      setProducts(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    }
    fetchProducts()
  }, [slug])

  // if (loading) return <p>Loading...</p>;
  return (
    <>
      <PageLayout title="Shop" subTitle={category ? category.name : ""} >
        <div className=" px-4 sm:px-4 md:px-24  py-10">
              <div className=" text-[#555]">
                  
              <p className="text-[12px]">Showing 1–{products.length} Products of 36 Products</p>
              </div>
        <ProductsList
          
          products={products} 
          
        /></div>
      </PageLayout>
    </>
  );
}

export default ShopPage;
