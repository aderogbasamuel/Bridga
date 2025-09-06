import { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(items);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
    setProducts(products.filter(p => p.id !== id));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Automobiles</h2>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200 text-left">

            <th className="p-2">Image</th>
            <th className="p-2">Name</th>
            <th className="p-2">Category</th>
            <th className="p-2">Price</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="p-2 w-[50px]"><img src={p.imageUrl} alt="" /></td>
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.category}</td>
              <td className="p-2">₦{p.price.toLocaleString()}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
                <a
                  href={`/admin/edit/${p.id}`}
                  className="bg-blue-600 text-white px-2 py-1 rounded"
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
