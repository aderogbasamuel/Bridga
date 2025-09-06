import { Icon } from '@iconify/react';
function ContactHeader() {
    return ( 
        <div className='flex items-center gap-2 mb-4 justify-between'>
            {[
                {
                    icon: "weui:location-filled",
                    text: "6 Oluwanifemi Faseru Close, Unity Homes Thomas Estate, Ajah, Lagos"
                },
                {
                    icon: "ri:phone-fill",
                    text: "+234 901 234 5678"
                },
                {
                    icon: "fa-regular:envelope-open",
                    text: "info@bridga.com"
                }
            ]}
        <div>
                <Icon icon="weui:location-filled" width="24" height="24" />
                <Icon icon="ri:phone-fill" width="24" height="24" />
                <Icon icon="fa-regular:envelope-open" width="512" height="512" />
            </div>
        </div>
     );
}

export default ContactHeader;