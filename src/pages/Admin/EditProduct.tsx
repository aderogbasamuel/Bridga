import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../services/firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name);
        setPrice(data.price);
        setCategory(data.category);
        setDescription(data.description);
      }
    };
    fetchProduct();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    const docRef = doc(db, "products", id);
    await updateDoc(docRef, {
      name,
      price,
      category,
      description,
      updatedAt: serverTimestamp(),
    });
    alert("Product updated!");
    navigate("/admin/products");
  };

  return (
    <form onSubmit={handleUpdate} className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Update
      </button>
    </form>
  );
};

export default EditProduct;
