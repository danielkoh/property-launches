import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'The Five Dragons of Singapore - New Launch Singapore';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    padding: '80px',
                    position: 'relative',
                }}
            >
                {/* Background Pattern */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.1,
                    backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255,255,255,0.2) 2%, transparent 0%)',
                    backgroundSize: '100px 100px',
                }} />

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px',
                    color: '#c5a059', // Gold accent
                    fontSize: '24px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                }}>
                    New Launch Insights
                </div>

                <div style={{
                    fontSize: '64px',
                    fontWeight: 900,
                    color: 'white',
                    lineHeight: 1.1,
                    marginBottom: '30px',
                    maxWidth: '900px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                }}>
                    <span>The Five Dragons</span>
                    <span style={{ color: '#10b981' }}>of Singapore</span>
                </div>

                <div style={{
                    fontSize: '28px',
                    color: '#94a3b8',
                    maxWidth: '800px',
                    lineHeight: 1.5,
                }}>
                    Mapping the Geomancy & Prosperity Lines of the Lion City.
                </div>

                <div style={{
                    position: 'absolute',
                    bottom: '60px',
                    right: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    padding: '12px 24px',
                    borderRadius: '50px',
                    border: '1px solid rgba(255,255,255,0.2)',
                }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#3b82f6' }}></div>
                    <span style={{ color: 'white', fontSize: '18px', fontWeight: 600 }}>Interactive Map</span>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
