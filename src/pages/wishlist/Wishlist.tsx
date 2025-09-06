import PageLayout from "../../components/PageLayout";
import image from "../../assets/c-joyful-heFTscwGDCA-unsplash.jpg"
import { Icon } from '@iconify/react';
function Wishlist() {
  return (
    <PageLayout title="Wishlist">
      <div className="p-18">
        <table className="w-full border-collapse">
          <thead className="uppercase border-b border-t border-gray-300">
            <tr>
              <th>Product Name</th>
              <th>unit price</th>
              <th>stock status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-t border-gray-300">
              <td className="flex overflow-hidden items-center gap-12"><Icon icon="solar:trash-bin-2-linear" width="24" height="24" /> <img src={image} alt="" className="w-15 h-15 object-cover"/><p>Car engine</p></td>
              <td>48,000.00</td>
              <td className="text-green-400">In stock</td>
            </tr>
          </tbody>
        </table>
      </div>
    </PageLayout>
  );
}

export default Wishlist;
