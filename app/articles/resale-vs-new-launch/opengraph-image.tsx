import { ImageResponse } from 'next/og'

export const colors = {
    background: '#1e293b', // Slate 800
    primary: '#059669', // Emerald 600
    danger: '#dc2626', // Red 600
    text: '#ffffff',
}

export const runtime = 'edge'

export const alt = 'The Upgrader\'s Dilemma: Resale vs. New Launch'
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
                {/* Background Pattern */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'linear-gradient(45deg, #0f172a 25%, transparent 25%, transparent 75%, #0f172a 75%, #0f172a), linear-gradient(45deg, #0f172a 25%, transparent 25%, transparent 75%, #0f172a 75%, #0f172a)',
                    backgroundSize: '60px 60px',
                    backgroundPosition: '0 0, 30px 30px',
                    opacity: 0.2,
                }} />

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        maxWidth: '900px',
                        padding: '50px',
                        backgroundColor: 'rgba(30, 41, 59, 0.8)',
                        borderRadius: '24px',
                        border: '1px solid #334155',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    <div style={{
                        display: 'flex',
                        gap: '20px',
                        marginBottom: '30px',
                        fontSize: 24,
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '2px'
                    }}>
                        <span style={{ color: colors.primary }}>Resale</span>
                        <span style={{ color: '#94a3b8' }}>VS</span>
                        <span style={{ color: colors.danger }}>New Launch</span>
                    </div>

                    <div
                        style={{
                            fontSize: 64,
                            fontWeight: 900,
                            color: colors.text,
                            lineHeight: 1.1,
                            marginBottom: 24,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                        }}
                    >
                        <span>The Upgrader's</span>
                        <span style={{ color: colors.primary }}>Dilemma</span>
                    </div>

                    <div
                        style={{
                            fontSize: 28,
                            color: '#cbd5e1',
                            marginTop: 10,
                            maxWidth: '700px',
                            lineHeight: 1.4,
                        }}
                    >
                        Timeline Trap • Price Gap • Opportunity Cost
                    </div>

                    <div style={{
                        marginTop: '40px',
                        padding: '12px 24px',
                        background: colors.primary,
                        borderRadius: '50px',
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}>
                        Interactive Calculator Inside
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
