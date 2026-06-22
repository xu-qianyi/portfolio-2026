type Item = {
  field: string;
  school: string;
  year: string;
};

const ITEMS: Item[] = [
  {
    field: "Design + Engineering",
    school: "Northeastern University",
    year: "2026",
  },
  {
    field: "Finance",
    school: "Boston College",
    year: "2022",
  },
];

const DIVIDER = "1px solid color-mix(in srgb, var(--color-ink) 9%, transparent)";

export default function Education() {
  return (
    <ul style={{ borderBottom: DIVIDER, margin: 0, padding: 0, listStyle: "none" }}>
      {ITEMS.map((item) => (
        <li key={item.field} style={{ borderTop: DIVIDER, padding: "28px 0" }}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "15px",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  color: "var(--color-ink)",
                }}
              >
                {item.field}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "15px",
                  fontWeight: 450,
                  letterSpacing: "-0.01em",
                  color: "var(--color-muted)",
                  marginTop: "8px",
                }}
              >
                {item.school}
              </div>
            </div>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                fontWeight: 450,
                letterSpacing: "-0.01em",
                color: "var(--color-muted)",
                whiteSpace: "nowrap",
              }}
            >
              {item.year}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
