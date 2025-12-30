interface SectionLabelProps {
  text: string;
  className?: string;
}

export default function SectionLabel({ text, className = '' }: SectionLabelProps) {
  return (
    <span 
      className={`text-[#0C120C] ${className}`}
      style={{
        fontFamily: 'Manrope, sans-serif',
        fontSize: '18px',
        fontWeight: 500,
        lineHeight: '1.4em',
        letterSpacing: '-0.02em'
      }}
    >
      {text}
    </span>
  );
}

