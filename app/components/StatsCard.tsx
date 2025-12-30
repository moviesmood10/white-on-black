interface StatsCardProps {
  value: string;
  description: string;
}

export default function StatsCard({ value, description }: StatsCardProps) {
  return (
    <div className="flex-1 flex flex-col gap-4 p-6 rounded-[28px]" style={{ background: 'rgba(255, 255, 255, 0.32)', backdropFilter: 'blur(24px)' }}>
      <h3 
        className="text-white text-center text-[48px] leading-[1.4em] tracking-[-0.102em] md:text-[70px] md:leading-[1.1em] md:tracking-[-0.07em]"
        style={{
          fontFamily: 'Halant, serif',
          fontWeight: 400
        }}
      >
        {value}
      </h3>
      <p 
        className="text-white text-center"
        style={{
          fontFamily: 'Geist, sans-serif',
          fontSize: '17.9px',
          fontWeight: 400,
          lineHeight: '1.508em',
          letterSpacing: '-0.04em',
          opacity: 0.9
        }}
      >
        {description}
      </p>
    </div>
  );
}

