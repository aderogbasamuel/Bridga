import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const handleAdd = async () => {
    if (!name || !value) return alert("Fill all fields");
    try {
      await addDoc(collection(db, "categories"), { name, value });
      alert("Category added!");
      setName("");
      setValue("");
    } catch (err) {
      console.error(err);
      alert("Error adding category");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-4 border rounded">
      <Input placeholder="Category Name (Cars)" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Category Value (cars)" value={value} onChange={(e) => setValue(e.target.value)} className="mt-2" />
      <Button onClick={handleAdd} className="mt-4 w-full">Add Category</Button>
    </div>
  );
};

export default AddCategory;
