import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Feature {
  title: string;
  description: string;
}

interface Package {
  title: string;
  price: string;
  period: string;
  description: string;
  oldPrice:string;
  features: Feature[];
}

@Component({
  selector: 'app-pricing',
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css'],
})
export class PricingComponent {
  packages: Package[] = [
    {
      title: 'Startup Website Bundle ',
      oldPrice: '$479',  // Old price
      price: '$179',
      period: '/month',
      description: 'Get online fast with a sleek, professional website! Perfect for startups and small businesses looking to establish a strong digital presence.',
      features: [
        { title: 'Custom 3-Page Website', description: 'Designed for impact and conversion' },
        { title: '3 Eye-Catching Banner Creations', description: 'Enhance your brand identity' },
        { title: '5 Premium Stock Images', description: 'High-quality visuals to engage visitors' },
        { title: 'Dynamic jQuery Slider', description: 'Interactive elements for a modern feel' },
        { title: 'SEO-Optimized Sitemap (FREE)', description: 'Boosts search engine visibility' },
        { title: 'W3C-Compliant, Clean HTML Code', description: 'Faster loading and better performance' },
        { title: 'Super-Fast Delivery (48-72 Hours)', description: 'Get your website up and running quickly' },
        { title: 'Branded Social Media Graphics (Facebook, Twitter, YouTube)', description: 'Maintain a cohesive brand image' },
        { title: '100% Satisfaction Guarantee', description: 'We’re not happy unless you are!' },
        { title: 'Original & Exclusive Design Guarantee', description: 'Stand out from the crowd' },
        { title: 'Risk-Free Full Refund Policy (Terms Apply)', description: 'Your investment is protected' },
        { title: 'Mobile-Friendly Upgrade', description: '$100 – Ensure a seamless experience on all devices' },
        { title: 'CMS Add-On', description: '$100 – Easily manage and update your site without coding' },
      ],
    },
    {
      title: 'Elite Corporate Website Bundle ',
      price: '$379',
      period: '/month',
      description: 'Designed for growing businesses ready to dominate their industry. A powerful online presence tailored for success!',
      oldPrice: '$479',  // Old price

      features: [
        { title: 'Custom 5-Page Website', description: 'Engaging, high-performance design' },
        { title: 'CMS / Admin Dashboard Included', description: 'Take full control of your content' },
        { title: '8 High-Quality Stock Photos', description: 'Professional imagery for a polished look' },
        { title: '5 Custom Banner Designs', description: 'Elevate your brand’s visual appeal' },
        { title: 'Interactive jQuery Slider', description: 'A sleek, modern touch for engagement' },
        { title: 'SEO-Optimized Sitemap (FREE)', description: 'Helps boost search rankings' },
        { title: 'W3C-Compliant, Standard HTML Code', description: 'Ensures fast and efficient performance' },
        { title: 'Lightning-Fast Turnaround (48-72 Hours)', description: 'We deliver quality at speed' },
        { title: 'Branded Social Media Covers (Facebook, Twitter, YouTube)', description: 'Strengthen your brand identity' },
        { title: 'Full Website Deployment', description: 'We handle the setup so you don’t have to' },
        { title: 'Guaranteed 100% Satisfaction', description: 'We go above and beyond to exceed expectations' },
        { title: 'Exclusive, Custom Design Assurance', description: 'No templates, just original designs' },
        { title: 'Risk-Free Money-Back Guarantee (Terms Apply)', description: 'Your satisfaction is our priority' },
        { title: 'Mobile-Friendly Upgrade', description: '$100 – Optimized for a seamless experience on any device' },
      ],
    },
    {
      title: 'E-Store Web Design bundle',
      oldPrice: '$479',  // Old price
      price: '$1279 ',
      period: '/month',
      description: 'Your online store, built for conversions and success! Perfect for businesses looking to sell products and generate revenue online.',
      features: [
        { title: 'Up to 15 Custom Web Pages', description: 'A robust, full-scale e-commerce platform' },
        { title: 'Creative & Interactive Design', description: 'Engaging layouts that drive sales' },
        { title: 'Integrated Content Management System (CMS)', description: 'Update products & content with ease' },
        { title: 'Mobile-Optimized for All Devices', description: 'Seamless shopping experience on any screen' },
        { title: 'Effortless Product Search Feature', description: 'Helps customers find what they need fast' },
        { title: 'Customer Ratings & Reviews Section', description: 'Build trust and credibility' },
        { title: 'Supports Up to 100 Products', description: 'Expand as your business grows' },
        { title: 'Unlimited Product Categories & Filters', description: 'Easy organization for a better shopping experience' },
        { title: 'Seamless Shopping Cart & Secure Checkout', description: 'Hassle-free transactions' },
        { title: 'Sales & Inventory Monitoring Tools', description: 'Keep track of stock and sales effortlessly' },
        { title: 'Dynamic jQuery Slider', description: 'Visually captivating storefront' },
        { title: 'Complimentary SEO-Optimized Sitemap', description: 'Increases visibility on Google' },
        { title: 'Free 1-Year Domain & Hosting', description: 'Everything you need to get started' },
        { title: 'Professional Business Email Accounts', description: 'Look professional and credible' },
        { title: 'Branded Social Media Designs', description: 'Cohesive branding across platforms' },
        { title: 'Full Website Setup & Launch', description: 'We handle everything for you!' },
        { title: '100% Ownership Rights', description: 'Your store, your rules' },
        { title: 'Risk-Free Money-Back Guarantee (T&C Apply)', description: 'We stand behind our work' },
      ],
    },
    {
      title: 'High-End Business Website Solution ',
      oldPrice: '$479',  // Old price
      price: '$1299',
      period: '/month',
      description: 'A premium website for brands that mean business! Crafted for businesses needing advanced features and a stunning online presence.',
      features: [
        { title: '8-10 Page Custom Website', description: 'A tailored experience to impress your audience' },
        { title: 'Engaging, High-Impact Design', description: 'Designed for conversion and user experience' },
        { title: 'Secure Online Payment System', description: 'Safe and hassle-free transactions' },
        { title: 'Integrated Online Booking Feature', description: 'Perfect for service-based businesses' },
        { title: 'User-Friendly CMS', description: 'Easily update and manage content' },
        { title: 'Fully Responsive & Mobile-Optimized', description: 'Looks perfect on every device' },
        { title: 'Custom Inquiry & Lead Generation Forms', description: 'Capture and convert leads effortlessly' },
        { title: 'Eye-Catching Hover Effects', description: 'Modern design enhancements' },
        { title: 'Integrated Newsletter Subscription', description: 'Grow your email list with ease' },
        { title: 'Live Newsfeed Display', description: 'Keep your audience engaged with fresh updates' },
        { title: 'Seamless Social Media Connectivity', description: 'Connect and interact effortlessly' },
        { title: 'SEO-Optimized & Search Engine Submission', description: 'Improve online discoverability' },
        { title: 'Branded Social Media Cover Designs', description: 'Strengthen your digital identity' },
        { title: 'Complete Website Setup & Deployment', description: 'We take care of everything' },
        { title: '100% Custom Design Guarantee', description: 'Unique, one-of-a-kind design' },
        { title: 'Risk-Free Money-Back Guarantee', description: 'Your satisfaction is our priority' },
      ],
    },
    {
      title: 'Advanced E-Commerce Website Package – Custom Pricing',
      oldPrice: '$479/month',  // Old price
      price: 'custom pricing',
      period: '',
      description: 'The ultimate e-commerce solution for brands that want to scale! A high-performance, sales-driven online store with unlimited possibilities.',
      features: [
        { title: 'Tailor-Made, High-Quality Website', description: 'Custom-built for your brand' },
        { title: 'Unlimited Pages & Product Listings', description: 'No restrictions on growth' },
        { title: 'Advanced Product Search & Filtering', description: 'Enhance user experience' },
        { title: 'Seamless Online Payment Processing', description: 'Secure and user-friendly' },
        { title: 'Smart Inventory & Sales Tracking', description: 'Keep your business organized' },
        { title: 'Dynamic jQuery Slider & Hover Effects', description: 'Modern, engaging visuals' },
        { title: '10 Custom Banners & 10 Stock Images', description: 'High-quality branding elements' },
        { title: 'Unlimited Revisions', description: 'We refine until you’re 100% satisfied' },
        { title: 'Multi-Language Support', description: 'Expand to international markets' },
        { title: 'Custom Online Forms & Newsletter Signups', description: 'Grow your leads effortlessly' },
        { title: 'Built-in Search Function', description: 'Easy navigation for customers' },
        { title: 'Social Media Feed Integration (Optional)', description: 'Keep customers engaged' },
        { title: 'Mobile-Optimized & Fully Responsive', description: 'Sell on any device, anywhere' },
        { title: '1-Year Free Hosting & Domain', description: 'Everything you need in one package' },
        { title: 'SEO-Optimized Sitemap & Google Submission', description: 'Improve search rankings' },
        { title: 'Complete Website Launch & Personalized Support', description: 'We make success easy' },
        { title: '100% Ownership & Control', description: 'It’s your store, we just build it!' },
        { title: 'Guaranteed Satisfaction & Risk-Free Money-Back Policy', description: 'Your investment is safe with us' },
      ],
    },
    {
      title: 'Silver Website Package',
      oldPrice: '$479',  // Old price
      price: '$1599',
      period: '/month',
      description: 'A high-performance website tailored for businesses looking to elevate their online presence. Get a sleek, custom-built, and feature-packed website designed to impress and convert.',
      features: [
        { title: '15 to 20 Custom Pages', description: 'Designed to showcase your business professionally' },
        { title: '100% Ownership Rights', description: 'Your website, your control' },
        { title: '100% Satisfaction Guarantee', description: 'We’re not happy until you are' },
        { title: '100% Unique Design Guarantee', description: 'A one-of-a-kind design, built from scratch' },
        { title: '100% Money-Back Guarantee', description: 'Risk-free investment (Terms Apply)' },
        { title: 'Advanced Content Management System (CMS)', description: 'Easily update content anytime' },
        { title: 'Complete Deployment', description: 'We handle everything from development to launch' },
        { title: 'Complete W3C Certified HTML', description: 'Clean, efficient coding for faster loading' },
        { title: 'Search Engine Optimized Website', description: 'Boosts your visibility on search engines' },
        { title: 'Responsive, Mobile-Friendly Design', description: 'Looks great on all devices' },
        { title: 'Complete Social Media Integration', description: 'Seamless connections with your social platforms' },
        { title: 'Online Payment Integration', description: 'Support for secure online transactions' },
        { title: 'Google Analytics Setup', description: 'Track and analyze your website performance' },
        { title: 'Live Chat Feature', description: 'Engage with customers in real-time' },
        { title: 'Complete Content Creation Service', description: 'We provide high-quality content for your website' },
        { title: 'Custom Branding Package', description: 'Tailored to your brand identity' },
        { title: '1-Year Hosting & Domain Included', description: 'Get started with everything you need' },
        { title: 'Risk-Free Full Refund Policy (Terms Apply)', description: 'We stand behind our work' },
      ],
    },

    {
      title: 'Interactive Web Portal',
      price: '$4999',
      oldPrice: '$479',  // Old price
      period: '/month',
      description: 'Description for interactive web portal',
      features: [
        { title: '15 to 20 Custom Pages', description: 'Designed to showcase your business professionally' },
        { title: '100% Ownership Rights', description: 'Your website, your control' },
        { title: '100% Satisfaction Guarantee', description: 'We’re not happy until you are' },
        { title: '100% Unique Design Guarantee', description: 'A one-of-a-kind design, built from scratch' },
        { title: '100% Money-Back Guarantee', description: 'Risk-free investment (Terms Apply)' },
        { title: 'Advanced Content Management System (CMS)', description: 'Easily update content anytime' },
        { title: 'Complete Deployment', description: 'We handle everything from development to launch' },
        { title: 'Complete W3C Certified HTML', description: 'Clean, efficient coding for faster loading' },
        { title: 'Search Engine Optimized Website', description: 'Boosts your visibility on search engines' },
        { title: 'Responsive, Mobile-Friendly Design', description: 'Looks great on all devices' },
        { title: 'Complete Social Media Integration', description: 'Seamless connections with your social platforms' },
        { title: 'Online Payment Integration', description: 'Support for secure online transactions' },
        { title: 'Google Analytics Setup', description: 'Track and analyze your website performance' },
        { title: 'Live Chat Feature', description: 'Engage with customers in real-time' },
        { title: 'Complete Content Creation Service', description: 'We provide high-quality content for your website' },
        { title: 'Custom Branding Package', description: 'Tailored to your brand identity' },
        { title: '1-Year Hosting & Domain Included', description: 'Get started with everything you need' },
        { title: 'Risk-Free Full Refund Policy (Terms Apply)', description: 'We stand behind our work' },
      ],
    },
    {
      title: 'Interactive E-Commerce',
      price: '$6999',
      oldPrice:'$12999',
      period: '/month',
      description: 'Description for interactive e-commerce',
      features: [
        { title: '15 to 20 Custom Pages', description: 'Designed to showcase your business professionally' },
        { title: '100% Ownership Rights', description: 'Your website, your control' },
        { title: '100% Satisfaction Guarantee', description: 'We’re not happy until you are' },
        { title: '100% Unique Design Guarantee', description: 'A one-of-a-kind design, built from scratch' },
        { title: '100% Money-Back Guarantee', description: 'Risk-free investment (Terms Apply)' },
        { title: 'Advanced Content Management System (CMS)', description: 'Easily update content anytime' },
        { title: 'Complete Deployment', description: 'We handle everything from development to launch' },
        { title: 'Complete W3C Certified HTML', description: 'Clean, efficient coding for faster loading' },
        { title: 'Search Engine Optimized Website', description: 'Boosts your visibility on search engines' },
        { title: 'Responsive, Mobile-Friendly Design', description: 'Looks great on all devices' },
        { title: 'Complete Social Media Integration', description: 'Seamless connections with your social platforms' },
        { title: 'Online Payment Integration', description: 'Support for secure online transactions' },
        { title: 'Google Analytics Setup', description: 'Track and analyze your website performance' },
        { title: 'Live Chat Feature', description: 'Engage with customers in real-time' },
        { title: 'Complete Content Creation Service', description: 'We provide high-quality content for your website' },
        { title: 'Custom Branding Package', description: 'Tailored to your brand identity' },
        { title: '1-Year Hosting & Domain Included', description: 'Get started with everything you need' },
        { title: 'Risk-Free Full Refund Policy (Terms Apply)', description: 'We stand behind our work' },
      ],
    },
  ];


}
