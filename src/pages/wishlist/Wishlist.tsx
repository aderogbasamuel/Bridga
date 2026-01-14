import PageLayout from "../../components/PageLayout";
import { Icon } from "@iconify/react";
import { useWishlist } from "../../hooks/useWishlist";

function Wishlist() {
  const { wishlist, user, toggleWishlist } = useWishlist();

  return (
    <PageLayout title="Wishlist" subTitle="">
      <div className="px-4 sm:px-8 lg:px-12 py-8">
        {wishlist.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Icon 
                  icon="solar:heart-linear" 
                  width="28" 
                  height="28" 
                  className="text-gray-400"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">
                  Your wishlist is empty
                </h3>
                <p className="text-gray-500">
                  Save items you love for later. Start adding products!
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>

            <div className="flex flex-col gap-4">
              {wishlist.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex gap-4 items-center">
                    {/* Product Image */}
                    <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => toggleWishlist(user.uid, product)}
                        className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:shadow-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                        aria-label={`Remove ${product.name} from wishlist`}
                      >
                        <Icon
                          icon="solar:heart-bold"
                          width="18"
                          height="18"
                          className="text-red-500"
                        />
                      </button>
                    </div>

                    {/* Product Info - Horizontal Layout */}
                    <div className="flex flex-1 items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-lg line-clamp-2 mb-1">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Icon icon="solar:check-circle-linear" width="12" height="12" className="mr-1" />
                            In Stock
                          </span>
                          <span className="text-xl font-bold text-gray-900">
                            ₦{Number(product.price).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      
                      {/* Action Button */}
                      <div className="flex-shrink-0 ml-6">
                        <button className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-lg text-sm transition-colors duration-200 whitespace-nowrap">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
}

export default Wishlist;