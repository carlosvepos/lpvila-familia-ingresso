export const LogoMark = ({ className = "h-9 w-9" }) => (
  <svg viewBox="0 0 44 44" className={className} aria-hidden="true" data-testid="logo-mark">
    <path
      d="M22 5.2c.6 0 1.2.2 1.7.5l13 8.6c1.5 1 2.3 2.6 2.3 4.4V36a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3V18.7c0-1.8.9-3.4 2.3-4.4l13-8.6c.5-.3 1.1-.5 1.7-.5Z"
      fill="currentColor"
      className="text-forest"
    />
    <path
      d="M22 32.6c-.4 0-.8-.1-1.1-.4-3.2-2.4-6.4-5-6.4-8.1 0-2.4 1.9-4.3 4.2-4.3 1.3 0 2.5.6 3.3 1.6a4.2 4.2 0 0 1 3.3-1.6c2.3 0 4.2 1.9 4.2 4.3 0 3.1-3.2 5.7-6.4 8.1-.3.3-.7.4-1.1.4Z"
      fill="#E5A836"
    />
  </svg>
);

export const Logo = ({ dark = false }) => (
  <span className="flex items-center gap-2.5" data-testid="logo">
    <LogoMark className="h-9 w-9" />
    <span
      className={`font-display text-xl font-black leading-none tracking-tight ${
        dark ? "text-cream" : "text-forest"
      }`}
    >
      Vila<span className={dark ? "text-sun" : "text-terra"}>Família</span>
    </span>
  </span>
);
