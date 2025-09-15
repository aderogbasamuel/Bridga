import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { db } from "@/services/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { notify } from "@/services/notify"

const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState<any>({
    name: "",
    category: "",
    price: "",
    imageUrl: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", id!)
        const snap = await getDoc(productRef)
        if (snap.exists()) {
          setForm(snap.data())
        } else {
          notify.error("Product not found")
          navigate("/admin/products")
        }
      } catch (err) {
        notify.error("Failed to load product")
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const productRef = doc(db, "products", id!)
      await updateDoc(productRef, form)
      notify.success("Product updated successfully")
      navigate("/admin/products")
    } catch (err) {
      notify.error("Failed to update product")
    }
  }

  if (loading) return <p className="p-6">Loading...</p>

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Edit Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter product name"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Enter category"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="Enter price"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://..."
              />
              {form.imageUrl && (
                <img
                  src={form.imageUrl}
                  alt="Preview"
                  className="mt-2 h-32 w-32 object-cover rounded-md border"
                />
              )}
            </div>

            <div className="flex gap-3">
              <Button type="submit">Save Changes</Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditProduct
