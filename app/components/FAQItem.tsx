interface FAQItemProps {
  question: string;
}

export default function FAQItem({ question }: FAQItemProps) {
  return (
    <div className="w-full rounded-2xl bg-[#F5F5F5] p-6 flex items-center justify-between">
      <h3 
        className="text-[#191919]"
        style={{
          fontFamily: 'Geist, sans-serif',
          fontSize: '18px',
          fontWeight: 400,
          lineHeight: '1.5em',
          letterSpacing: '-0.04em'
        }}
      >
        {question}
      </h3>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19M5 12H19" stroke="#191919" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

