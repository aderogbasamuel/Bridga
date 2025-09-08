import PageLayout from "../../components/PageLayout";
import image from "../../assets/c-joyful-heFTscwGDCA-unsplash.jpg";
import { Icon } from "@iconify/react";
import { useWishlist } from "../../hooks/useWishlist";
function Wishlist() {
  const { wishlist, user, toggleWishlist } = useWishlist();
  return (
    <PageLayout title="Wishlist">
      <div className="p-18">
        {wishlist.length === 0 ? (
          <p>No items in wishlist</p>
        ) : (
          <table className="w-full border-collapse text-left table-auto">
            <thead className="uppercase border-b border-t border-gray-300">
              <tr>
                <th></th>
                <th>Product Name</th>
                <th>unit price</th>
                <th>stock status</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((product) => (
                <tr className="border-b border-t border-gray-300">
                  <td className="">
                    <div className="flex items-center overflow-hidden gap-12 w-fit  ">
                      <button onClick={() => toggleWishlist(user.uid, product)}>
                        <Icon
                          icon="solar:trash-bin-2-linear"
                          width="24"
                          height="24"
                        />
                      </button>
                      <img
                        src={product.imageUrl}
                        alt=""
                        className="w-15 h-15 object-cover"
                      />
                    </div>
                  </td>
                  <td>
                    <p>{product.name}</p>
                  </td>
                  <td>{product.price}</td>
                  <td className="text-green-400">In stock</td>
                  <td><button>Select Options</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* {wishlist.length === 0 ? (
          <p>No items in wishlist</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div key={product.id} className="border p-4 rounded shadow">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="font-semibold">{product.name}</h3>
                <p>${product.price}</p>
              </div>
            ))}
          </div>
        )} */}
      </div>
    </PageLayout>
  );
}

export default Wishlist;
