import logo from "../assets/BRIDGA.png";
import { Icon } from "@iconify/react";
function Footer() {
  return (
    <div>
    <div className="bg-[#3d0d0d] text-white grid grid-cols-1 md:grid-cols-4 p-6 md:p-18 gap-12">
      <div className="flex flex-col gap-4">
        <img src={logo} alt="Bridga logo" className="w-[300px] md:w-full pb-8" />
        <div className="flex gap-3 text-[15px] items-center">
          <Icon icon="ion:call-outline" width="18" height="18" />
          <p> +23423456789</p>
              </div>
              <div className="flex gap-3 text-[15px] items-center">
              <Icon icon="material-symbols-light:mail-outline-rounded" width="18" height="18" />
          <p> hello@bridga.com</p>
              </div>
        
          </div>
          {[
              {
                  title: "categories",
                  links: [
                      {
                          name: "Car Parts",
                          url: "/shop/car-parts",
                      },
                        {
                            name: "Accessories",
                            url: "/shop/accessories",
                        },
                        {
                            name: "Tyres & Rims",
                            url: "/shop/tyres-rims",
                        },
                        {
                            name: "Electronics",
                            url: "/shop/electronics",
                        },
                        {
                            name: "Tools & Equipment",
                            url: "/shop/tools-equipment",
                        },
                  ]
              },
              {
                  title: "Shop",
                  links: [
                      {
                          name: "All Products",
                          url: "/shop/",
                      },
                      {
                          name: "Checkout",
                          url: "/shop/checkout",
                      },
                      {
                          name: "Account",
                          url: "/shop/my-account",
                      },
                      {
                          name: "Order Tracking",
                          url: "/shop/order-tracking",
                      }
                  ]
              },
              {
                  title: "Help",
                  links: [
                      {
                          name: "Contact",
                            url: "/contact",
                      }
                      ,
                      {
                          name:"Privacy Policy",
                          url: "/privacy-policy",
                      }
                  ]
              }
          ].map((section, index) => (
                <div key={index} className="felx flex-col gap-4">
                    <h3 className="font-bold text-[20px] uppercase pb-4">{section.title}</h3>
                    <div className="flex flex-col gap-4">
                        {section.links.map((link, linkIndex) => (
                            <a 
                                key={linkIndex} 
                                href={link.url} 
                                className="text-[15px] hover:underline"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            )
    )}

          </div>
          <footer className="bg-[#220000] py-6 px-6  md:px-18 text-white text-center ">Bridga &copy; 2025 All Rights Reserved. Developed by <a href="Wajucreative.com">Waju Creative</a></footer>
          </div>
  );
}

export default Footer;
