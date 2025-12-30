interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '',
  onClick,
  type = 'button',
  style
}: ButtonProps) {
  const baseStyles: React.CSSProperties = {
    fontFamily: 'Geist, sans-serif',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '1.5em',
    letterSpacing: '-0.04em'
  };

  const variants = {
    primary: {
      backgroundColor: '#191919',
      color: '#FFFFFF'
    },
    secondary: {
      backgroundColor: '#FAF6F2',
      color: '#191919'
    },
    outline: {
      backgroundColor: '#E6E6E6',
      color: '#191919'
    }
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-xl transition-opacity hover:opacity-80 ${className}`}
      style={{ ...baseStyles, ...variants[variant], ...style }}
    >
      {children}
    </button>
  );
}

