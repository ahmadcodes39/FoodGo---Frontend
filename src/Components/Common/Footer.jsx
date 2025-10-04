import React from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram,UtensilsCrossed } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-10">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2">
              <div className="text-orange-500 text-2xl font-bold">
                <i className="fa-solid fa-burger"></i>
              </div>
              <h2 className="text-2xl font-bold text-white flex gap-2 items-center"><span className="text-orange-500"><UtensilsCrossed/> </span>FoodExpress</h2>
            </div>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              Your trusted partner for fast and delicious food delivery
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition">Home</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Features</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Restaurants</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">FAQs</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-orange-500" />
                support@foodexpress.com
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-orange-500" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-orange-500" />
                123 Food Street, NY 10001
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-6 text-sm text-gray-400">
          <p>© 2025 FoodExpress. All rights reserved.</p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition">
              <Facebook size={16} />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition">
              <Twitter size={16} />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition">
              <Instagram size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
