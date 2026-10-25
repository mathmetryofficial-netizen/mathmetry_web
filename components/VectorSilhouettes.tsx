import React from 'react';

/**
 * High-definition vector silhouette of a student deeply focused at a study desk,
 * accompanied by mathematical symbols, coordinate axes, and geometry instruments.
 */
export function StudentStudySilhouette({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 340 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Student studying mathematics"
      role="img"
    >
      {/* Background Subtle Accent Circle */}
      <circle cx="170" cy="110" r="95" fill="#FFF4EC" />
      
      {/* Floating Mathematical Linework Silhouettes */}
      <g stroke="#F36A21" strokeWidth="1.5" strokeLinecap="round" opacity="0.85">
        {/* Coordinate Axes */}
        <line x1="45" y1="60" x2="85" y2="60" strokeDasharray="2 2" />
        <line x1="65" y1="40" x2="65" y2="80" strokeDasharray="2 2" />
        {/* Small Parabola */}
        <path d="M 50 48 Q 65 72 80 48" fill="none" strokeWidth="2" />
        {/* Right Triangle */}
        <polygon points="255,45 285,45 285,25" fill="#FFF4EC" stroke="#F36A21" strokeWidth="1.5" />
        {/* Geometric Compass Arcs */}
        <path d="M 245 85 A 25 25 0 0 1 275 110" strokeDasharray="3 3" />
      </g>

      {/* Floating Math Symbols */}
      <text x="50" y="35" fill="#F36A21" fontSize="13" fontWeight="bold" fontFamily="serif">π</text>
      <text x="270" y="75" fill="#111111" fontSize="12" fontWeight="bold" fontFamily="sans-serif">∑</text>
      <text x="290" y="105" fill="#F36A21" fontSize="11" fontWeight="bold" fontFamily="sans-serif">√x</text>
      <text x="75" y="100" fill="#111111" fontSize="12" fontWeight="bold" fontFamily="serif">θ</text>

      {/* Study Desk Tabletop Silhouette */}
      <rect x="30" y="162" width="280" height="7" rx="3.5" fill="#111111" />
      {/* Table Legs */}
      <rect x="55" y="169" width="6" height="42" rx="3" fill="#111111" />
      <rect x="275" y="169" width="6" height="42" rx="3" fill="#111111" />

      {/* Desk Lamp Silhouette */}
      <path d="M 68 162 L 68 120 Q 68 95 90 92 L 105 92" stroke="#111111" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* Lamp Head */}
      <path d="M 103 86 L 118 97 L 110 106 L 96 95 Z" fill="#F36A21" />
      {/* Lamp Base */}
      <rect x="62" y="159" width="12" height="3" rx="1.5" fill="#111111" />
      {/* Light Cone subtle fill */}
      <polygon points="107,98 125,162 175,162 118,97" fill="#F36A21" opacity="0.12" />

      {/* Open Book on Desk Silhouette */}
      <path d="M 120 162 Q 138 156 156 162 Q 174 156 192 162 L 190 157 Q 174 152 156 157 Q 138 152 122 157 Z" fill="#111111" />
      <line x1="156" y1="157" x2="156" y2="162" stroke="#FFFFFF" strokeWidth="1" />

      {/* Student Silhouette */}
      {/* Chair Back */}
      <rect x="235" y="125" width="5" height="55" rx="2.5" fill="#111111" />
      <line x1="225" y1="175" x2="242" y2="175" stroke="#111111" strokeWidth="4" />
      <line x1="228" y1="175" x2="225" y2="210" stroke="#111111" strokeWidth="3" />
      <line x1="238" y1="175" x2="240" y2="210" stroke="#111111" strokeWidth="3" />

      {/* Student Head (bent forward reading) */}
      <circle cx="178" cy="112" r="14" fill="#111111" />
      {/* Hair profile */}
      <path d="M 166 112 Q 172 96 188 104 Q 192 114 186 118 Z" fill="#111111" />

      {/* Student Torso & Shoulders (leaning in) */}
      <path
        d="M 183 125 
           C 183 125, 205 132, 218 142 
           C 224 148, 224 165, 222 178 
           L 190 178 
           C 190 168, 185 148, 175 138 
           Z"
        fill="#111111"
      />

      {/* Student Arm reaching toward book with pencil */}
      <path
        d="M 182 135 
           Q 165 146 152 158 
           L 146 156 
           Q 160 142 175 130 
           Z"
        fill="#111111"
      />
      {/* Pencil in hand */}
      <line x1="144" y1="158" x2="150" y2="154" stroke="#F36A21" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Vector silhouette of an educator / mentor presenting geometric proofs and theorems
 * on a blackboard with coordinate graphs and geometric shapes.
 */
export function TeacherPedagogySilhouette({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Instructor explaining geometry on board"
      role="img"
    >
      {/* Blackboard Frame */}
      <rect x="75" y="25" width="265" height="175" rx="16" fill="#FFFFFF" stroke="#EAE5E1" strokeWidth="2" />
      <rect x="83" y="33" width="249" height="159" rx="10" fill="#F9F5F1" />

      {/* Mathematical Elements on Board */}
      <g stroke="#111111" strokeWidth="1.2" strokeLinecap="round">
        {/* Coordinate System */}
        <line x1="105" y1="110" x2="195" y2="110" stroke="#EAE5E1" strokeWidth="1.5" />
        <line x1="150" y1="60" x2="150" y2="160" stroke="#EAE5E1" strokeWidth="1.5" />
        
        {/* Sine Wave */}
        <path d="M 105 110 Q 127 75 150 110 T 195 110" stroke="#F36A21" strokeWidth="2" fill="none" />

        {/* Geometric Triangle */}
        <polygon points="220,135 290,135 290,80" fill="#FFF4EC" stroke="#111111" strokeWidth="1.5" />
        {/* Right Angle indicator */}
        <rect x="282" y="127" width="8" height="8" fill="none" stroke="#F36A21" strokeWidth="1.2" />
      </g>

      {/* Board Notes & Formulas */}
      <text x="225" y="70" fill="#F36A21" fontSize="12" fontWeight="bold" fontFamily="serif">a² + b² = c²</text>
      <text x="105" y="55" fill="#111111" fontSize="11" fontWeight="bold" fontFamily="sans-serif">f(x) = sin(θ)</text>
      <text x="220" y="160" fill="#858585" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Q.E.D. ✓</text>

      {/* Instructor Silhouette */}
      {/* Head */}
      <circle cx="58" cy="85" r="15" fill="#111111" />
      {/* Glasses accent in orange */}
      <rect x="63" y="82" width="7" height="4" rx="1" fill="#F36A21" />

      {/* Body & Coat */}
      <path
        d="M 45 105 
           C 45 105, 58 100, 72 105 
           L 78 185 
           L 35 185 
           Z"
        fill="#111111"
      />

      {/* Right Arm extended holding pointer */}
      <path
        d="M 68 112 
           L 115 88 
           L 118 92 
           L 70 118 
           Z"
        fill="#111111"
      />
      {/* Pointer stick pointing at sine wave on board */}
      <line x1="117" y1="90" x2="148" y2="76" stroke="#F36A21" strokeWidth="2.5" strokeLinecap="round" />

      {/* Legs & Base */}
      <rect x="42" y="185" width="12" height="45" rx="3" fill="#111111" />
      <rect x="58" y="185" width="12" height="45" rx="3" fill="#111111" />
      {/* Floor Line */}
      <line x1="15" y1="230" x2="345" y2="230" stroke="#EAE5E1" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 4 Process Step Silhouettes
 */
export function StepSilhouette({ stepNumber }: { stepNumber: string }) {
  if (stepNumber === "01") {
    // Step 1: Compass & Board Choice
    return (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="#FFF4EC" />
        {/* Silhouette of drafting compass */}
        <path d="M 24 8 L 24 14 M 24 14 L 16 38 M 24 14 L 32 38" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="14" r="3" fill="#F36A21" />
        <line x1="19" y1="28" x2="29" y2="28" stroke="#F36A21" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (stepNumber === "02") {
    // Step 2: Open Book & Formulas
    return (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="#FFF4EC" />
        {/* Silhouette of textbook with formula notes */}
        <path d="M 12 18 Q 24 14 24 20 L 24 36 Q 24 30 12 32 Z" fill="#111111" />
        <path d="M 36 18 Q 24 14 24 20 L 24 36 Q 24 30 36 32 Z" fill="#111111" />
        <circle cx="24" cy="13" r="2" fill="#F36A21" />
        <path d="M 28 22 L 32 22 M 28 26 L 31 26" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (stepNumber === "03") {
    // Step 3: Pencil & Calculation Grid
    return (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="#FFF4EC" />
        {/* Silhouette of paper with checkmarks and pencil */}
        <rect x="14" y="12" width="20" height="24" rx="3" fill="#111111" />
        <line x1="18" y1="18" x2="26" y2="18" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="24" x2="24" y2="24" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        {/* Pencil in orange */}
        <path d="M 26 34 L 35 25 L 37 27 L 28 36 Z" fill="#F36A21" />
      </svg>
    );
  }

  // Step 4: Stopwatch & Full Marks
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#FFF4EC" />
      {/* Stopwatch silhouette */}
      <circle cx="24" cy="26" r="14" fill="#111111" />
      <rect x="22" y="8" width="4" height="4" rx="1" fill="#111111" />
      <circle cx="24" cy="26" r="10" fill="#FFFFFF" />
      {/* Stopwatch hands */}
      <line x1="24" y1="26" x2="24" y2="19" stroke="#F36A21" strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="26" x2="29" y2="26" stroke="#111111" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Triumphant student silhouette for the closing banner celebrating mathematical achievement.
 */
export function GraduationMasterySilhouette({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Student celebrating mathematical mastery"
      role="img"
    >
      {/* Ambient Sunburst Rays */}
      <circle cx="100" cy="80" r="60" fill="#FFF4EC" />
      <g stroke="#F36A21" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
        <line x1="100" y1="10" x2="100" y2="20" />
        <line x1="150" y1="30" x2="142" y2="38" />
        <line x1="170" y1="80" x2="160" y2="80" />
        <line x1="50" y1="30" x2="58" y2="38" />
        <line x1="30" y1="80" x2="40" y2="80" />
      </g>

      {/* Floating Stars */}
      <path d="M 135 45 L 137 50 L 142 51 L 138 54 L 139 59 L 135 56 L 130 59 L 132 54 L 128 51 L 133 50 Z" fill="#F36A21" />
      <path d="M 65 55 L 66 59 L 70 60 L 67 62 L 68 66 L 65 63 L 61 66 L 62 62 L 59 60 L 63 59 Z" fill="#F36A21" />

      {/* Student Silhouette */}
      {/* Head with graduation cap */}
      <circle cx="100" cy="85" r="12" fill="#111111" />
      {/* Graduation Cap Diamond */}
      <polygon points="100,60 118,67 100,74 82,67" fill="#111111" />
      {/* Cap tassel */}
      <line x1="100" y1="67" x2="82" y2="76" stroke="#F36A21" strokeWidth="1.5" />
      <circle cx="82" cy="76" r="1.5" fill="#F36A21" />

      {/* Shoulders & Torso */}
      <path
        d="M 85 102 
           C 85 102, 100 98, 115 102 
           L 122 155 
           L 78 155 
           Z"
        fill="#111111"
      />

      {/* Raised Arm holding textbook high in celebration */}
      <path
        d="M 112 104 
           L 132 72 
           L 136 74 
           L 118 108 
           Z"
        fill="#111111"
      />
      {/* Textbook in hand */}
      <rect x="126" y="58" width="16" height="20" rx="2" fill="#F36A21" transform="rotate(-18 126 58)" />
      <line x1="131" y1="62" x2="143" y2="58" stroke="#FFFFFF" strokeWidth="1.5" />

      {/* Left arm celebrating */}
      <path
        d="M 88 104 
           L 68 76 
           L 72 73 
           L 92 102 
           Z"
        fill="#111111"
      />
    </svg>
  );
}
