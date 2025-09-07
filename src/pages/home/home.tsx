import image1 from '../../assets/c-joyful-heFTscwGDCA-unsplash.jpg'
import image2 from '../../assets/chad-kirchoff-xe-e69j6-Ds-unsplash.jpg'
import image3 from '../../assets/sam-loyd-qy27JnsH9sU-unsplash.jpg'
import CategoryCard from '../../components/CategoryCard';
import ProductCard from '../../components/ProductCard';
function HomePage() {
    return ( 
        <div>
            <div className='w-full aspect-square overflow-hidden md:h-screen'>
                <img src={image1} alt="" className='w-full object-center' />
            </div>
            <section className=' px-4 sm:px-4 md:px-24  py-10'>
                <h3 className='heading text-[16px] uppercase font-bold mb-12'>Featured Categories</h3>
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6'>
                    {[
                        {
                            image: image1,
                            title: "Car Parts",
                            products: 14
                        },
                        {
                            image: image2,
                            title: "Accessories",
                            products: 18
                        },
                        {
                            image: image3,
                            title: "Tyres & Rims",
                            products: 22
                        },
                        {
                            image: image1,
                            title: "Electronics",
                            products: 10
                        },
                    ].map((category, index) => (
                        <CategoryCard
                            key={index}
                            image={category.image}
                            title={category.title}
                            products={category.products}
                        />
                    ))
                    }
                </div>
            </section>
            <section className='px-4 sm:px-4 md:px-24  py-10'>
                <h3 className='text-gray-800 full-heading text-[20px] uppercase font-bold'>Featured Products</h3>
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 mt-6 sm:mt-12'>
                    {[
                        {
                            image: image1,
                            title: "Car Parts",
                            price: 14000,
                            category: "Car Parts"
                        },
                        {
                            image: image2,
                            title: "Accessories",
                            price: 18000,
                            category: "Accessories"
                        },
                        {
                            image: image3,
                            title: "Tyres & Rims",
                            price: 22000,
                            category: "Tyres & Rims"
                        },
                        {
                            image: image1,
                            title: "Electronics",
                            price: 10000,
                            category: "Electronics"
                        },
                    ].map((product, index) => (
                        <div key={index} className=''>
                            <ProductCard image={ product.image} title={product.title} price={product.price} category={product.category} />
                        </div>
                    ))  
                    }

                </div>
            </section>
        </div>
     );
}

export default HomePage;