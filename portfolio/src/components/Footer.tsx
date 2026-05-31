const LINKS = [
  { label: "Github", href: "https://github.com/xu-qianyi" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/marttaxu" },
  { label: "X", href: "https://x.com/littlemartta" },
];

const linkStyle = {
  fontSize: "13px",
  fontWeight: 450,
  color: "rgba(26, 26, 26, 0.55)",
  textDecoration: "none",
} as const;

export default function Footer() {
  return (
    <footer className="flex items-center justify-center py-5 px-6">
      <div className="flex items-center gap-1">
        {LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="outline-none rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-ink)] transition-colors h-8 px-3 flex items-center hover:bg-[var(--color-subtle)]"
            style={linkStyle}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}
