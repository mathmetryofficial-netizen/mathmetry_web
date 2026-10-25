'use client';

import Link from "next/link";
import { 
  BookOpen, 
  Check, 
  CheckCircle2, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight, 
  Star, 
  FileText, 
  Clock, 
  Award,
  ChevronRight,
  Calculator,
  Target,
  TrendingUp,
  Play
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ApplicationFooter from "@/components/ApplicationFooter";
import SectionHeading from "@/components/SectionHeading";
import { 
  StudentStudySilhouette, 
  TeacherPedagogySilhouette, 
  StepSilhouette, 
  GraduationMasterySilhouette 
} from "@/components/VectorSilhouettes";

export default function Home() {
  const boards = [
    {
      title: "Foundation Board",
      classes: "Classes 7, 8, 9 & 10",
      description: "Structured mathematics curriculum covering arithmetic, algebra, and geometry fundamentals for school tests and Olympiad prep.",
      badge: "Classes 7–10",
      href: "/materials",
      highlights: ["Core algebra, geometry, and arithmetic", "Step-by-step proofs with diagrams", "Important formula sheets"]
    },
    {
      title: "ICSE Board",
      classes: "Class 9 & 10 Mathematics",
      description: "Strictly aligned with the CISCE syllabus covering Commercial Mathematics, Algebra, Geometry, Mensuration, and Trigonometry.",
      badge: "CISCE Aligned",
      popular: true,
      href: "/materials",
      highlights: ["Past 10 years' solved board questions", "Step-wise solutions matching board rubrics", "Chapter-wise revision notes"]
    },
    {
      title: "CBSE Board",
      classes: "Class 10, 11 & 12",
      description: "Comprehensive NCERT-aligned notes with exemplar questions, case-study questions, and solved pre-board question papers.",
      badge: "NCERT Mapped",
      href: "/materials",
      highlights: ["Full NCERT & Exemplar solutions", "Case-study and assertion-reason questions", "Sample papers with marking schemes"]
    }
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Chapter Revision Notes",
      description: "Clear theory notes, definitions, and key formulas written simply so you can revise quickly before tests and exams."
    },
    {
      icon: Calculator,
      title: "Step-by-Step Solved Problems",
      description: "Graded practice problems showing complete working and formulas so you never lose method marks in exams."
    },
    {
      icon: FileText,
      title: "Previous Year Questions (PYQs)",
      description: "10 years of past board questions categorized chapter by chapter, aligned with CBSE and ICSE marking schemes."
    },
    {
      icon: Clock,
      title: "Timed Practice Tests",
      description: "Chapter tests and full-length sample papers to practice time management and build exam speed."
    },
    {
      icon: ShieldCheck,
      title: "Distraction-Free Reading",
      description: "Clean study portal with watermarked notes that works smoothly on your phone, tablet, or desktop."
    },
    {
      icon: TrendingUp,
      title: "Track Your Preparation",
      description: "Keep track of chapters you have completed, review your test scores, and know which topics need more revision."
    }
  ];

  const processSteps = [
    {
      number: "01",
      title: "Select Your Class & Board",
      desc: "Pick your class and board (Foundation, ICSE, or CBSE) to load your curriculum and chapter list."
    },
    {
      number: "02",
      title: "Review Notes & Formulas",
      desc: "Read concise chapter notes, formula sheets, and key theorems to build a clear understanding."
    },
    {
      number: "03",
      title: "Work Through Solved Problems",
      desc: "Solve textbook questions and past board problems with step-by-step working and diagrams."
    },
    {
      number: "04",
      title: "Attempt Timed Mock Tests",
      desc: "Take timed practice tests under real exam conditions to build speed, accuracy, and confidence."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFCFB] text-[#111111] flex flex-col font-sans selection:bg-[#FFF4EC] selection:text-[#DE5815]">
      {/* Navigation Header */}
      <Navbar />

      <main className="flex-1">
        {/* ========================================================= */}
        {/* HERO SECTION - 2-Column Clean Editorial Layout            */}
        {/* ========================================================= */}
        <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[#EAE5E1] overflow-hidden">
          {/* Subtle warm background glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FFF4EC] rounded-full blur-3xl opacity-70 pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Headline, Description & Actions */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                {/* Premium Capital Eyebrow — No capsule badge */}
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#F36A21] mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F36A21]" />
                  <span>MATHEMATICS FOR CLASSES 7 TO 12</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-[#111111] leading-[1.08] mb-6">
                  Master Mathematics <br />
                  <span className="text-[#F36A21]">with Confidence.</span>
                </h1>

                {/* Clear, natural supporting copy */}
                <p className="text-lg sm:text-xl text-[#626262] max-w-xl leading-relaxed mb-8">
                  Chapter-wise revision notes, high-yield formula sheets, and solved board question papers
                  designed for Foundation, ICSE, and CBSE students.
                </p>

                {/* Call to Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10">
                  <Link
                    href="/materials"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F36A21] hover:bg-[#DE5815] text-white rounded-full font-bold text-base shadow-xs hover:shadow-md transition-all duration-200"
                  >
                    <span>Browse Study Materials</span>
                    <ArrowRight size={18} />
                  </Link>

                  <Link
                    href="/courses"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-[#F9F5F1] text-[#111111] border border-[#EAE5E1] rounded-full font-semibold text-base transition-colors"
                  >
                    <Play size={16} className="text-[#F36A21]" />
                    <span>Watch Video Lectures</span>
                  </Link>
                </div>

                {/* School & Board Trust Line — Premium Capital Typography */}
                <div className="pt-6 border-t border-[#EAE5E1] w-full">
                  <p className="text-xs text-[#858585] mb-3">
                    Trusted by students from DPS, DBL, DAV, and top schools across India:
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold tracking-[0.16em] uppercase text-[#626262]">
                    <span className="text-[#111111]">FOUNDATION (7–10)</span>
                    <span className="text-[#D1CBC7]">•</span>
                    <span className="text-[#111111]">ICSE BOARD (9–10)</span>
                    <span className="text-[#D1CBC7]">•</span>
                    <span className="text-[#111111]">CBSE BOARD (10–12)</span>
                    <span className="text-[#D1CBC7]">•</span>
                    <span className="text-[#111111]">NCERT MAPPED</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Mathematics Showcase Visual with Silhouettes & Diagrams */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none bg-white border border-[#EAE5E1] rounded-3xl p-6 sm:p-8 shadow-sm">
                  
                  {/* Header bar of visual card */}
                  <div className="flex items-center justify-between pb-5 border-b border-[#EAE5E1] mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#F36A21]" />
                      <div className="w-3 h-3 rounded-full bg-[#EAE5E1]" />
                      <div className="w-3 h-3 rounded-full bg-[#EAE5E1]" />
                    </div>
                    <span className="text-xs font-bold text-[#858585] tracking-[0.2em] uppercase">
                      CHAPTER MODULE
                    </span>
                  </div>

                  {/* Vector Silhouette: Student Studying with Math Instruments */}
                  <div className="w-full bg-[#FFFCFB] rounded-2xl p-3 border border-[#EAE5E1] mb-5 flex items-center justify-center">
                    <StudentStudySilhouette className="w-full max-w-[290px] h-auto" />
                  </div>

                  {/* Clean Geometric / Math Linework Canvas Vector Diagram */}
                  <div className="w-full bg-[#F9F5F1] rounded-2xl p-6 border border-[#EAE5E1] mb-6 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#F36A21]">
                          CLASS 10 • ICSE & CBSE
                        </span>
                        <h4 className="text-base font-bold text-[#111111] mt-0.5">Quadratic Equations & Polynomials</h4>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-white border border-[#EAE5E1] text-[#111111]">
                        CH-04
                      </span>
                    </div>

                    {/* Linework coordinate curve vector diagram */}
                    <svg viewBox="0 0 300 110" className="w-full h-24 stroke-[#111111] fill-none my-2">
                      {/* Grid lines */}
                      <path d="M 0 55 L 300 55" stroke="#EAE5E1" strokeWidth="1" strokeDasharray="3 3" />
                      <path d="M 150 0 L 150 110" stroke="#EAE5E1" strokeWidth="1" strokeDasharray="3 3" />
                      {/* Parabola: y = a(x - h)^2 + k */}
                      <path d="M 30 10 Q 150 100 270 10" stroke="#F36A21" strokeWidth="2.5" />
                      {/* Tangent line */}
                      <path d="M 80 80 L 220 30" stroke="#111111" strokeWidth="1.5" strokeDasharray="4 2" />
                      {/* Roots circles */}
                      <circle cx="85" cy="55" r="3.5" fill="#F36A21" stroke="#FFFFFF" strokeWidth="1.5" />
                      <circle cx="215" cy="55" r="3.5" fill="#F36A21" stroke="#FFFFFF" strokeWidth="1.5" />
                      <circle cx="150" cy="55" r="2" fill="#858585" />
                    </svg>

                    <div className="flex items-center justify-between text-xs text-[#626262] pt-2 border-t border-[#EAE5E1]">
                      <span>Formula: <code className="text-[#111111] font-mono font-semibold">x = (-b ± √D) / 2a</code></span>
                      <span className="font-semibold text-[#16A34A] flex items-center gap-1">
                        <CheckCircle2 size={12} /> Verified Proof
                      </span>
                    </div>
                  </div>

                  {/* Feature highlights inside card */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FFF4EC] border border-[#F36A21]/20">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#F36A21] text-white flex items-center justify-center font-bold text-xs">
                          98%
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#111111]">Board Exam Score Standard</p>
                          <p className="text-[11px] text-[#626262]">Step-wise presentation with no marks lost</p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-[#F36A21]" />
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#EAE5E1]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center font-bold text-xs">
                          PDF
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#111111]">Chapter Notes & Practice Papers</p>
                          <p className="text-[11px] text-[#626262]">Includes high-yield formula sheets</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-[#F36A21]">Ready</span>
                    </div>
                  </div>

                  {/* Subtle caption */}
                  <p className="text-center text-[11px] text-[#858585] mt-5">
                    Authentic Mathmetry study materials & mock examination portal
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* WHY MATHMETRY - Practical Explanation, Features & Silhouettes */}
        {/* ========================================================= */}
        <section className="py-20 bg-[#F9F5F1] border-b border-[#EAE5E1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#F36A21] block">
                  WHY MATHMETRY
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] leading-tight">
                  Structured for How Board Exams are Actually Marked.
                </h2>
                <div className="w-12 h-1 bg-[#F36A21] rounded-full" />
                <p className="text-base sm:text-lg text-[#626262] leading-relaxed">
                  In school and board exams, final answers only carry part of the total marks.
                  Examiners award marks for correct steps, clear reasons, and properly stated formulas.
                  Mathmetry shows you the complete, step-by-step layout so you secure every mark.
                </p>

                {/* Teacher Pedagogy Vector Silhouette */}
                <div className="bg-white p-4 rounded-2xl border border-[#EAE5E1] shadow-xs flex items-center justify-center">
                  <TeacherPedagogySilhouette className="w-full max-w-[340px] h-auto" />
                </div>

                {/* 2 Focused Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-white rounded-xl border border-[#EAE5E1]">
                    <div className="text-base font-bold text-[#111111] mb-1">Step-Wise Marking</div>
                    <p className="text-xs text-[#626262]">Every solution reflects board rubric standards so you never lose method marks.</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-[#EAE5E1]">
                    <div className="text-base font-bold text-[#111111] mb-1">Clear Formula Sheets</div>
                    <p className="text-xs text-[#626262]">Quick-reference summaries with essential formulas and theorems for fast revision.</p>
                  </div>
                </div>
              </div>

              {/* Right Column: What Every Board Pack Contains */}
              <div className="lg:col-span-6">
                <div className="bg-white border border-[#EAE5E1] rounded-3xl p-8 shadow-xs">
                  <h3 className="text-xl font-bold text-[#111111] mb-6 flex items-center justify-between">
                    <span>What Every Board Access Pack Includes</span>
                    <span className="text-xs font-bold tracking-[0.18em] uppercase text-[#F36A21]">
                      COMPLETE PACKAGE
                    </span>
                  </h3>
                  <div className="space-y-4">
                    {[
                      { title: "Complete Theory & Concept Summaries", desc: "Straightforward explanations of every topic without unnecessary jargon." },
                      { title: "Chapter Formula Reference Sheets", desc: "All formulas and theorems organized on one sheet for quick review." },
                      { title: "Graded Practice Sets (Basic, Standard & Advanced)", desc: "From textbook basics to higher-order thinking problems." },
                      { title: "Past Board Questions with Model Answers", desc: "Step-by-step solutions demonstrating proper layout and presentation." },
                      { title: "Timed Chapter Tests & Mock Papers", desc: "Test your speed under timed conditions with instant answer keys." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3.5 pb-4 border-b border-[#F0EBE7] last:border-b-0 last:pb-0">
                        <div className="w-5 h-5 rounded-full bg-[#FFF4EC] text-[#F36A21] flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#111111]">{item.title}</p>
                          <p className="text-xs text-[#626262] mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CORE FEATURES SECTION - 6 Cards with Lucide Icons         */}
        {/* ========================================================= */}
        <section className="py-20 border-b border-[#EAE5E1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="PLATFORM FEATURES"
              title="Everything You Need for"
              highlight="Your Math Preparation."
              subtitle="All the notes, formula sheets, solved problems, and tests you need to revise thoroughly and score higher."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, idx) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={idx}
                    className="card-editorial p-7 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-[#FFF4EC] text-[#F36A21] flex items-center justify-center mb-6">
                        <IconComponent size={22} />
                      </div>
                      <h3 className="text-lg font-bold text-[#111111] mb-2.5">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-[#626262] leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3-COLUMN BOARD SHOWCASE - Foundation, ICSE, CBSE          */}
        {/* ========================================================= */}
        <section className="py-20 bg-[#F9F5F1] border-b border-[#EAE5E1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="CURRICULUM BOARDS"
              title="Select Your"
              highlight="School Board."
              subtitle="Choose your board to access chapter notes, formula sheets, and practice papers aligned to your syllabus."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {boards.map((board, idx) => (
                <div
                  key={idx}
                  className={`bg-white rounded-3xl p-8 border transition-all flex flex-col justify-between ${
                    board.popular
                      ? "border-[#F36A21] shadow-md relative"
                      : "border-[#EAE5E1] shadow-xs hover:border-[#111111]/30"
                  }`}
                >
                  <div>
                    {/* Premium Capital Tag — No capsule badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#F36A21]">
                        {board.badge}
                      </span>
                      {board.popular && (
                        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#111111] border-b-2 border-[#F36A21] pb-0.5">
                          MOST ENROLLED
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-[#111111] mb-1">
                      {board.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#858585] mb-4">
                      {board.classes}
                    </p>
                    <p className="text-sm text-[#626262] leading-relaxed mb-6">
                      {board.description}
                    </p>

                    <div className="pt-4 border-t border-[#F0EBE7] mb-8 space-y-2.5">
                      {board.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#111111]">
                          <Check size={14} className="text-[#F36A21] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between mb-4 pt-4 border-t border-[#EAE5E1]">
                      <span className="text-xs text-[#626262]">Full Board Access</span>
                      <span className="text-2xl font-extrabold text-[#111111]">₹999 <span className="text-xs font-normal text-[#858585]">/ one-time</span></span>
                    </div>

                    <Link
                      href={board.href}
                      className={`w-full py-3.5 px-4 rounded-full font-bold text-sm text-center block transition-all ${
                        board.popular
                          ? "bg-[#F36A21] hover:bg-[#DE5815] text-white shadow-xs"
                          : "bg-[#111111] hover:bg-[#F36A21] text-white"
                      }`}
                    >
                      Access {board.title}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* WORKFLOW / STUDY PROCESS - 4-Step Sequence with Silhouettes */}
        {/* ========================================================= */}
        <section className="py-20 border-b border-[#EAE5E1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="STUDY ROUTINE"
              title="How to Prepare"
              highlight="Each Chapter."
              subtitle="A simple, effective routine to cover any topic thoroughly before school tests and board exams."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, idx) => (
                <div key={idx} className="relative flex flex-col items-start p-6 rounded-2xl bg-[#F9F5F1] border border-[#EAE5E1] hover:border-[#F36A21]/40 transition-all shadow-xs">
                  <div className="flex items-center justify-between w-full mb-4">
                    <span className="text-3xl font-extrabold text-[#F36A21]">{step.number}</span>
                    <StepSilhouette stepNumber={step.number} />
                  </div>
                  <h3 className="text-base font-bold text-[#111111] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#626262] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* TESTIMONIALS / STUDENT REVIEWS                             */}
        {/* ========================================================= */}
        <section className="py-20 bg-[#F9F5F1] border-b border-[#EAE5E1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="STUDENT REVIEWS"
              title="What Students"
              highlight="Say About Mathmetry."
              subtitle="Feedback from students who used Mathmetry's chapter notes and solved papers for their preparation."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Mathmetry helped me score 98% in boards. The chapter-wise materials and step-by-step model answers made revisions very straightforward.",
                  author: "Siddharth Verma",
                  score: "98% in Class 12 Boards",
                  board: "CBSE Board",
                  initials: "SV"
                },
                {
                  quote: "Best platform for CBSE preparation. Complex concepts in calculus and coordinate geometry are explained with absolute clarity.",
                  author: "Priya Sharma",
                  score: "95% in Class 10 Boards",
                  board: "CBSE Board",
                  initials: "PS"
                },
                {
                  quote: "The board-specific focus made my ICSE revision so much easier. I didn't waste time on irrelevant material and knew exact proofs.",
                  author: "Rahul Kumar",
                  score: "92% in Class 11",
                  board: "ICSE Board",
                  initials: "RK"
                }
              ].map((t, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-[#EAE5E1] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 text-[#F36A21] mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} fill="currentColor" stroke="none" />
                      ))}
                    </div>
                    <p className="text-sm text-[#111111] italic leading-relaxed mb-6">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-[#F0EBE7]">
                    <div className="w-10 h-10 rounded-full bg-[#FFF4EC] text-[#F36A21] font-bold flex items-center justify-center text-xs">
                      {t.initials}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#111111]">{t.author}</h4>
                      <p className="text-xs text-[#626262]">{t.score} • {t.board}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* TRANSPARENT PRICING SECTION - ₹999 One-Time Board Pass    */}
        {/* ========================================================= */}
        <section className="py-20 border-b border-[#EAE5E1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="TRANSPARENT PRICING"
              title="Simple, Transparent"
              highlight="One-Time Payment."
              subtitle="No recurring subscriptions. Pay once to access all existing and upcoming chapter materials for your board."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { title: "Foundation Board", tag: "Class 7 - 10", desc: "All foundation notes, conceptual worksheets, and Olympiad foundations." },
                { title: "ICSE Board", tag: "Class 9 & 10", desc: "Complete ICSE board notes, formula sheets, and past 10-year question banks.", popular: true },
                { title: "CBSE Board", tag: "Class 10, 11 & 12", desc: "Comprehensive NCERT exemplar solutions, chapter notes, and mock exams." }
              ].map((tier, idx) => (
                <div
                  key={idx}
                  className={`rounded-3xl p-8 border transition-all flex flex-col justify-between ${
                    tier.popular
                      ? "bg-[#FFF4EC]/40 border-[#F36A21] shadow-md relative"
                      : "bg-white border-[#EAE5E1] shadow-xs"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3.5 left-8 bg-[#111111] text-white text-[10px] font-bold uppercase tracking-[0.18em] px-3.5 py-1 rounded-md shadow-xs">
                      MOST ENROLLED
                    </div>
                  )}

                  <div>
                    <div className="mb-2">
                      <span className="text-xs font-bold text-[#858585] uppercase tracking-[0.2em]">{tier.tag}</span>
                      <h3 className="text-2xl font-bold text-[#111111] mt-1">{tier.title}</h3>
                    </div>

                    <div className="my-6">
                      <span className="text-4xl font-extrabold text-[#111111]">₹999</span>
                      <span className="text-xs text-[#626262] ml-1">/ one-time payment</span>
                    </div>

                    <p className="text-xs text-[#626262] leading-relaxed mb-6">
                      {tier.desc}
                    </p>

                    <div className="space-y-2.5 pt-4 border-t border-[#EAE5E1] mb-8 text-xs text-[#111111]">
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-[#F36A21]" />
                        <span>All chapter notes & formula sheets</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-[#F36A21]" />
                        <span>Distraction-free reading experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-[#F36A21]" />
                        <span>Practice mock tests & answer keys</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-[#F36A21]" />
                        <span>Instant access with lifetime validity</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/materials"
                    className={`w-full py-3 px-4 rounded-full font-bold text-sm text-center block transition-all ${
                      tier.popular
                        ? "bg-[#F36A21] hover:bg-[#DE5815] text-white shadow-xs"
                        : "bg-[#111111] hover:bg-[#F36A21] text-white"
                    }`}
                  >
                    Get Started - ₹999
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CLOSING CALL TO ACTION - Silhouette & Banner               */}
        {/* ========================================================= */}
        <section className="py-20 bg-[#F9F5F1] text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <GraduationMasterySilhouette className="w-36 h-28 mx-auto mb-4" />
            
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#F36A21] block mb-3">
              START PREPARING TODAY
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight mb-4">
              Ready to Score Higher in Mathematics?
            </h2>
            <div className="w-12 h-1 bg-[#F36A21] rounded-full mx-auto mb-6" />
            <p className="text-base sm:text-lg text-[#626262] max-w-xl mx-auto mb-8 leading-relaxed">
              Join thousands of students preparing for ICSE, CBSE, and Foundation exams with Mathmetry.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/auth/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F36A21] hover:bg-[#DE5815] text-white rounded-full font-bold text-base shadow-xs transition-all"
              >
                <span>Create Student Account</span>
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/materials"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-[#FFFCFB] text-[#111111] border border-[#EAE5E1] rounded-full font-semibold text-base transition-colors"
              >
                Browse Study Materials
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Structured Application Footer */}
      <ApplicationFooter />
    </div>
  );
}
