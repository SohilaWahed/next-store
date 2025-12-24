import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        
        {/* Brand */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Shopmark</h1>
          <p className="text-sm">
            Your one-stop shop for amazing products. 
            Quality, trust, and fast delivery guaranteed.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/products" className="hover:underline">Products</Link></li>
            <li><Link href="/categories" className="hover:underline">Categories</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Customer Service</h2>
          <ul className="space-y-2">
            <li><p  className="hover:underline">FAQ</p></li>
            <li><p  className="hover:underline">Shipping & Returns</p></li>
            <li><p  className="hover:underline">Privacy Policy</p></li>
            <li><p className="hover:underline">Terms & Conditions</p></li>
          </ul> 
          </div>
            {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Follow Us</h2>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-white"><Facebook/></Link>
            <Link href="#" className="hover:text-white"><Twitter /></Link>
            <Link href="#" className="hover:text-white"><Instagram /></Link>
            <Link href="#" className="hover:text-white"><Youtube /></Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © Copyright Shopmaek. All rights reserved.
      </div>
    </footer>
  );
}
