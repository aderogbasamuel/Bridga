import { Icon } from '@iconify/react'
import logo from '../assets/BRIDGA.png'
import { Link } from 'react-router-dom';
type HeaderProps = {
    setCartBar: (value: boolean) => void;
};

function Header({ setCartBar }: HeaderProps) {
    return ( 
        <div>
            <div className='hidden md:flex gap-6 p-4 px-18 h-[100px] items-center justify-between border-1 border-b-gray-300'>
            <div className='h-full'>
                <img src={logo} alt="Bridga logo"  className='h-full'/>
            </div>
            <div className='w-1/2 flex'>
                <input type="text" placeholder='Search for products, categories' className=' text-15px p-3 placeholder:text-gray-500 border-1 border-gray-200 w-full'/>
                <select name="Category" id="" className='border-1 border-gray-300 text-[15px] px-2'>
                    <option value="All Categories">All Categories</option>
                </select>
                <div className='bg-[#220000] text-white h-stretch aspect-square w-auto flex items-center justify-center px-3'>
                    <Icon icon="tabler:search" height="24"  width="24"/>
                </div>
            </div>
            <div className='flex gap-3 items-center'>
                <div>
                    <Icon icon="famicons:person-outline" width="30" height="30" />
                </div>
                <Link to={"/wishlist"} className='relative'>
                    <Icon icon="si:heart-line" width="30" height="30" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#220000] text-[10px] font-medium text-white">
                    3
                  </span>
                </Link>
                 <div className='relative' onClick={()=>setCartBar(true)}>
                <Icon icon="heroicons:shopping-bag" width="30" height="30" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#220000] text-[10px] font-medium text-white">
                    3
                  </span>
                </div>
                <div className='text-[15px]'>
                    <p>Cart</p>
                    <p className='font-semibold'>#70,000.00</p>
                </div>
            </div>
        </div>
           <div className='flex md:hidden flex-col gap-3 p-4 py-2 bg-[#220000]'>
            <div className='flex items-center justify-between'>
            <div className='h-[45px]'>
                <img src={logo} alt="Bridga logo"  className='h-full'/>
            </div>
            
            <div className='flex gap-3 items-center'>
                <div className='text-white'>
                    <Icon icon="famicons:person-outline" width="30" height="30" />
                </div>
                <Link to={"/wishlist"} className='relative text-white'>
                    <Icon icon="si:heart-line" width="30" height="30" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#fff] text-[10px] font-medium text-black">
                    3
                  </span>
                </Link>
                 <div className='relative text-white' onClick={()=>setCartBar(true)}>
                <Icon icon="heroicons:shopping-bag" width="30" height="30" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#fff] text-[10px] font-medium text-black">
                    3
                  </span>
                </div>
                </div>
                </div>
                <div className='w-full flex bg-white pe-3'>
                <input type="text" placeholder='Search for products, categories' className='text-[15px] p-0 ps-6 placeholder:text-gray-500 border-1 border-gray-200 w-full'/>
                <div className='bg-[#fff] text-black h-stretch aspect-square w-auto flex items-center justify-center px-2'>
                    <Icon icon="tabler:search" height="24"  width="24"/>
                </div>
            </div>
        </div>
        </div>

     );
}

export default Header;