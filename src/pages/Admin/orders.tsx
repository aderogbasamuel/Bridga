import { useEffect, useState } from "react"
import { db } from "@/services/firebase"
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"
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
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

const OrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    const querySnapshot = await getDocs(collection(db, "orders"))
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    setOrders(items)
    setLoading(false)
  }

  const updateStatus = async (id: string, newStatus: string) => {
    await updateDoc(doc(db, "orders", id), { status: newStatus })
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o)))
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this order?")) return
    await deleteDoc(doc(db, "orders", id))
    setOrders(orders.filter((o) => o.id !== id))
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div className="p-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.userEmail}</TableCell>
                  <TableCell>
                    <ul className="text-sm text-muted-foreground">
                      {order.items?.map((item: any, i: number) => (
                        <li key={i}>
                          {item.name} x {item.qty}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>₦{Number(order.total).toLocaleString()}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(val) => updateStatus(order.id, val)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(order.id)}
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

export default OrdersPage
