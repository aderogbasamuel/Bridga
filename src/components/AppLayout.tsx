import { Outlet } from "react-router-dom";
import Footer from "../features/footer";
import Header from "../features/header";
import Nvabar from "./Navbar";
import { useState } from "react";
import CartBar from "../features/CartBar";

function AppLayout() {
const [cartBar,setCartBar]=useState(false)
    return ( 
        <div className="flex flex-col">
            <div className="w-full bg-[#220000] text-white p-3 uppercase flex justify-end pe-24 text-[12px]">
                <p>Welcome to our store!</p>
            </div>
            <Header setCartBar={ setCartBar} />
            <Nvabar/>
            <Outlet />
            <Footer />
            <CartBar cartBar={cartBar} setCartBar={ setCartBar} />
        </div>
     );
}

export default AppLayout;