import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-[var(--border-primary)] bg-[var(--bg-secondary)] py-3 px-4 flex items-center justify-center gap-2 text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider">
      <div className="flex items-center gap-1" aria-hidden="true">
        <div className="flex flex-col gap-0.5">
          <span className="w-[3px] h-[3px] rounded-full bg-[var(--text-tertiary)]" />
          <span className="w-[3px] h-[3px] rounded-full bg-[#00d084]" />
          <span className="w-[3px] h-[3px] rounded-full bg-[var(--text-tertiary)]" />
        </div>
        <svg className="w-3 h-3 text-[#00d084]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 4 14 10 6 16" />
        </svg>
      </div>
      <span>Powered by G360</span>
    </footer>
  );
};

export default Footer;
