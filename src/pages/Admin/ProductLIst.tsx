import { useEffect, useState } from "react"
import { db } from "@/services/firebase"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useNavigate } from "react-router-dom"

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"))
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    setProducts(items)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    await deleteDoc(doc(db, "products", id))
    setProducts(products.filter((p) => p.id !== id))
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div className="p-6">
      <Card className="shadow-sm">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>All Products</CardTitle>
          <Button onClick={() => navigate("/admin/add-product")}>
            + Add Product
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={p.imageUrl} alt={p.name} />
                      <AvatarFallback>{p.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell>₦{Number(p.price).toLocaleString()}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/admin/edit/${p.id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductList
