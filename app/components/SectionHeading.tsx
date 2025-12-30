interface SectionHeadingProps {
  text: string;
  className?: string;
  align?: 'left' | 'center';
  fontFamily?: 'Manrope' | 'Halant';
}

export default function SectionHeading({ 
  text, 
  className = '',
  align = 'left',
  fontFamily = 'Halant'
}: SectionHeadingProps) {
  return (
    <h2 
      className={`text-[#191919] ${className} ${align === 'center' ? 'text-center' : ''}`}
      style={{
        fontFamily: `${fontFamily}, ${fontFamily === 'Halant' ? 'serif' : 'sans-serif'}`,
        fontWeight: 400
      }}
    >
      {text}
    </h2>
  );
}

