// import { useState } from "react";
// import { Input } from "../../components/ui/input";
// import { Button } from "../../components/ui/button";
// import { Progress } from "../../components/ui/progress";
// import { Card, CardHeader, CardContent, CardTitle } from "../../components/ui/card";
// import { uploadProductImage } from "../../services/uploadService"; // see below

// const AddProducts = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [progress, setProgress] = useState(0);
//   const [imageUrl, setImageUrl] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     setFile(e.target.files[0]);
//     setProgress(0);
//     setImageUrl("");
//   };

//   const handleUpload = async () => {
//     if (!file) return;
//     setLoading(true);
//     try {
//       const url = await uploadProductImage(file, (percent) => setProgress(percent));
//       setImageUrl(url);
//       console.log("Uploaded file URL:", url);
//     } catch (err) {
//       console.error(err);
//       alert("Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="bg-blue-900 max-w-md mx-auto mt-6 p-4">
//       <CardHeader>
//         <CardTitle>Add Products Image</CardTitle>
//       </CardHeader>
//       <CardContent className="flex flex-col gap-4">
//         <Input type="file" accept="image/*" onChange={handleFileChange} />
//         {progress > 0 && <Progress value={progress} className="w-full" />}
//         <Button onClick={handleUpload} disabled={!file || loading}>
//           {loading ? "Uploading..." : "Upload"}
//         </Button>
//         {imageUrl && (
//           <img src={imageUrl} alt="Uploaded" className="mt-4 w-full rounded" />
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default AddProducts;
// import { useState } from "react";
// import { Input } from "../../components/ui/input";
// import { Button } from "../../components/ui/button";
// import { Progress } from "../../components/ui/progress";
// import { Card, CardHeader, CardContent, CardTitle } from "../../components/ui/card";
// import { Textarea } from "../../components/ui/textarea";
// import { Label } from "../../components/ui/label";
// import { uploadProductImage } from "../../services/uploadService";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// import { app } from "../../services/firebase"; // adjust path if different

// const db = getFirestore(app);

// const AddProducts = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [progress, setProgress] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "",
//   });

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     setFile(e.target.files[0]);
//     setProgress(0);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file) return alert("Please select an image");

//     setLoading(true);
//     try {
//       // Upload image
//       const imageUrl = await uploadProductImage(file, (percent) => setProgress(percent));

//       // Save product to Firestore
//       await addDoc(collection(db, "products"), {
//         ...form,
//         price: parseFloat(form.price),
//         imageUrl,
//         createdAt: new Date(),
//       });

//       alert("✅ Product added successfully!");
//       setForm({ name: "", description: "", price: "", category: "" });
//       setFile(null);
//       setProgress(0);
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to add product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="max-w-lg mx-auto mt-10 p-6">
//       <CardHeader>
//         <CardTitle>Add New Product</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <div>
//             <Label>Product Name</Label>
//             <Input name="name" value={form.name} onChange={handleChange} required />
//           </div>

//           <div>
//             <Label>Description</Label>
//             <Textarea name="description" value={form.description} onChange={handleChange} required />
//           </div>

//           <div>
//             <Label>Price ($)</Label>
//             <Input name="price" type="number" value={form.price} onChange={handleChange} required />
//           </div>

//           <div>
//             <Label>Category</Label>
//             <Input name="category" value={form.category} onChange={handleChange} required />
//           </div>

//           <div>
//             <Label>Product Image</Label>
//             <Input type="file" accept="image/*" onChange={handleFileChange} required />
//             {progress > 0 && <Progress value={progress} />}
//           </div>

//           <Button type="submit" disabled={loading}>
//             {loading ? "Uploading..." : "Add Product"}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// // export default AddProducts;








// import { useState } from "react";
// import { Input } from "../../components/ui/input";
// import { Button } from "../../components/ui/button";
// import { Progress } from "../../components/ui/progress";
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   CardTitle,
// } from "../../components/ui/card";
// import { uploadToCloudinary } from "../../services/cloudinarySearvices";
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "../../services/firebase"; // Firestore instance

// const AddProducts = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [progress, setProgress] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [product, setProduct] = useState({
//     name: "",
//     price: "",
//     description: "",
//     imageUrl: "",
//   });
//   const generateSlug = (name: string) => {
//     return name
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, "-") // replace spaces & symbols with -
//       .replace(/(^-|-$)+/g, ""); // remove leading/trailing dashes
//   };
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     setFile(e.target.files[0]);
//     setProgress(0);
//   };

//   const handleUpload = async () => {
//     if (!file) return;
//     setLoading(true);
//     try {
//       const url = await uploadToCloudinary(file);
//       setProduct((prev) => ({ ...prev, imageUrl: url }));
//       setProgress(100);
//     } catch (err) {
//       console.error(err);
//       alert("Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async () => {
//     if (
//       !product.name ||
//       !product.price ||
//       !product.description ||
//       !product.imageUrl
//     ) {
//       alert("Fill all fields and upload an image");
//       return;
//     }

//     try {
//       await addDoc(collection(db, "products"), {
//         ...product,
//         price: parseFloat(product.price),
//         slug: generateSlug(product.name),
//         createdAt: new Date(),
//       });
//       alert("Product added successfully!");
//       setProduct({ name: "", price: "", description: "", imageUrl: "" });
//       setFile(null);
//       setProgress(0);
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert("Failed to add product");
//     }
//   };

//   return (
//     <Card className="bg-white shadow-lg max-w-lg mx-auto mt-6 p-4">
//       <CardHeader>
//         <CardTitle>Add New Product</CardTitle>
//       </CardHeader>
//       <CardContent className="flex flex-col gap-4">
//         <Input
//           name="name"
//           placeholder="Product Name"
//           value={product.name}
//           onChange={handleChange}
//         />
//         <Input
//           name="price"
//           placeholder="Price"
//           type="number"
//           value={product.price}
//           onChange={handleChange}
//         />
//         <textarea
//           name="description"
//           placeholder="Product Description"
//           className="border rounded p-2"
//           value={product.description}
//           onChange={handleChange}
//         />

//         <Input type="file" accept="image/*" onChange={handleFileChange} />
//         {progress > 0 && <Progress value={progress} className="w-full" />}
//         <Button onClick={handleUpload} disabled={!file || loading}>
//           {loading ? "Uploading..." : "Upload Image"}
//         </Button>

//         {product.imageUrl && (
//           <img
//             src={product.imageUrl}
//             alt="Uploaded"
//             className="mt-4 w-full rounded"
//           />
//         )}

//         <Button onClick={handleSubmit} className="bg-blue-600 text-white">
//           Save Product
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// // export default AddProducts;
// import { useState } from "react";
// import { Input } from "../../components/ui/input";
// import { Button } from "../../components/ui/button";
// import { Progress } from "../../components/ui/progress";
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   CardTitle,
// } from "../../components/ui/card";
// import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../../components/ui/select";

// import { uploadToCloudinary } from "../../services/cloudinarySearvices";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { db } from "../../services/firebase"; 
// // import { categories } from "../../data/categories"; // 🔥 fixed categories
// import { categories } from "@/data/cateogries";
// const AddProducts = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [progress, setProgress] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [product, setProduct] = useState({
//     name: "",
//     price: "",
//     description: "",
//     imageUrl: "",
//     category: "", // 🔥 new field
//   });

//   const generateSlug = (name: string) => {
//     return name
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, "-")
//       .replace(/(^-|-$)+/g, "");
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     setFile(e.target.files[0]);
//     setProgress(0);
//   };

//   const handleUpload = async () => {
//     if (!file) return;
//     setLoading(true);
//     try {
//       const url = await uploadToCloudinary(file);
//       setProduct((prev) => ({ ...prev, imageUrl: url }));
//       setProgress(100);
//     } catch (err) {
//       console.error(err);
//       alert("Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async () => {
//     if (
//       !product.name ||
//       !product.price ||
//       !product.description ||
//       !product.imageUrl ||
//       !product.category
//     ) {
//       alert("Fill all fields, upload an image, and select a category");
//       return;
//     }

//     try {
//       await addDoc(collection(db, "products"), {
//         ...product,
//         price: parseFloat(product.price),
//         slug: generateSlug(product.name),
//         createdAt: serverTimestamp(),
//       });
//       alert("Product added successfully!");
//       setProduct({
//         name: "",
//         price: "",
//         description: "",
//         imageUrl: "",
//         category: "",
//       });
//       setFile(null);
//       setProgress(0);
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert("Failed to add product");
//     }
//   };

//   return (
//     <Card className="bg-white shadow-lg max-w-lg mx-auto mt-6 p-4">
//       <CardHeader>
//         <CardTitle>Add New Product</CardTitle>
//       </CardHeader>
//       <CardContent className="flex flex-col gap-4">
//         <Input
//           name="name"
//           placeholder="Product Name"
//           value={product.name}
//           onChange={handleChange}
//         />
//         <Input
//           name="price"
//           placeholder="Price"
//           type="number"
//           value={product.price}
//           onChange={handleChange}
//         />
//         <textarea
//           name="description"
//           placeholder="Product Description"
//           className="border rounded p-2"
//           value={product.description}
//           onChange={handleChange}
//         />

//         {/* 🔥 Category Selector */}
//         <Select
//           value={product.category}
//           onValueChange={(value) => setProduct({ ...product, category: value })}
//         >
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder="Select Category" />
//           </SelectTrigger>
//           <SelectContent>
//             {categories.map((cat) => (
//               <SelectItem key={cat.slug} value={cat.slug}>
//                 {cat.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

//         <Input type="file" accept="image/*" onChange={handleFileChange} />
//         {progress > 0 && <Progress value={progress} className="w-full" />}
//         <Button onClick={handleUpload} disabled={!file || loading}>
//           {loading ? "Uploading..." : "Upload Image"}
//         </Button>

//         {product.imageUrl && (
//           <img
//             src={product.imageUrl}
//             alt="Uploaded"
//             className="mt-4 w-full rounded"
//           />
//         )}

//         <Button onClick={handleSubmit} className="bg-blue-600 text-white">
//           Save Product
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default AddProducts;

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"

import { uploadToCloudinary } from "@/services/cloudinarySearvices"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/services/firebase"
import { categories } from "@/data/cateogries"

const AddProducts = () => {
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
    category: "",

  })

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
const generateCategorySlug = (category: string) =>
    category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setFile(e.target.files[0])
    setProgress(0)
  }

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    try {
      const url = await uploadToCloudinary(file)
      setProduct((prev) => ({ ...prev, imageUrl: url }))
      setProgress(100)
    } catch (err) {
      console.error(err)
      alert("Upload failed")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (
      !product.name ||
      !product.price ||
      !product.description ||
      !product.imageUrl ||
      !product.category
    ) {
      alert("Fill all fields, upload an image, and select a category")
      return
    }

    try {
      await addDoc(collection(db, "products"), {
        ...product,
        price: parseFloat(product.price),
        slug: generateSlug(product.name),
        categorySlug: generateCategorySlug(product.category),
        createdAt: serverTimestamp(),
      })
      alert("✅ Product added successfully!")
      setProduct({
        name: "",
        price: "",
        description: "",
        imageUrl: "",
        category: "",
      })
      setFile(null)
      setProgress(0)
    } catch (error) {
      console.error("Error adding product:", error)
      alert("❌ Failed to add product")
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Add New Product</h1>
      <p className="text-muted-foreground mb-6">
        Fill in the product details and upload an image to add it to your shop.
      </p>

      <Card className="shadow-sm border">
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>
            Complete the form below to create a new product.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <Input
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={handleChange}
            />

            {/* Price */}
            <Input
              name="price"
              placeholder="Price"
              type="number"
              value={product.price}
              onChange={handleChange}
            />

            {/* Category */}
            <Select
              value={product.category}
              onValueChange={(value) =>
                setProduct({ ...product, category: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* File Upload */}
            <div className="space-y-2">
              <Input type="file" accept="image/*" onChange={handleFileChange} />
              {progress > 0 && <Progress value={progress} className="w-full" />}
              <Button
                onClick={handleUpload}
                disabled={!file || loading}
                className="w-full"
              >
                {loading ? "Uploading..." : "Upload Image"}
              </Button>
            </div>

            {/* Description (full width) */}
            <div className="col-span-1 md:col-span-2">
              <textarea
                name="description"
                placeholder="Product Description"
                className="w-full border rounded-md p-3 h-28"
                value={product.description}
                onChange={handleChange}
              />
            </div>

            {/* Preview Image (full width) */}
            {product.imageUrl && (
              <div className="col-span-1 md:col-span-2">
                <img
                  src={product.imageUrl}
                  alt="Uploaded"
                  className="rounded-lg border w-full max-h-64 object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end mt-6 gap-4">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSubmit}>Save Product</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddProducts
