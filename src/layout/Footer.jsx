import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

function Footer() {
  return (
    <footer className=" py-4">
      <div className="container max-w-[85vw] md:max-w-75vw mx-auto">
        {/* Logo and Social Media Icons */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 pb-6">
          <h1 className="text-2xl font-bold text-text-color mb-4 md:mb-0">Witty Store</h1>
          <div className="flex space-x-4 text-primary-color">
            <a href="#" aria-label="Facebook">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Links and Newsletter Signup */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 py-8 text-left">
          {/* Company Info */}
          <div>
            <h3 className="text-lg text-text-color font-bold mt-4">Company Info</h3>
            <ul className="mt-4 space-y-2 font-semibold text-light-gray">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Career</a></li>
              <li><a href="#" className="hover:underline">We are hiring</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg text-text-color font-bold mt-4">Legal</h3>
            <ul className="mt-4 space-y-2 font-semibold text-light-gray">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
              <li><a href="#" className="hover:underline">Disclaimer</a></li>
              <li><a href="#" className="hover:underline">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg text-text-color font-bold mt-4">Features</h3>
            <ul className="mt-4 space-y-2 font-semibold text-light-gray">
              <li><a href="#" className="hover:underline">Business Marketing</a></li>
              <li><a href="#" className="hover:underline">User Analytics</a></li>
              <li><a href="#" className="hover:underline">Live Chat</a></li>
              <li><a href="#" className="hover:underline">Unlimited Support</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg text-text-color font-bold mt-4">Resources</h3>
            <ul className="mt-4 space-y-2 font-semibold text-light-gray">
              <li><a href="#" className="hover:underline">iOS & Android</a></li>
              <li><a href="#" className="hover:underline">Watch a Demo</a></li>
              <li><a href="#" className="hover:underline">Customers</a></li>
              <li><a href="#" className="hover:underline">API Documentation</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg text-text-color font-bold mt-4">Get in Touch</h3>
            <div className="mt-4 flex flex-row lg:flex-col">
              <Input placeholder="Your email" className="flex-2 lg:w-auto" />
              <Button className="flex-1 md:w-auto p-2 md:justify-end">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-left text-light-gray font-semibold text-sm mt-6">
          &copy; {new Date().getFullYear()} Witty Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
