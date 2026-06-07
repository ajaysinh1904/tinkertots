import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';

export const Icons = () => {
    const socialLinks = [
        {
            name: 'Facebook',
            url: 'https://facebook.com',
            icon: <FaFacebookF size={14} />,
            color: 'hover:bg-[#1877F2]',
            bg: 'bg-[#1877F2]/20'
        },
        {
            name: 'Instagram',
            url: 'https://instagram.com',
            icon: <FaInstagram size={14} />,
            color: 'hover:bg-gradient-to-br hover:from-[#F58529] hover:via-[#E1306C] hover:to-[#833AB4]',
            bg: 'bg-[#E1306C]/20'
        },
        {
            name: 'YouTube',
            url: 'https://youtube.com',
            icon: <FaYoutube size={14} />,
            color: 'hover:bg-[#FF0000]',
            bg: 'bg-[#FF0000]/20'
        },
        {
            name: 'LinkedIn',
            url: 'https://linkedin.com',
            icon: <FaLinkedinIn size={14} />,
            color: 'hover:bg-[#0077B5]',
            bg: 'bg-[#0077B5]/20'
        },
    ];
    return (<div className="flex space-x-2">
        {socialLinks.map((social) => (
            <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className={`w-8 h-8 rounded-full border border-white/20 
                    flex items-center justify-center text-white 
                    transition-all duration-300 hover:scale-110 
                    hover:border-transparent hover:text-white
                    ${social.bg} ${social.color}`}>

                {social.icon}
            </a>
        ))}
    </div>)
}