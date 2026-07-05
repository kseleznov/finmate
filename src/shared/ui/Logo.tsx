import * as React from 'react';

type Props = React.SVGProps<SVGSVGElement>;

export function Logo(props: Props) {
  return (
    <svg viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7D73FF" />
          <stop offset="100%" stopColor="#4435F1" />
        </linearGradient>

        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="18" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Background */}
      <rect x={32} y={32} width={960} height={960} rx={180} fill="url(#bg)" filter="url(#shadow)" />

      {/* Eyes */}
      <rect x={300} y={255} width={58} height={140} rx={29} fill="#162347" />

      <rect x={666} y={255} width={58} height={140} rx={29} fill="#162347" />

      {/* Smile */}
      <path
        d="M430 452C470 500 554 500 594 452"
        stroke="#162347"
        strokeWidth={22}
        strokeLinecap="round"
      />

      {/* Bars */}
      <rect x={300} y={730} width={112} height={128} rx={16} fill="white" />

      <rect x={500} y={640} width={112} height={218} rx={16} fill="white" />

      <rect x={720} y={470} width={112} height={388} rx={16} fill="white" />

      {/* Graph */}
      <path
        d="M70 865C180 640 330 565 520 548C675 535 760 470 815 410"
        stroke="white"
        strokeWidth={42}
        strokeLinecap="round"
        fill="none"
      />

      {/* Circle */}
      <circle cx={845} cy={390} r={52} stroke="white" strokeWidth={28} />

      {/* Highlight */}
      <path d="M720 470L720 770C760 745 790 700 815 410" fill="rgba(255,255,255,0.14)" />
    </svg>
  );
}
