interface LogoProps {
  size?: number;
  color?: string;
  threadColor?: string;
}

// Elegant sewing needle with thread mark for D´JAS Fashion
export function LogoMark({ size = 36, color = "#C9A84C", threadColor = "#4A1942" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="needle-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="60%" stopColor={color} stopOpacity="0.85" />
          <stop offset="100%" stopColor={color} stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Needle body — angled, tapered, elegant */}
      <path
        d="M34 6 L37 9 L18 40 L14.5 42.5 L15 38.5 Z"
        fill="url(#needle-grad)"
      />

      {/* Needle eye — oval opening near the top */}
      <ellipse
        cx="31.5"
        cy="11"
        rx="2.2"
        ry="1.3"
        transform="rotate(45 31.5 11)"
        fill="none"
        stroke="white"
        strokeWidth="1.1"
      />

      {/* Thread — enters through eye, loops with an elegant S-curve */}
      <path
        d="M28 8 C23 3 13 5 10 13 C8 18 11 24 17 22 C21 20 22 15 18 13"
        stroke={threadColor}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Thread tail hanging below needle eye */}
      <path
        d="M28 8 L31.5 11"
        stroke={threadColor}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

interface LogoFullProps {
  light?: boolean;
  size?: "sm" | "md" | "lg";
}

export function LogoFull({ light = false, size = "md" }: LogoFullProps) {
  const textColor = light ? "#FAF7F2" : "#2C1F14";
  const subColor = light ? "rgba(250,247,242,0.6)" : "#8B7355";
  const markColor = light ? "#C9A84C" : "#C9A84C";
  const threadCol = light ? "rgba(250,247,242,0.7)" : "#4A1942";

  const sizes = {
    sm: { mark: 26, name: "text-lg", sub: "text-[8px]" },
    md: { mark: 32, name: "text-xl", sub: "text-[9px]" },
    lg: { mark: 44, name: "text-3xl", sub: "text-xs" },
  };
  const s = sizes[size];

  return (
    <div className="flex items-center gap-2.5 select-none">
      <LogoMark size={s.mark} color={markColor} threadColor={threadCol} />
      <div>
        <div
          className={`font-['Playfair_Display'] ${s.name} font-semibold leading-none tracking-wide`}
          style={{ color: textColor, letterSpacing: "0.04em" }}
        >
          D´JAS
        </div>
        <div
          className={`font-[Lato] ${s.sub} tracking-[0.3em] uppercase leading-none mt-0.5`}
          style={{ color: subColor }}
        >
          Fashion
        </div>
      </div>
    </div>
  );
}
