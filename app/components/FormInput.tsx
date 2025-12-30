interface FormInputProps {
  type?: 'text' | 'email';
  placeholder: string;
  name?: string;
  required?: boolean;
}

export default function FormInput({ type = 'text', placeholder, name, required }: FormInputProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      className="w-full px-5 py-5 bg-[#E6E6E6] rounded-xl text-[16px] font-normal placeholder:text-[#191919]/30"
      style={{ fontFamily: 'Geist, sans-serif' }}
    />
  );
}

