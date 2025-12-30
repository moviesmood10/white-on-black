interface FormTextareaProps {
  placeholder: string;
  name?: string;
  rows?: number;
}

export default function FormTextarea({ placeholder, name, rows = 6 }: FormTextareaProps) {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-5 py-5 bg-[#E6E6E6] rounded-xl text-[16px] font-normal placeholder:text-[#191919]/30 resize-none"
      style={{ fontFamily: 'Geist, sans-serif', minHeight: '150px' }}
    />
  );
}

