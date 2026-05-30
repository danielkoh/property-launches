import { ImageResponse } from 'next/og'

export const colors = {
    background: '#ffffff',
    primary: '#10b981', // Emerald 500
    secondary: '#8b5cf6', // Violet 500
    tertiary: '#f43f5e', // Rose 500
    text: '#1e293b', // Slate 800
}

export const runtime = 'edge'

export const alt = 'D19 Sub-Area Analysis - Livability and Capital Gain Potential'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    backgroundColor: colors.background,
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    position: 'relative'
                }}
            >
                {/* Background Grid Pattern */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    opacity: 0.5,
                }} />

                {/* Corner Accents */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '12px', background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, ${colors.tertiary})` }} />

                {/* Content Container */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        maxWidth: '900px',
                        padding: '60px',
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        borderRadius: '30px',
                        boxShadow: '0 20px 50px -12px rgba(0,0,0,0.1)',
                        border: '1px solid #e2e8f0',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            gap: '12px',
                            marginBottom: '24px'
                        }}
                    >
                        <div style={{ padding: '8px 16px', borderRadius: '20px', backgroundColor: '#ecfdf5', color: colors.primary, fontSize: 16, fontWeight: 'bold' }}>Livability</div>
                        <div style={{ padding: '8px 16px', borderRadius: '20px', backgroundColor: '#f5f3ff', color: colors.secondary, fontSize: 16, fontWeight: 'bold' }}>Capital Gain</div>
                    </div>

                    <div
                        style={{
                            fontSize: 72,
                            fontWeight: 900,
                            color: colors.text,
                            lineHeight: 1.1,
                            marginBottom: 24,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <span>D19 Sub-Area</span>
                        <span style={{
                            background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}>Analysis Matrix</span>
                    </div>

                    <div
                        style={{
                            fontSize: 28,
                            color: '#64748b',
                            lineHeight: 1.4,
                            maxWidth: '700px',
                        }}
                    >
                        Hougang/Kovan • Serangoon • Punggol • Bartley • Sengkang
                    </div>

                    <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#1A202C', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C5A059', fontWeight: 'bold', fontSize: 24 }}>NL</div>
                        <div style={{ fontSize: 24, fontWeight: 'bold', color: '#0f172a' }}>New Launch SG</div>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
