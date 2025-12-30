interface ApproachCardProps {
  number: string;
  title: string;
  description: string;
}

export default function ApproachCard({ number, title, description }: ApproachCardProps) {
  return (
    <div className="flex-1 flex flex-col gap-5">
      <span 
        className="text-[#191919] text-[48px] leading-[1.4em] tracking-[-0.07em]"
        style={{
          fontFamily: 'Manrope, sans-serif',
          fontWeight: 600
        }}
      >
        {number}
      </span>
      <h3 
        className="text-[#191919] text-[32px] leading-[1.4em] tracking-[-0.04em]"
        style={{
          fontFamily: 'Manrope, sans-serif',
          fontWeight: 600
        }}
      >
        {title}
      </h3>
      <p 
        className="text-[#191919] text-[20px] leading-[1.4em] tracking-[-0.02em] opacity-60"
        style={{
          fontFamily: 'Geist, sans-serif',
          fontWeight: 500
        }}
      >
        {description}
      </p>
    </div>
  );
}

