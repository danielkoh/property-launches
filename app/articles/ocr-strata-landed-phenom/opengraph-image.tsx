import { ImageResponse } from 'next/og'

export const colors = {
    background: '#ffffff',
    primary: '#3b82f6', // Blue 500
    secondary: '#f59e0b', // Amber 500
    tertiary: '#10b981', // Emerald 500
    text: '#0f172a', // Slate 900
}

export const runtime = 'edge'

export const alt = 'The OCR Strata Landed Phenom: Up to $1.45M Gains in 3 Years'
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
                    backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)',
                    backgroundSize: '30px 30px',
                    opacity: 0.3,
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
                        maxWidth: '960px',
                        padding: '60px',
                        backgroundColor: 'rgba(255,255,255,0.92)',
                        borderRadius: '24px',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
                        border: '1px solid #e2e8f0',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            gap: '12px',
                            marginBottom: '28px'
                        }}
                    >
                        <div style={{ padding: '8px 16px', borderRadius: '20px', backgroundColor: '#eff6ff', color: colors.primary, fontSize: 16, fontWeight: 'bold' }}>Landed Focus</div>
                        <div style={{ padding: '8px 16px', borderRadius: '20px', backgroundColor: '#fef3c7', color: colors.secondary, fontSize: 16, fontWeight: 'bold' }}>ROI Analysis</div>
                        <div style={{ padding: '8px 16px', borderRadius: '20px', backgroundColor: '#ecfdf5', color: colors.tertiary, fontSize: 16, fontWeight: 'bold' }}>OCR Enclaves</div>
                    </div>

                    <div
                        style={{
                            fontSize: 64,
                            fontWeight: 900,
                            color: colors.text,
                            lineHeight: 1.15,
                            marginBottom: 24,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <span>The OCR Strata</span>
                        <span style={{
                            background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}>Landed Phenom</span>
                    </div>

                    <div
                        style={{
                            fontSize: 26,
                            color: '#475569',
                            lineHeight: 1.4,
                            maxWidth: '800px',
                            fontWeight: 500,
                        }}
                    >
                        How a &quot;Stagnant&quot; Asset Class Netted Buyers Up to $1.45M Profit in 3 Years
                    </div>

                    <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#1A202C', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C5A059', fontWeight: 'bold', fontSize: 24 }}>NL</div>
                        <div style={{ fontSize: 22, fontWeight: 'bold', color: '#0f172a' }}>New Launch SG</div>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
                        <div style={{ fontSize: 18, color: '#64748b', fontWeight: 500 }}>Daniel Koh • Property Analyst</div>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
