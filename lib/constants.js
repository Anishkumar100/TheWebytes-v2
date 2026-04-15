import { 
  Code2, 
  ShoppingCart, 
  FileCode,
  Palette, 
  Smartphone, 
  TrendingUp, 
  Boxes, 
  Server, 
  Rocket, 
  Globe 
} from 'lucide-react';

export const SERVICES = [
  {
    id: 'web-development',
    title: 'Web Development',
    slug: 'web-development',
    icon: Code2,
    shortDescription: 'Custom websites, landing pages, and progressive web apps built with modern technologies.',
    description: 'We create stunning, high-performance websites tailored to your business needs. From simple landing pages to complex web applications, our team delivers responsive, SEO-optimized solutions.',
    features: [
      'Custom Website Development',
      'Landing Page Design',
      'Progressive Web Apps (PWA)',
      'Responsive Design',
      'Performance Optimization',
      'SEO Best Practices'
    ],
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Node.js', 'TypeScript'],
  },
  {
    id: 'ecommerce-development',
    title: 'E-commerce Development',
    slug: 'ecommerce-development',
    icon: ShoppingCart,
    shortDescription: 'Full-featured online stores with secure payment integration and inventory management.',
    description: 'Launch your online store with our comprehensive e-commerce solutions. We integrate payment gateways, inventory management, and provide a seamless shopping experience.',
    features: [
      'Custom E-commerce Platforms',
      'Payment Gateway Integration',
      'Inventory Management',
      'Shopping Cart & Checkout',
      'Product Catalog Management',
      'Order Tracking System'
    ],
    technologies: ['Shopify', 'WooCommerce'],
  },
  {
    id: 'wordpress-development',
    title: 'WordPress Development',
    slug: 'wordpress-development',
    icon: FileCode,
    shortDescription: 'Custom WordPress themes, plugins, and WooCommerce solutions for your business.',
    description: 'Expert WordPress development services including custom themes, plugin development, and WooCommerce integration for powerful content management.',
    features: [
      'Custom Theme Development',
      'Plugin Development',
      'WooCommerce Setup',
      'WordPress Migration',
      'Speed Optimization',
      'Security Hardening'
    ],
    technologies: ['WordPress', 'PHP', 'WooCommerce', 'Elementor'],
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    icon: Palette,
    shortDescription: 'Beautiful, user-centered interfaces with high-fidelity prototyping and user research.',
    description: 'Create delightful user experiences with our design services. We conduct user research, create wireframes, and deliver pixel-perfect designs.',
    features: [
      'User Research & Analysis',
      'Wireframing & Prototyping',
      'High-Fidelity UI Design',
      'Design Systems',
      'Usability Testing',
      'Responsive Design'
    ],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Framer'],
  },
  {
    id: 'app-development',
    title: 'App Development',
    slug: 'app-development',
    icon: Smartphone,
    shortDescription: 'Native and cross-platform mobile applications for iOS and Android.',
    description: 'Build powerful mobile applications for iOS and Android. We create native and cross-platform apps that deliver exceptional performance.',
    features: [
      'iOS App Development',
      'Android App Development',
      'Cross-Platform Development',
      'App Store Optimization',
      'Push Notifications',
      'Offline Functionality'
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    icon: TrendingUp,
    shortDescription: 'SEO, social media marketing, and content strategy to grow your online presence.',
    description: 'Boost your online visibility with our digital marketing services. We offer SEO, social media management, and content marketing strategies.',
    features: [
      'Search Engine Optimization',
      'Social Media Marketing',
      'Content Strategy',
      'Google Ads Management',
      'Email Marketing',
      'Analytics & Reporting'
    ],
    technologies: ['Facebook Marketing', 'SEMrush', 'Google Ads', 'HubSpot'],
  },
  {
    id: 'custom-development',
    title: 'Custom Development',
    slug: 'custom-development',
    icon: Boxes,
    shortDescription: 'Bespoke SaaS platforms, CRM systems, and API development for unique business needs.',
    description: 'Need something unique? We build custom software solutions including SaaS platforms, CRM systems, and custom APIs tailored to your business.',
    features: [
      'SaaS Platform Development',
      'CRM System Development',
      'API Development',
      'Third-party Integrations',
      'Database Design',
      'Microservices Architecture'
    ],
    technologies: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'],
  },
  {
    id: 'server-management',
    title: 'Server Management',
    slug: 'server-management',
    icon: Server,
    shortDescription: '24/7 server monitoring, security, and performance optimization services.',
    description: 'Keep your infrastructure running smoothly with 24/7 server management, security monitoring, and performance optimization.',
    features: [
      '24/7 Server Monitoring',
      'Security Management',
      'Performance Optimization',
      'Backup & Recovery',
      'Load Balancing',
      'SSL Certificate Management'
    ],
    technologies: ['AWS','Azure','Vercel', 'Google Cloud', 'Netlify', 'Docker'],
  },
  {
    id: 'deployment',
    title: 'Deployment Services',
    slug: 'deployment',
    icon: Rocket,
    shortDescription: 'CI/CD pipelines, cloud deployment, and automated deployment solutions.',
    description: 'Streamline your deployment process with CI/CD pipelines, automated testing, and cloud deployment strategies.',
    features: [
      'CI/CD Pipeline Setup',
      'Cloud Deployment',
      'Automated Testing',
      'Zero-Downtime Deployment',
      'Rollback Strategies',
      'Environment Management'
    ],
    technologies: ['GitHub Actions', 'Vercel', 'AWS', 'Docker','Cpanel', ],
  },
  {
    id: 'web-hosting',
    title: 'Web Hosting',
    slug: 'web-hosting',
    icon: Globe,
    shortDescription: 'Reliable managed hosting with SSL certificates and domain management.',
    description: 'Secure, fast, and reliable web hosting services with SSL certificates, daily backups, and expert support.',
    features: [
      'Managed Hosting',
      'SSL Certificates',
      'Domain Management',
      'Daily Backups',
      'DDoS Protection',
      '99.9% Uptime Guarantee'
    ],
    technologies: ['cPanel', 'Cloudflare', 'LetsEncrypt', 'Nginx'],
  }
];

export const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export const COMPANY_INFO = {
  name: 'TheWebytes',
  tagline: 'Premium Software Development & Digital Agency',
  email: 'support@thewebytes.com',
  phone: '+91 98765 43210',
  address: 'Chennai, Tamil Nadu, India',
  social: {
    twitter: 'https://twitter.com/thewebytes',
    linkedin: 'https://linkedin.com/company/thewebytes',
    github: 'https://github.com/thewebytes',
    instagram: 'https://instagram.com/thewebytes'
  }
};
