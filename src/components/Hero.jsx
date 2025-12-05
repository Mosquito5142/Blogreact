import React from "react";

export default function Hero() {
  return (
    <section className="py-12 border-b border-base-300">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Main Headline */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          บันทึกเรื่องราว
          <br />
          <span className="italic">ความรู้และประสบการณ์</span>
        </h2>

        {/* Decorative Line */}
        <div className="flex items-center justify-center gap-4 my-6">
          <div className="h-px bg-base-content/30 w-16"></div>
          <span className="text-2xl">❧</span>
          <div className="h-px bg-base-content/30 w-16"></div>
        </div>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed">
          ยินดีต้อนรับสู่บล็อกส่วนตัวของ<strong>วชิรวิทย์</strong>
          ที่นี่รวบรวมบทความเกี่ยวกับเทคโนโลยี การเขียนโปรแกรม
          และสิ่งที่น่าสนใจในชีวิตประจำวัน
        </p>

        {/* CTA */}
        <div className="mt-8">
          <a href="#articles" className="vintage-btn inline-block">
            อ่านบทความ ↓
          </a>
        </div>

        {/* Stats in newspaper style */}
        <div className="mt-12 pt-6 border-t border-base-300">
          <div className="flex justify-center gap-8 md:gap-16 text-center">
            <div>
              <div className="text-3xl font-bold font-serif">10+</div>
              <div className="section-label text-base-content/60 mt-1">
                บทความ
              </div>
            </div>
            <div className="border-l border-base-300"></div>
            <div>
              <div className="text-3xl font-bold font-serif">2024</div>
              <div className="section-label text-base-content/60 mt-1">
                ปีที่ก่อตั้ง
              </div>
            </div>
            <div className="border-l border-base-300"></div>
            <div>
              <div className="text-3xl font-bold font-serif">∞</div>
              <div className="section-label text-base-content/60 mt-1">
                ความรู้
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
