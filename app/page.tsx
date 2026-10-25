'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, MessageCircle, Play, Star } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F8FC] flex justify-center p-4 md:p-8 font-sans">

      {/* Main Container - Centered with Large Rounded Outer Frame */}
      <div className="w-full max-w-[1400px] bg-white rounded-[3rem] shadow-2xl overflow-hidden relative flex flex-col">

        {/* Navigation Bar */}
        {/* Navigation Bar */}
        <Navbar />

        {/* Hero Section */}
        <section className="relative pt-20 pb-16 px-6 md:px-12 text-center flex flex-col items-center" style={{ backgroundColor: '#f3f4f6' }}>
          {/* Gradient Blobs */}
          <div 
            className="absolute pointer-events-none"
            style={{
              left: '12%',
              top: '60%',
              width: '32%',
              height: '45%',
              background: '#5b5cf6',
              opacity: 0.75,
              filter: 'blur(80px)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
          <div 
            className="absolute pointer-events-none"
            style={{
              left: '38%',
              top: '70%',
              width: '42%',
              height: '28%',
              background: '#7c83ff',
              opacity: 0.45,
              filter: 'blur(120px)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
          <div 
            className="absolute pointer-events-none"
            style={{
              left: '78%',
              top: '25%',
              width: '36%',
              height: '30%',
              background: '#f4b6ff',
              opacity: 0.55,
              filter: 'blur(110px)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
          
          {/* Subtle noise texture overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.02\'/%3E%3C/svg%3E")',
              mixBlendMode: 'overlay'
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-bold mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              New Batches Starting Soon
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-8xl font-extrabold tracking-tight leading-[1.1] max-w-5xl mx-auto mb-8 text-slate-900"
          >
            Master Mathematics <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              with Confidence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
          >
            Unlock your full potential with our adaptive learning platform.
            Learn concepts, practice questions, and attempt real exams — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/materials" className="px-10 py-4 bg-slate-900 text-white rounded-full font-bold text-lg shadow-xl shadow-indigo-200 hover:shadow-2xl hover:-translate-y-1 hover:bg-slate-800 transition-all min-w-[200px]">
              Get Started
            </Link>
            <Link href="/courses" className="px-10 py-4 bg-white text-slate-900 border border-slate-200 rounded-full font-bold text-lg hover:bg-slate-50 transition-all min-w-[200px]">
              Explore Courses
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 flex items-center justify-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500"
          >
            <div className="text-sm font-semibold text-slate-400">Trusted by students from</div>
            {/* Simple text logos for schools/orgs */}
            <span className="font-serif font-bold text-slate-600">DPS</span>
            <span className="font-sans font-bold text-slate-600 tracking-widest">DBL</span>
            <span className="font-mono font-bold text-slate-600">DAV</span>
          </motion.div>
        </section>

        {/* Hero Image Section - Seamlessly blended */}
        <section className="relative px-6 md:px-12 pb-20" style={{ backgroundColor: '#f3f4f6' }}>
          {/* Continuation gradient blobs */}
          <div 
            className="absolute pointer-events-none"
            style={{
              left: '15%',
              top: '15%',
              width: '35%',
              height: '50%',
              background: '#5b5cf6',
              opacity: 0.4,
              filter: 'blur(100px)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
          <div 
            className="absolute pointer-events-none"
            style={{
              left: '85%',
              top: '55%',
              width: '38%',
              height: '35%',
              background: '#f4b6ff',
              opacity: 0.35,
              filter: 'blur(120px)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
          <div 
            className="absolute pointer-events-none"
            style={{
              left: '50%',
              top: '75%',
              width: '40%',
              height: '25%',
              background: '#7c83ff',
              opacity: 0.3,
              filter: 'blur(140px)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-5xl mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <img src="/image1.png" alt="Mathametry Platform" className="w-full h-auto object-cover" />
          </motion.div>
        </section>

        {/* Illustration Section - Remove */}

        {/* Features Section */}
        <section className="px-6 md:px-12 py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Why Choose Mathmetry?</h2>
              <p className="text-xl text-slate-600">Everything you need to excel in mathematics</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: '📚', title: 'Board-Specific Content', desc: 'Tailored materials for Foundation, ICSE, and CBSE boards' },
                { icon: '🎯', title: 'Chapter-wise Learning', desc: 'Organized content for systematic preparation' },
                { icon: '🔒', title: 'Secure Access', desc: 'Protected content with watermarking and access control' },
                { icon: '💳', title: 'One-Time Payment', desc: 'Pay once, access all materials for your board' },
                { icon: '📱', title: 'Mobile Friendly', desc: 'Learn anywhere, anytime on any device' },
                { icon: '⚡', title: 'Instant Access', desc: 'Get immediate access after purchase' }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="px-6 md:px-12 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Student Success Stories</h2>
            <p className="text-xl text-slate-600">See how students are achieving their goals</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: 'Siddharth Verma', class: 'Class 12', score: '98%', text: 'Mathametry helped me score 98% in boards. The chapter-wise materials are excellent!' },
              { name: 'Priya Sharma', class: 'Class 10', score: '95%', text: 'Best platform for CBSE preparation. Concepts are explained so clearly!' },
              { name: 'Rahul Kumar', class: 'Class 11', score: '92%', text: 'The board-specific content made my preparation so much easier and focused.' }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-2xl transition-all"
              >
                <div className="flex text-yellow-400 gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={18} />)}
                </div>
                <p className="text-slate-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.class} • {testimonial.score}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="px-6 md:px-12 py-20 bg-gradient-to-br from-slate-900 to-indigo-900 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-indigo-200">One-time payment for lifetime board access</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { board: 'Foundation', price: '999', features: ['All Foundation materials', 'Chapter-wise content', 'Instant access', 'Lifetime validity'] },
              { board: 'ICSE', price: '999', features: ['All ICSE materials', 'Board-specific content', 'Instant access', 'Lifetime validity'], popular: true },
              { board: 'CBSE', price: '999', features: ['All CBSE materials', 'NCERT aligned', 'Instant access', 'Lifetime validity'] }
            ].map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-white text-slate-900 p-8 rounded-3xl relative ${
                  plan.popular ? 'ring-4 ring-yellow-400 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-900 px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.board} Board</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold">₹{plan.price}</span>
                  <span className="text-slate-500">/one-time</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/materials"
                  className={`block w-full py-3 rounded-full font-bold text-center transition ${
                    plan.popular
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                      : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 md:px-12 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Ready to Excel in Mathematics?</h2>
            <p className="text-xl text-slate-600 mb-8">Join thousands of students who are mastering mathematics with Mathametry</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-xl"
              >
                Start Learning Now
              </Link>
              <Link
                href="/materials"
                className="px-10 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-full font-bold text-lg hover:bg-slate-50 transition-all"
              >
                Browse Materials
              </Link>
            </div>
          </motion.div>
        </section>



      </div>
    </div>
  );
}
