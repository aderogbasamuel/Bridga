import { Link, Outlet, useLocation } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Menu, PlusCircle, Package, ShoppingCart, BarChart3 } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/context/AuthContext"

const sidebarLinks = [
  { to: "/admin", label: "Dashboard", icon: BarChart3 },
  { to: "/admin/add-product", label: "Add Product", icon: PlusCircle },
  { to: "/admin/products", label: "Product List", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
]

const AdminLayout = () => {
  const location = useLocation()
  const { user } = useAuth()

  return (
    <div className="flex h-screen">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex w-64 bg-[#220000] text-white flex-col p-4">
        <h2 className="text-2xl font-bold mb-8 tracking-wide">Admin Panel</h2>
        <nav className="flex flex-col space-y-2">
          {sidebarLinks.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  active
                    ? "bg-red-500/80 text-white shadow-sm"
                    : "hover:bg-white/10"
                }`}
              >
                <Icon size={18} /> <span>{label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-white">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-[#220000] text-white w-64">
            <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
            <nav className="flex flex-col space-y-2">
              {sidebarLinks.map(({ to, label, icon: Icon }) => {
                const active = location.pathname === to
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                      active ? "bg-red-500/80 text-white" : "hover:bg-white/10"
                    }`}
                  >
                    <Icon size={18} /> <span>{label}</span>
                  </Link>
                )
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-14 bg-white border-b flex items-center justify-between px-6 shadow-sm">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <Avatar className="h-8 w-8">
              <AvatarFallback>{user?.email?.[0]?.toUpperCase() || "A"}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <Card className="p-6 shadow-md">
            <Outlet />
          </Card>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
