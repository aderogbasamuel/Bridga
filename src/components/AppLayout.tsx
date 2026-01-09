import { Outlet } from "react-router-dom";
import Footer from "../features/footer";
import Header from "../features/header";
import Nvabar from "./Navbar";
import { useState } from "react";
import CartBar from "../features/CartBar";

function AppLayout() {
    const [cartBar, setCartBar] = useState(false)
    const [navbar,setNavbar]=useState(false)
    return ( 
        <div className="flex flex-col">
            <div className="hidden w-full bg-[#2B4162] text-white p-3 uppercase md:flex justify-end pe-24 text-[12px]">
                <p>Welcome to our store!</p>
            </div>
            <Header setCartBar={setCartBar} setNavbar={ setNavbar} />
            <Nvabar navbar={navbar} setNavbar={ setNavbar} />
            <Outlet />
            <Footer />
            <CartBar cartBar={cartBar} setCartBar={setCartBar} />
        </div>
     );
}

export default AppLayout;