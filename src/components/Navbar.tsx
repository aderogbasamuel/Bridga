import { Link } from "react-router-dom";
function Nvabar() {
    return ( 
        <div className="px-20 py-4 flex gap-6 font-[750] text-gray-800 text-[13px] uppercase">
            <Link to='/home'>Home</Link>
            <Link to='/shop'>Shop</Link>
            <Link to='/checkout'>Checkout</Link>
            <Link to='/contact'>Contact</Link>
        </div>
     );
}

export default Nvabar;