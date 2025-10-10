import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-sky-950 text-white py-10 font-montserrat mt-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* Company Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4">दिगंबर जैन</h3>
            <p className="text-sm leading-relaxed mt-10">
              अहिंसा परमो धर्म की जय! <br />
              जिओ और जीने दो!! <br />
              ये जैन धर्म के मुख्य सूत्र हैं।
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4">कनेक्ट</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:underline">होम</Link></li>
              <li><Link to="/directory" className="hover:underline">डायरेक्टरी</Link></li>
              <li><Link to="/granth" className="hover:underline">ग्रन्थ</Link></li>
              <li><Link to="/mandir" className="hover:underline">मंदिर</Link></li>
              <li><Link to="/contact" className="hover:underline">संपर्क</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start space-y-6">
           <h3 className="text-xl font-semibold mb-4 ml-3">संपर्क</h3>
            <div className="w-full rounded-xl p-4 text-center md:text-left">
              <h2 className="text-sm font-bold mb-2">दीपक शाह</h2>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1 text-sm">
                <Phone className="w-4 h-4" />
                <span>+91 9422023571</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
                <Mail className="w-4 h-4" />
                <span>deepak@mpc2.com</span>
              </div>
            </div>

            {/* महावीर शाह */}
            <div className="w-full  rounded-xl p-4 text-center md:text-left">
              <h2 className="text-sm font-bold mb-2">महावीर शाह</h2>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1 text-sm">
                <Phone className="w-4 h-4" />
                <span>+91 9422023574</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
                <Mail className="w-4 h-4" />
                <span>mahavir@mpc2.com</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold">Follow Us</h3>
            <div className="flex justify-center md:justify-start mt-6 space-x-4">
              {/* WhatsApp */}
              <a
                href="https://wa.me/919422023571"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/whatsapp.jpg"
                  alt="WhatsApp"
                  className="w-10 h-10 object-cover rounded-full"
                />
              </a>
              {/* Add more social icons as needed */}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-gray-600 pt-4 text-sm text-center">
          &copy; 2025 DigamberJain. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
