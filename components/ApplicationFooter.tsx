import Link from "next/link";
import { Mail } from "lucide-react";

export default function ApplicationFooter() {
  return (
    <footer className="w-full bg-[#F9F5F1] border-t border-[#EAE5E1] text-[#111111] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 sm:pt-16 sm:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-10 sm:mb-12">
          
          {/* Brand & Mission — spans full width on mobile, 5 cols on desktop */}
          <div className="md:col-span-5 lg:col-span-6 flex flex-col items-start">
            <Link href="/" className="inline-flex items-center gap-2 mb-3.5 group">
              <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-sm transition-transform group-hover:scale-105">
                M
              </div>
              <span className="text-xl font-bold tracking-tight text-[#111111]">
                Mathmetry<span className="text-[#F36A21]">.</span>
              </span>
            </Link>
            
            <p className="text-xs sm:text-sm text-[#626262] leading-relaxed max-w-sm mb-4">
              Chapter-wise study notes, high-yield formula sheets, and solved question papers for Foundation, ICSE, and CBSE students.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#626262] mb-5">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] shrink-0"></span>
              <span>Foundation • ICSE • CBSE Study Portal</span>
            </div>

            {/* Direct Tap-to-Email on Mobile */}
            <a 
              href="mailto:mathmetry.official@gmail.com"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#EAE5E1] text-xs font-semibold text-[#111111] hover:border-[#F36A21]/40 hover:text-[#F36A21] transition-colors"
            >
              <Mail size={13} className="text-[#F36A21]" />
              <span>mathmetry.official@gmail.com</span>
            </a>
          </div>

          {/* Links Section: 2 columns on Mobile & Tablet, 7 cols on Desktop */}
          <div className="md:col-span-7 lg:col-span-6 grid grid-cols-2 gap-6 sm:gap-8 pt-6 sm:pt-0 border-t border-[#EAE5E1] md:border-t-0">
            {/* Academic Materials */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#111111] mb-3 sm:mb-4">
                Materials
              </h4>
              <ul className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm text-[#626262]">
                <li>
                  <Link href="/materials" className="block py-1 hover:text-[#F36A21] transition-colors">
                    Foundation (7–10)
                  </Link>
                </li>
                <li>
                  <Link href="/materials" className="block py-1 hover:text-[#F36A21] transition-colors">
                    ICSE Mathematics
                  </Link>
                </li>
                <li>
                  <Link href="/materials" className="block py-1 hover:text-[#F36A21] transition-colors">
                    CBSE Class 10 & 12
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="block py-1 hover:text-[#F36A21] transition-colors">
                    Video Courses
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/exams" className="block py-1 hover:text-[#F36A21] transition-colors">
                    Practice Exams
                  </Link>
                </li>
              </ul>
            </div>

            {/* Platform & Legal */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#111111] mb-3 sm:mb-4">
                Platform
              </h4>
              <ul className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm text-[#626262]">
                <li>
                  <Link href="/about" className="block py-1 hover:text-[#F36A21] transition-colors">
                    About Mathmetry
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="block py-1 hover:text-[#F36A21] transition-colors">
                    Mentorship & Support
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="block py-1 hover:text-[#F36A21] transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="block py-1 hover:text-[#F36A21] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/refund-policy" className="block py-1 hover:text-[#F36A21] transition-colors">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom divider, copyright, and developer attribution */}
        <div className="pt-6 sm:pt-8 border-t border-[#EAE5E1] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#858585]">
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Mathmetry. All rights reserved.</p>
            <span className="hidden sm:inline text-[#D1CBC7]">•</span>
            <p className="text-[#626262]">
              Designed and developed by{" "}
              <span className="font-semibold text-[#111111]">Baskey Studio</span>
            </p>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-xs text-[#626262]">
            <Link href="/privacy" className="hover:text-[#111111] transition-colors py-1">
              Privacy Policy
            </Link>
            <span className="text-[#D1CBC7]">•</span>
            <Link href="/refund-policy" className="hover:text-[#111111] transition-colors py-1">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
