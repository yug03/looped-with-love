export function YarnIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="currentColor" fillOpacity="0.15" />
      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" />
      <path d="M8 20 Q14 10 20 20 Q26 30 32 20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M10 14 Q18 8 26 14 Q34 20 26 26 Q18 32 10 26 Q2 20 10 14" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M28 10 L28 22 Q28 26 24 26 Q20 26 20 22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function YarnBallSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="50" fill="currentColor" fillOpacity="0.12" />
      <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="3" strokeOpacity="0.4" />
      <ellipse cx="60" cy="60" rx="20" ry="50" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
      <ellipse cx="60" cy="60" rx="50" ry="20" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
      <path d="M15 45 Q35 20 60 30 Q85 40 105 60" stroke="currentColor" strokeWidth="2.5" fill="none" strokeOpacity="0.5" strokeLinecap="round" />
      <path d="M10 65 Q30 85 60 80 Q90 75 110 55" stroke="currentColor" strokeWidth="2.5" fill="none" strokeOpacity="0.5" strokeLinecap="round" />
    </svg>
  );
}

export function StitchPatternSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 10 }).map((_, i) => (
        <g key={i} transform={`translate(${i * 20}, 0)`}>
          <path d={`M5 20 C5 10, 15 10, 15 20 C15 30, 5 30, 5 20`} stroke="currentColor" strokeWidth="1.5" fill="none" strokeOpacity="0.4" />
        </g>
      ))}
    </svg>
  );
}
