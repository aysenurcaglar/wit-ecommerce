import {
  Facebook,
  Instagram,
  Twitter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import React, { useState, useCallback } from "react";

const footerSections = {
  "Company Info": [
    { label: "About Us", href: "#" },
    { label: "Career", href: "#" },
    { label: "We are hiring", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Disclaimer", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
  Features: [
    { label: "Business Marketing", href: "#" },
    { label: "User Analytics", href: "#" },
    { label: "Live Chat", href: "#" },
    { label: "Unlimited Support", href: "#" },
  ],
  Resources: [
    { label: "iOS & Android", href: "#" },
    { label: "Watch a Demo", href: "#" },
    { label: "Customers", href: "#" },
    { label: "API Documentation", href: "#" },
  ],
};

function Footer() {
  const [expanded, setExpanded] = useState({});

  const toggleSection = useCallback((section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  }, []);

  return (
    <footer className=" py-4">
      <div className="container max-w-[85vw] md:max-w-75vw mx-auto">
        {/* Logo and Social Media Icons */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 pb-6">
          <h1 className="text-2xl font-bold text-text-color mb-4 md:mb-0">
            Witty Store
          </h1>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 py-8 gap-4 xl:gap-0 text-left">
          {Object.entries(footerSections).map(([title, links]) => (
            <div key={title}>
              <button
                className="flex justify-between items-center w-full text-lg text-text-color font-bold mt-4 xl:hidden"
                onClick={() => toggleSection(title)}
              >
                {title}
                {expanded[title] ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              <h3 className="hidden xl:block text-lg text-text-color font-bold mt-4">
                {title}
              </h3>
              <ul
                className={`mt-4 space-y-2 font-semibold text-light-gray overflow-hidden transition-all duration-300 ease-in-out ${
                  expanded[title] ? "max-h-40" : "max-h-0 xl:max-h-none"
                }`}
              >
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hover:underline">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="max-w-sm">
            <h3 className="text-lg text-text-color font-bold mt-4">
              Get in Touch
            </h3>
            <div className="flex flex-row xl:flex-col mt-4">
              <Input placeholder="Your email" className="flex-2 xl:w-auto" />

              <Button className="flex-1 xl:w-1/2 xl:ml-auto p-2">
                Subscribe
              </Button>
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
