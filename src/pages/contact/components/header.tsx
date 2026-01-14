import { Icon } from '@iconify/react';
function ContactHeader() {
    return ( 
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3   items-center gap-2 mb-4 justify-between px-4'>
            {[
                {
                    iconName: "weui:location-filled",
                    text: "university of lagos, akoka, yaba, lagos"
                },
                {
                    iconName: "ri:phone-fill",
                    text: "+234 704 613 2755"
                },
                {
                    iconName: "fa-regular:envelope-open",
                    text: "info@escrow.com"
                }].map((item, index) => (
                    <div key={index} className='flex items-center gap-2 flex-col p-4 text-center'>
                        <Icon icon={item.iconName} width="50" height="50" />
                        <p className='text-black text-[14px]'>{item.text}</p>
                    </div>
                ))
            }
        <div>
            </div>
        </div>
     );
}

export default ContactHeader;