import PageLayout from "../../components/PageLayout";
import ProductsList from "./components/ProductList";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { db } from "../../services/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { categories } from "../../data/cateogries"

function ShopPage() {
  const { slug } = useParams() // grab /shop/:slug if present
  const [products, setProducts] = useState<any[]>([])

  const category = categories.find((c) => c.slug === slug)
  // console.log(category)
  useEffect(() => {
    const fetchProducts = async () => {
      let q
      if (slug) {
        // filter by categorySlug
        q = query(collection(db, "products"), where("categorySlug", "==", slug))
      } else {
        // get all products
        q = collection(db, "products")
      }
      const snap = await getDocs(q)
      setProducts(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    }
    fetchProducts()
  }, [slug])

  return (
    <PageLayout title="Shop" subTitle={category ? category.name : ""}>
      <div className="px-4 sm:px-4 md:px-24 py-10">
        <div className="text-[#555]">
          <p className="text-[12px]">
            Showing 1–{products.length} Products
          </p>
        </div>
        <ProductsList products={products} />
      </div>
    </PageLayout>
  )
}

export default ShopPage;
