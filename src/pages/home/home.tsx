import image1 from '../../assets/c-joyful-heFTscwGDCA-unsplash.jpg'
import image2 from '../../assets/chad-kirchoff-xe-e69j6-Ds-unsplash.jpg'
import image3 from '../../assets/sam-loyd-qy27JnsH9sU-unsplash.jpg'
import tyresrims from '../../assets/christopher-john-eLbCls7vc6A-unsplash.jpg'
import accessories from '../../assets/alvis-taurens-BQOLjcESMl0-unsplash.jpg'
import CategoryCard from '../../components/CategoryCard';
import ProductItemCard from '../../components/ProductItemCard';
import { useFeaturedProducts } from "@/hooks/useFeaturedProducts"
function HomePage() {
    const { products, loading } = useFeaturedProducts()
    return ( 
        <div>
            <div className='w-full aspect-square overflow-hidden md:h-screen'>
                <img src={image1} alt="" className='w-full object-center' />
            </div>
            <section className=' px-4 sm:px-4 md:px-18  py-10'>
                <h3 className='heading text-[16px] uppercase font-bold mb-12'>Featured Categories</h3>
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {[
                        {
                            image: image1,
                            title: "Car Parts",
                            slug: "car-parts",
                            products: 14
                        },
                        {
                            image: accessories,
                            title: "Accessories",
                            slug: "accessories",
                            products: 18,
                        },
                        {
                            image: tyresrims,
                            title: "Tyres & Rims",
                            products: 22,
                            slug: "tyres-rims"
                        },
                        {
                            image: image3,
                            title: "Electronics",
                            slug: "electronics",

                            products: 10
                        },
                    ].map((category, index) => (
                        <CategoryCard
                            key={index}
                            image={category.image}
                            title={category.title}
                            products={category.products}
                            slug={category.slug}
                        />
                    ))
                    }
                </div>
            </section>
            <section className='px-0 sm:px-0  md:px-14  py-10'>
                <h3 className='text-gray-800 mx-4 sm:mx-4 full-heading text-[20px] uppercase font-bold'>Featured Products</h3>
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 sm:mt-12'>
                    {
                    //     [
                    //     {
                    //         image: image1,
                    //         title: "Car Parts",
                    //         price: 14000,
                    //         category: "Car Parts"
                    //     },
                    //     {
                    //         image: image2,
                    //         title: "Accessories",
                    //         price: 18000,
                    //         category: "Accessories"
                    //     },
                    //     {
                    //         image: image3,
                    //         title: "Tyres & Rims",
                    //         price: 22000,
                    //         category: "Tyres & Rims"
                    //     },
                    //     {
                    //         image: image1,
                    //         title: "Electronics",
                    //         price: 10000,
                    //         category: "Electronics"
                    //     },
                    // ]
                    products.map((product, index) => (
                        <div key={index} className=''>
                            <ProductItemCard product={product}/>
                        </div>
                    ))  
                    }

                </div>
            </section>
        </div>
     );
}

export default HomePage;