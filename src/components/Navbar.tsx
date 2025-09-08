import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
function Nvabar({
  navbar,
  setNavbar,
}: {
  navbar: boolean;
  setNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return ( 
        <>
        <div className="hidden px-20 py-4 sm:flex gap-6 font-[750] text-gray-800 text-[13px] uppercase">
            <Link to='/home'>Home</Link>
            <Link to='/shop'>Shop</Link>
            <Link to='/checkout'>Checkout</Link>
            <Link to='/contact'>Contact</Link>
            </div>
            <div className="relative">
                  {navbar && (
                    <div
                      className="fixed inset-0 bg-black/50 z-40"
                      onClick={() => setNavbar(false)} // closes on click
                    ></div>
                  )}
                  <div
                    className={`fixed  transform transition-transform duration-300 z-50 w-[300px] bg-white flex flex-col top-0 left-0 h-full ${
                      navbar ? "translate-x-0" : "-translate-x-full"
                    }`}
                  >
                    <div className="bg-black text-center py-3 px-2">
                      <h2 className="capitalize text-white font-semibold text-[18px] flex items-center text-center relative justify-between">
                        
                <p><Link to="/login">Login</Link>/<Link to="/signup">Signup</Link></p>
                <button onClick={() => setNavbar(false)}>
                          <Icon
                            icon="tabler:chevron-right"
                            width="24"
                            height="24"
                            className=""
                          />
                        </button>
                      </h2>
            </div>
            <h2 className="text-center text-black font-[750] text-[15px] py-4">MENU</h2>
                    <div className="px-4 py-4 flex flex-col gap-8 font-[750] text-gray-800 text-[13px] uppercase">
              {[
                {
                  path: "/home",
                  title:"Home",
                },
                {
                  path: "/shop",
                  title: "shop"
                },
                {
                  path: "/checkout",
                  title: "checkout"
                },
                {
                  path: "/contact",
                  title: "contact"
                }
              ].map((link, index) => (
                <Link to={link.path} key={index} onClick={()=>setNavbar(false)}>{ link.title}</Link>
              ))}
            </div>
                  </div>
                </div>
        </>
     );
}

export default Nvabar;