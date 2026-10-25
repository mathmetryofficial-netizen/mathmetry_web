'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, Lock, ArrowRight, UserPlus, LogIn, Sparkles } from 'lucide-react';

interface AuthPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  itemName?: string;
  price?: string | number;
  callbackUrl?: string;
}

export default function AuthPromptModal({
  isOpen,
  onClose,
  title = "Account Required to Purchase",
  description = "Please sign in or create a student account to unlock this board package and sync your progress across devices.",
  itemName,
  price,
  callbackUrl = "/materials",
}: AuthPromptModalProps) {
  if (!isOpen) return null;

  const loginUrl = `/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`;
  const signupUrl = `/auth/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#111111]/50 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-md bg-white border border-[#EAE5E1] rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
        >
          {/* Subtle warm accent glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#FFF4EC] rounded-full blur-2xl pointer-events-none -z-10" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F9F5F1] hover:bg-[#EAE5E1] text-[#626262] hover:text-[#111111] flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>

          {/* Icon Badge */}
          <div className="w-12 h-12 rounded-2xl bg-[#FFF4EC] text-[#F36A21] border border-[#F36A21]/20 flex items-center justify-center mb-5 shadow-xs">
            <Lock size={22} />
          </div>

          {/* Modal Header */}
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#F36A21]">
            Student Verification
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight mt-1 mb-2">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-[#626262] leading-relaxed mb-6">
            {description}
          </p>

          {/* Item details card if provided */}
          {itemName && (
            <div className="p-3.5 bg-[#F9F5F1] rounded-2xl border border-[#EAE5E1] mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#111111]">{itemName}</p>
                <p className="text-[11px] text-[#858585]">Lifetime Access Pass</p>
              </div>
              {price && (
                <span className="text-base font-extrabold text-[#F36A21]">
                  ₹{price}
                </span>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href={signupUrl}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-[#F36A21] hover:bg-[#DE5815] text-white rounded-2xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow-md"
            >
              <UserPlus size={16} />
              <span>Create Free Student Account</span>
              <ArrowRight size={14} />
            </Link>

            <Link
              href={loginUrl}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-white hover:bg-[#F9F5F1] text-[#111111] border border-[#EAE5E1] rounded-2xl font-semibold text-xs tracking-wide transition-colors"
            >
              <LogIn size={16} />
              <span>Already Registered? Sign In</span>
            </Link>
          </div>

          <div className="mt-5 pt-4 border-t border-[#F0EBE7] text-center">
            <p className="text-[11px] text-[#858585] flex items-center justify-center gap-1">
              <Sparkles size={12} className="text-[#F36A21]" />
              <span>Takes less than 30 seconds to get started.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
