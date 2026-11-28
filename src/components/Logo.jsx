import React from 'react';

export function InComputeMark({ size = 30 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="36" height="36" rx="8" fill="#0230C8" />
      <path
        d="M12.5 12L7.5 18L12.5 24"
        stroke="#FFFFFF"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.5 12L28.5 18L23.5 24"
        stroke="#FFFFFF"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 9.5L19.4 14.6L24.5 16L19.4 17.4L18 22.5L16.6 17.4L11.5 16L16.6 14.6L18 9.5Z"
        fill="#FFD306"
      />
    </svg>
  );
}

export default function Logo({ height = 34, onDark = false }) {
  const wrapperStyle = onDark
    ? {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.55rem',
      }
    : {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.55rem',
      };

  return (
    <span style={wrapperStyle}>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          backgroundColor: '#02127A',
          padding: '4px 8px',
          borderRadius: '6px',
        }}
      >
        <img
          src="/inspiria-logo.png"
          alt="Inspiria Knowledge Campus"
          style={{
            height: `${height}px`,
            width: 'auto',
            display: 'block',
            objectFit: 'contain',
          }}
        />
      </span>
    </span>
  );
}
