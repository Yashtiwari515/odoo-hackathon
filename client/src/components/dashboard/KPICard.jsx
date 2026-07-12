const ACCENTS = {
  blue: { bar: "bg-[#0F6E6B]", text: "text-[#0F6E6B]", chip: "bg-[#0F6E6B]/10" },
  green: { bar: "bg-emerald-600", text: "text-emerald-700", chip: "bg-emerald-50" },
  orange: { bar: "bg-[#E8590C]", text: "text-[#E8590C]", chip: "bg-[#E8590C]/10" },
  red: { bar: "bg-[#C81E3A]", text: "text-[#C81E3A]", chip: "bg-[#C81E3A]/10" },
};

const ICONS = {
  truck: (
    <path d="M3 7h11v8H3V7zm11 3h4l3 3v2h-7v-5zM6 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm11 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
  ),
  user: (
    <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-7 2-7 4.5V20h14v-1.5c0-2.5-3-4.5-7-4.5z" />
  ),
  route: (
    <path d="M6 5a2 2 0 100 4 2 2 0 000-4zm12 10a2 2 0 100 4 2 2 0 000-4zM6 9v3a3 3 0 003 3h6" />
  ),
  wrench: (
    <path d="M14.7 6.3a4 4 0 00-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 005.4-5.4l-2.5 2.5-2-2 2.5-2.5z" />
  ),
};

export default function KPICard({ label, value, accent = "blue", icon }) {
  const c = ACCENTS[accent] ?? ACCENTS.blue;

  return (
    <div className="relative bg-white border border-[#E4E2DC] rounded-md pl-5 pr-4 py-4 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <span className={`absolute left-0 top-0 h-full w-1 ${c.bar}`} />

      <div className="flex items-start justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
          {label}
        </p>
        {icon && ICONS[icon] && (
          <span className={`w-7 h-7 rounded-md flex items-center justify-center ${c.chip}`}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`w-4 h-4 ${c.text}`}
            >
              {ICONS[icon]}
            </svg>
          </span>
        )}
      </div>

      <p
        className={`font-mono text-3xl font-semibold mt-1.5 ${c.text}`}
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </p>
    </div>
  );
}