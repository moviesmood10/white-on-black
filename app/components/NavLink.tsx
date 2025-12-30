interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  return (
    <a 
      href={href} 
      className="px-4 py-2 rounded-lg text-[#191919] hover:opacity-70 transition-opacity" 
      style={{ fontFamily: 'Geist, sans-serif', fontSize: '12px', fontWeight: 400, lineHeight: '1.5em', letterSpacing: '-0.04em' }}
    >
      {children}
    </a>
  );
}

