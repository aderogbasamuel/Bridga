import { Link } from "react-router-dom";
function PageLayout({ children, title }: { children: React.ReactNode; title: string }) {
    return ( 
        <div>
            <div className="text-center py-10 flex flex-col gap-3 bg-gray-100">
                <h1 className="font-bold text-[60px] text-[#333]">{title}</h1>
                <p className="text-gray-500 text-[14px]">
                    <Link to="/" className="text-[#333]">Home</Link>/{title}
                </p>
            </div>
            <div>{children}</div>
        </div>
     );
}

export default PageLayout;