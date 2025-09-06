import { Icon } from '@iconify/react';
function ContactHeader() {
    return ( 
        <div className='flex items-center gap-2 mb-4 justify-between'>
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
                    <div key={index} className='flex items-center gap-2'>
                        <Icon icon={item.iconName} width="24" height="24" />
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