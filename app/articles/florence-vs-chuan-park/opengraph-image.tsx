import { ImageResponse } from 'next/og'

export const d19Colors = {
    background: '#0a192f', // Slate 900
    primary: '#3b82f6', // Blue 500
    accent: '#f59e0b', // Amber 500
    text: '#ffffff',
}

export const runtime = 'edge'

// Image metadata
export const alt = 'Florence Residences vs Chuan Park - Capital Appreciation Analysis'
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
                    backgroundColor: d19Colors.background,
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
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '10px',
                        background: `linear-gradient(90deg, ${d19Colors.primary}, ${d19Colors.accent})`,
                    }}
                />

                {/* Decorative Circles */}
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: d19Colors.primary,
                    opacity: 0.1,
                    filter: 'blur(40px)',
                }} />

                <div style={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '10%',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: d19Colors.accent,
                    opacity: 0.1,
                    filter: 'blur(50px)',
                }} />

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        maxWidth: '900px',
                        padding: '40px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '20px',
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <div
                        style={{
                            fontSize: 32,
                            fontWeight: 'bold',
                            color: d19Colors.primary,
                            marginBottom: 20,
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                        }}
                    >
                        District 19 Analysis
                    </div>
                    <div
                        style={{
                            fontSize: 64,
                            fontWeight: 900,
                            color: d19Colors.text,
                            lineHeight: 1.1,
                            marginBottom: 30,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <span>Florence Residences</span>
                        <span style={{ fontSize: 32, opacity: 0.7, margin: '10px 0' }}>VS</span>
                        <span style={{ color: d19Colors.accent }}>Chuan Park</span>
                    </div>
                    <div
                        style={{
                            fontSize: 24,
                            color: '#94a3b8',
                            marginTop: 10,
                        }}
                    >
                        New Launch Singapore • Market Insights
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
