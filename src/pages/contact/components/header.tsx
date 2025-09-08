import { Icon } from '@iconify/react';
function ContactHeader() {
    return ( 
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3   items-center gap-2 mb-4 justify-between px-4'>
            {[
                {
                    iconName: "weui:location-filled",
                    text: "6 Oluwanifemi Faseru Close, Unity Homes Thomas Estate, Ajah, Lagos"
                },
                {
                    iconName: "ri:phone-fill",
                    text: "+234 901 234 5678"
                },
                {
                    iconName: "fa-regular:envelope-open",
                    text: "info@bridga.com"
                }].map((item, index) => (
                    <div key={index} className='flex items-center gap-2 flex-col p-4 text-center'>
                        <Icon icon={item.iconName} width="100" height="100" />
                        <p className='text-gray-600 text-[14px]'>{item.text}</p>
                    </div>
                ))
            }
        <div>
            </div>
        </div>
     );
}

export default ContactHeader;