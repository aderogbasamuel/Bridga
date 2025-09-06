import { Icon } from "@iconify/react";
function CartBar({
  cartBar,
  setCartBar,
}: {
  cartBar: boolean;
  setCartBar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="relative">
      {cartBar && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setCartBar(false)} // closes on click
        ></div>
      )}
      <div
        className={`fixed  transform transition-transform duration-300 z-50 w-[300px] bg-white flex flex-col top-0 right-0 h-full ${
          cartBar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-black text-center py-3 px-2">
          <h2 className="uppercase text-white font-bold text-[18px] flex items-center text-center relative justify-center">
            <button onClick={() => setCartBar(false)}>
              <Icon
                icon="tabler:chevron-left"
                width="24"
                height="24"
                className="absolute z-20 left-0 top-0"
              />
            </button>{" "}
            MY cart
          </h2>
        </div>
        <div className="h-full">
          <h1>hello</h1>
        </div>
        <div className="flex flex-col justify-end p-4 border-t-2 border-[#555] gap-3">
          <p className="text-[18px] font-bold text-[#555] flex uppercase justify-between">
            subtotal: <span>70,000.00</span>
          </p>
          <button className="uppercase bg-black text-white text-[15px] py-3 w-full font-bold">
            View Cart
          </button>
          <button className="uppercase bg-black text-white text-[15px] py-3 w-full font-bold">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartBar;
