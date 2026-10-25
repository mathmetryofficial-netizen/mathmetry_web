import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 ${isCenter ? 'text-center flex flex-col items-center' : 'text-left'} ${className}`}>
      {eyebrow && (
        <span className="inline-block text-xs font-bold uppercase tracking-[0.22em] text-[#F36A21] mb-2.5">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111111] leading-tight">
        {title}{' '}
        {highlight && (
          <span className="text-[#F36A21]">{highlight}</span>
        )}
      </h2>
      {/* Short orange underline accent from reference design */}
      <div className={`w-12 h-1 bg-[#F36A21] rounded-full mt-3 mb-4 ${isCenter ? 'mx-auto' : ''}`} />
      {subtitle && (
        <p className="text-base sm:text-lg text-[#626262] max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
