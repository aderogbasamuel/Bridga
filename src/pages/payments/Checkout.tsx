import PaymentPageLayout from "../../components/PaymentPageLayout";
import { Link as LInk } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
function CheckoutPage() {
  return (
    <PaymentPageLayout title="Checkout">
      <div className="p-18 grid grid-cols-3 gap-10">
        <div className="col-span-2">
          <form action="" className="">
            <h3 className="text-[17px] text-[#333] font-bold">
              Contact Information
            </h3>
            <p className="text-[12px] text-[#333]">
              We'll use this email to send details and updates about your order
            </p>
            <input
              type="text"
              placeholder="Email address"
              className="w-full border border-[#333] p-2 rounded-[5px] mt-4 text-[14px]"
            />
            <p className="text-[12px] text-[#333] pt-2">
              You are currently checking out as a guest
            </p>
            <div className="flex items-center mt-3 gap-3">
              <input type="checkbox" id="create-acct" />
              <label htmlFor="create-acct" className="text-[12px] font-bold">
                {" "}
                Create an accouunt with bridga
              </label>
            </div>
            <h3 className="text-[17px] text-[#333] font-bold mt-12">
              Shipping address
            </h3>
            <p className="text-[12px] text-[#333]">
              Enter the address where you want your order delivered
            </p>
            <div className="grid gap-3 grid-cols-2">
              <input
                type="text"
                placeholder="FIrst Name"
                className="border border-[#333] p-2 rounded-[5px] mt-4 text-[14px]"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border border-[#333] p-2 rounded-[5px] mt-4 text-[14px]"
              />
              <input
                type="text"
                placeholder="Adress"
                className="col-span-2 border border-[#333] p-2 rounded-[5px] mt-4 text-[14px]"
              />
              <input
                type="text"
                placeholder="City"
                className="col-span-1 border border-[#333] p-2 rounded-[5px] mt-4 text-[14px]"
              />
              <select
                name="state"
                id="state"
                className="col-span-1 border border-[#333] p-2 rounded-[5px] mt-4 text-[14px]"
              >
                <option value="state">State</option>
                <option value="lagos">Lagos</option>
                <option value="abuja">Abuja</option>
                <option value="rivers">Rivers</option>
                <option value="kano">Kano</option>
                          </select>
                          <input
                type="text"
                placeholder="Phone (optional"
                className="col-span-2 border border-[#333] p-2 rounded-[5px] mt-4 text-[14px]"
                          />

                         <div className="flex items-center mt-3 gap-3">
              <input type="checkbox" id="create-acct" checked/>
              <label htmlFor="create-acct" className="text-[12px] font-bold">
                {" "}
                Use same address for billing
              </label>
                          </div> 
                          
                      </div>
                      <h3 className="text-[17px] text-[#333] font-bold mt-12">
              Shipping options
                      </h3>
                      <div                 className="border border-[#333] p-2 rounded-[5px] mt-4 text-[14px] gap-3 flex items-center">
                      <input
                          type="radio" name="shipping" id="standard" checked />
                      <label htmlFor="standard" className="text-[14px] font-bold">
                Lagos
              </label>
                      </div>
                      <div className="flex items-center mt-3 gap-3 pb-12 border-b-1 border-[#555]">
              <input type="checkbox" id="create-acct" />
              <label htmlFor="create-acct" className="text-[12px] font-bold">
                {" "}
                Add a note to your order (optional)
              </label>
                      </div>
                      <p className="text-[14px] text-[#333] my-12">By proceeding with your purchase you agree to our Terms and Conditions and Privacy Policy</p>
                      <div className="grid grid-cols-2 items-center mt-3">
                          <LInk to="/cart" className="flex items-center gap-3"><Icon icon="garden:arrow-left-stroke-16" width="16" height="16" />Return to cart</LInk>
                          <button className="bg-black p-4 text-white  uppercase font-bold text-[14px] w-full">Place Order</button>
                      </div>
          </form>
        </div>
      </div>
    </PaymentPageLayout>
  );
}

export default CheckoutPage;
