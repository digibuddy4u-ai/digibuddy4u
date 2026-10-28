export const BRAND = {
  name: 'DigiBuddy4U',
  tagline: 'Your Digital Growth Partner',
  email: 'info@digibuddy4u.com',
  phone: '+91 63524 78028',
  phoneRaw: '916352478028',
  address: 'India',
  whatsappUrl: 'https://wa.me/916352478028?text=Hi%20DigiBuddy4U%2C%20I%20would%20like%20to%20discuss%20growing%20my%20brand%20online.',
  socials: {
    instagram: 'https://www.instagram.com/digibuddy4u?rpxt=ODVrbzFxMjZpcGNr',
    facebook: 'https://www.facebook.com/share/1CGUA5pHRb/',
    linkedin: 'https://www.linkedin.com/posts/digibuddy4u_digitalmarketingagency-socialmediamarketing-activity-7519374752243937280-9RcQ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE-SeRcBvIta6WWlBoXDZ4M39QcrlV9I6Go',
    whatsapp: 'https://wa.me/916352478028',
  },
  colors: {
    deepNavy: '#071A38',
    electricBlue: '#0866F5',
    cyan: '#18D5E8',
    yellow: '#FFC629',
    white: '#FFFFFF',
    lightBg: '#F5F8FC',
    darkText: '#172033',
  },
};

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services', dropdownType: 'services' },
  { name: 'Packages', path: '/packages' },
  {
    name: 'Our Work',
    path: '/portfolio',
    dropdownType: 'work',
    children: [
      {
        name: 'Portfolio',
        path: '/portfolio',
        description: 'Explore our client projects, visual campaigns & creative deliverables.',
        icon: 'Layers',
      },
      {
        name: 'Case Studies',
        path: '/case-studies',
        description: 'In-depth analysis of marketing & execution strategy (Featuring RotiWala).',
        icon: 'FileText',
      },
    ],
  },
  { name: 'Contact Us', path: '/contact' },
];
