interface RadioButtonProps {
  value: string;
  label: string;
  name: string;
  defaultChecked?: boolean;
}

export default function RadioButton({ value, label, name, defaultChecked }: RadioButtonProps) {
  return (
    <label className="flex items-center gap-2.5 px-4 py-3 bg-[#E6E6E6] rounded-xl cursor-pointer">
      <input 
        type="radio" 
        name={name} 
        value={value} 
        defaultChecked={defaultChecked}
        className="w-3.5 h-3.5" 
      />
      <span 
        className="text-[#191919]"
        style={{
          fontFamily: 'Geist, sans-serif',
          fontSize: '12px',
          fontWeight: 400,
          lineHeight: '1.5em',
          letterSpacing: '-0.04em'
        }}
      >
        {label}
      </span>
    </label>
  );
}

