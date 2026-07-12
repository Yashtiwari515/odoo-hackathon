export default function FleetIllustration({ className = "" }) {
  return (
    <svg viewBox="0 0 480 260" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* dashed route */}
      <path
        d="M20 210 C 120 210, 100 90, 200 90 S 300 190, 400 130 S 440 60, 470 40"
        stroke="#E8590C"
        strokeWidth="2.5"
        strokeDasharray="1 10"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* route nodes */}
      <circle cx="20" cy="210" r="5" fill="#E8590C" />
      <circle cx="200" cy="90" r="5" fill="#0F6E6B" />
      <circle cx="470" cy="40" r="5" fill="#0F6E6B" />

      {/* truck 1 */}
      <g transform="translate(60 150)">
        <rect x="0" y="10" width="52" height="26" rx="3" fill="#1C2430" stroke="#E8590C" strokeWidth="1.5" />
        <rect x="52" y="16" width="24" height="20" rx="3" fill="#1C2430" stroke="#E8590C" strokeWidth="1.5" />
        <rect x="58" y="20" width="10" height="8" rx="1" fill="#E8590C" opacity="0.6" />
        <circle cx="16" cy="40" r="6" fill="#0B0F14" stroke="#6B7280" strokeWidth="1.5" />
        <circle cx="62" cy="40" r="6" fill="#0B0F14" stroke="#6B7280" strokeWidth="1.5" />
      </g>

      {/* truck 2 (smaller, further) */}
      <g transform="translate(270 145)" opacity="0.85">
        <rect x="0" y="8" width="40" height="20" rx="2.5" fill="#1C2430" stroke="#0F6E6B" strokeWidth="1.5" />
        <rect x="40" y="12" width="18" height="16" rx="2.5" fill="#1C2430" stroke="#0F6E6B" strokeWidth="1.5" />
        <circle cx="12" cy="30" r="4.5" fill="#0B0F14" stroke="#6B7280" strokeWidth="1.2" />
        <circle cx="47" cy="30" r="4.5" fill="#0B0F14" stroke="#6B7280" strokeWidth="1.2" />
      </g>

      {/* warehouse marker */}
      <g transform="translate(390 20)">
        <path d="M0 20 L18 6 L36 20 V38 H0 Z" fill="#1C2430" stroke="#0F6E6B" strokeWidth="1.5" />
        <rect x="14" y="26" width="8" height="12" fill="#0F6E6B" opacity="0.5" />
      </g>

      {/* scattered dots for texture */}
      <circle cx="130" cy="40" r="2" fill="#6B7280" opacity="0.4" />
      <circle cx="350" cy="200" r="2" fill="#6B7280" opacity="0.4" />
      <circle cx="230" cy="220" r="2" fill="#6B7280" opacity="0.4" />
    </svg>
  );
}