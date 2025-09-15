import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
function PaymentPageLayout({ children, title }: { children: React.ReactNode; title: string }) {
    return ( 
        <div>
            <div className="text-center py-15 flex flex-col gap-3">
                <div className="flex justify-center text-[24px] font-semibold items-center flex-wrap">
                {["Shopping Cart", "Checkout", "Order Complete"].map((step, index) => (
                    <div key={index} className={`flex items-center ${step === title ? 'text-black' : 'text-gray-600'}`}>
                        <Link
                            to={
                                step === "Shopping Cart"
                                    ? "/cartPage"
                                    : step === "Checkout"
                                    ? "/checkout"
                                    : step === "Order Complete"
                                    ? "/order-complete"
                                    : "#"
                            }
                            className="hover:underline"
                        >
                            {step}
                        </Link>
                        {index < 2 && (
                            <Icon icon="lucide:chevron-right" width="24" height="24" className="mx-3" />
                        )}
                    </div>
                ))}
            </div></div>
            <div>{children}</div>
        </div>
     );
}

export default PaymentPageLayout;