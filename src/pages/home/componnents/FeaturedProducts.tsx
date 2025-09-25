import ProductItemCard from "@/components/ProductItemCard";
import type { Key } from "react";
function FeaturedProducts({ loading, products }:{loading:any,products:any}) {
    return ( 
        <section className="px-0 sm:px-0  md:px-14  py-10">
        <h3 className="text-gray-800 mx-4 sm:mx-4 full-heading text-[20px] uppercase font-bold">
          Featured Products
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 sm:mt-12">
            { (loading)&&(<p>Loading Products...</p>)}
          {
            
            products.map((product: unknown, index: Key | null | undefined) => (
              <div key={index} className="">
                <ProductItemCard product={product} />
              </div>
            ))
          }
        </div>
      </section>
     );
}

export default  FeaturedProducts;