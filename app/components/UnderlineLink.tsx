interface UnderlineLinkProps {
  text: string;
  href?: string;
  className?: string;
  fontSize?: string;
  lineHeight?: string;
  letterSpacing?: string;
}

export default function UnderlineLink({ 
  text, 
  href = '#', 
  className = '',
  fontSize = '24px',
  lineHeight = '1.867em',
  letterSpacing = '-0.053em'
}: UnderlineLinkProps) {
  return (
    <a 
      href={href}
      className={`inline-flex items-center gap-2 relative w-fit pb-1 md:text-[32px] md:leading-[1.4em] md:tracking-[-0.04em] ${className}`}
      style={{ 
        fontFamily: 'Manrope, sans-serif',
        fontSize,
        fontWeight: 600,
        lineHeight,
        letterSpacing,
        color: '#191919'
      }}
    >
      {text}
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-8 md:h-8">
        <path d="M7.7 7.33L24.67 24.3M24.67 7.33L7.7 24.3" stroke="#191919" strokeWidth="2.67" strokeLinecap="round"/>
      </svg>
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#191919] md:h-[2px]"></span>
    </a>
  );
}

