import { ImageResponse } from 'next/og';
import { portfolio } from '@/content/portfolio';

// Generated favicon: monogram on the brand gradient. No binary asset needed.
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #63b3ff, #a78bfa)',
          color: '#060709',
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: -1,
          borderRadius: 14,
        }}
      >
        {portfolio.initials}
      </div>
    ),
    size,
  );
}
