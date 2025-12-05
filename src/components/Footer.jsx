import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 border-t-2 border-base-content mt-12">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <h3 className="masthead text-2xl">The Vachiravit</h3>
            </Link>
            <p className="text-base-content/60 text-sm leading-relaxed">
              บล็อกส่วนตัวที่รวบรวมบทความเกี่ยวกับเทคโนโลยี การเขียนโปรแกรม
              และเรื่องราวที่น่าสนใจ
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="section-label mb-4">ลิงก์ด่วน</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-base-content/60 hover:text-accent transition-colors"
                >
                  หน้าแรก
                </Link>
              </li>
              <li>
                <a
                  href="#articles"
                  className="text-base-content/60 hover:text-accent transition-colors"
                >
                  บทความ
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="section-label mb-4">ติดตาม</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <a
                href="https://github.com/Mosquito5142"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base-content/60 hover:text-accent transition-colors"
                title="GitHub"
              >
                GitHub
              </a>
              <span className="text-base-content/30">|</span>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base-content/60 hover:text-accent transition-colors"
                title="Facebook"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="newspaper-divider-thick"></div>
        <div className="text-center pt-6">
          <p className="text-sm text-base-content/50">
            © {currentYear} วชิรวิทย์ ดวงดี — สงวนลิขสิทธิ์
          </p>
          <p className="text-xs text-base-content/40 mt-2 italic">
            "ความรู้คือพลัง"
          </p>
        </div>
      </div>
    </footer>
  );
}
