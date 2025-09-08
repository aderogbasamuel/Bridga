import { Link, Outlet, useLocation } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Menu, PlusCircle, Package, ShoppingCart } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const sidebarLinks = [
  { to: "/admin/add-product", label: "Add Product", icon: PlusCircle },
  { to: "/admin/products", label: "Product List", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
]

const AdminDashboard = () => {
  const location = useLocation()

  return (
    <div className="flex h-screen">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex w-64 bg-[#220000] text-white flex-col p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-3">
          {sidebarLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-700 ${
                location.pathname === to ? "bg-red-400" : ""
              }`}
            >
              <Icon size={18} /> {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden absolute top-4 left-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-[#220000] text-white">
            <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
            <nav className="flex flex-col space-y-3">
              {sidebarLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-700 ${
                    location.pathname === to ? "bg-gray-700" : ""
                  }`}
                >
                  <Icon size={18} /> {label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Card className="p-6">
          <Outlet />
        </Card>
      </main>
    </div>
  )
}

export default AdminDashboard
