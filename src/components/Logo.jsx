import React from 'react';

export default function Logo({ height = 38, onDark = false }) {
  const wrapperStyle = onDark
    ? {
        display: 'inline-flex',
        alignItems: 'center',
      }
    : {
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: '#02127A',
        padding: '4px 10px',
        borderRadius: '6px',
      };

  return (
    <span style={wrapperStyle}>
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
  );
}
