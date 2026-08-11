import { ImageResponse } from 'next/og';
import { portfolio } from '@/content/portfolio';

/**
 * Generated Open Graph / Twitter card (1200×630). Because it is generated from
 * portfolio.ts, the card updates the moment you edit your headline. Next wires
 * this file into <meta og:image> automatically, so no manual metadata is needed.
 */
export const alt = `${portfolio.name}, ${portfolio.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#060709',
          color: '#f5f6f8',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -200,
            left: -140,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(99,179,255,0.35), rgba(6,7,9,0))',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -240,
            right: -160,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(167,139,250,0.32), rgba(6,7,9,0))',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #63b3ff, #a78bfa)',
              color: '#060709',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            {portfolio.initials}
          </div>
          <div style={{ fontSize: 22, color: '#a1a7b2' }}>{portfolio.location.split(' · ')[0]}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 68, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
            {portfolio.name}
          </div>
          <div style={{ fontSize: 34, color: '#63b3ff', letterSpacing: -0.5 }}>
            {`${portfolio.title} · ${portfolio.subtitle}`}
          </div>
          <div style={{ fontSize: 24, color: '#a1a7b2', maxWidth: 900, lineHeight: 1.4 }}>
            {portfolio.headline}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 40, fontSize: 20, color: '#a1a7b2' }}>
          {portfolio.whyHire.slice(0, 3).map((w) => (
            <div key={w.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ color: '#f5f6f8', fontSize: 30, fontWeight: 700 }}>{w.metric}</span>
              <span>{w.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
