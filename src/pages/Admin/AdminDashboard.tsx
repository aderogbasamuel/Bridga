import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Icons } from "@/components/icons";
import { Plus } from "lucide-react";

// charts
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

// NOTE: This file is a single-file dashboard scaffold. Replace mock data & placeholder
// fetches with your real Firestore / analytics endpoints.

const mockSales = [
  { month: "Jan", sales: 1200 },
  { month: "Feb", sales: 2100 },
  { month: "Mar", sales: 800 },
  { month: "Apr", sales: 2800 },
  { month: "May", sales: 1900 },
  { month: "Jun", sales: 2400 },
];

const mockProducts = [
  { id: "p1", name: "Car Battery", price: 120, category: "Batteries", imageUrl: "https://via.placeholder.com/300" },
  { id: "p2", name: "Alloy Rim 17\"", price: 220, category: "Tyres & Rims", imageUrl: "https://via.placeholder.com/300" },
  { id: "p3", name: "Headlight (LED)", price: 80, category: "Electronics", imageUrl: "https://via.placeholder.com/300" },
];

export default function AdminDashboardPage() {
  // replace these with real queries to Firestore (counts, latest orders, etc.)
  const [totalProducts, setTotalProducts] = useState<number | null>(null);
  const [totalOrders, setTotalOrders] = useState<number | null>(null);
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [recentProducts, setRecentProducts] = useState(mockProducts);

  useEffect(() => {
    // placeholder: simulate fetching counts (replace with getDocs / onSnapshot)
    setTimeout(() => {
      setTotalProducts(124);
      setTotalOrders(58);
      setTotalUsers(920);
    }, 200);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview of store performance</p>
        </div>

        <div className="flex items-center gap-3">
          <Input placeholder="Search products or orders" className="w-72" />
          <Link to="/admin/add-product">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalProducts ?? "—"}</div>
            <div className="text-sm text-muted-foreground">Total products in catalog</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalOrders ?? "—"}</div>
            <div className="text-sm text-muted-foreground">Orders this month</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalUsers ?? "—"}</div>
            <div className="text-sm text-muted-foreground">Registered users</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Sales (last 6 months)</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ width: "100%", height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockSales} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#2dd4bf" strokeWidth={3} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Separator className="my-6" />

          <Card>
            <CardHeader>
              <CardTitle>Recent Products</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentProducts.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={p.imageUrl} />
                          <AvatarFallback>{p.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{p.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>{p.category}</TableCell>
                      <TableCell>${p.price}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm">Edit</Button>
                          <Button size="sm" variant="destructive">Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Quick stats & inventory chart */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Inventory by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[{ name: 'Car Parts', count: 40 }, { name: 'Accessories', count: 30 }, { name: 'Tyres', count: 20 }]}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#60a5fa" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Separator className="my-6" />

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button asChild>
                <Link to="/admin/add-product">Add product</Link>
              </Button>
              <Button variant="ghost">Manage Categories</Button>
              <Button variant="outline">Export CSV</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 text-sm text-muted-foreground">Built with Shadcn UI • Modify data fetches to plug Firestore</div>
    </div>
  );
}
