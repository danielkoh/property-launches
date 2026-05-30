import { ImageResponse } from 'next/og'

export const colors = {
    background: '#101922', // Dark background to match Modern Singapore Luxury
    primary: '#c5a059', // Accent gold color
    text: '#ffffff',
}

export const runtime = 'edge'

export const alt = 'New Launch Singapore - Market Insights & Property Analysis'
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
                {/* Abstract Background Elements */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '800px',
                    height: '800px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(197, 160, 89, 0.15) 0%, rgba(16, 25, 34, 0) 70%)',
                }} />

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        zIndex: 10,
                    }}
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '32px',
                        background: colors.primary,
                        borderRadius: '24px',
                        padding: '16px',
                        width: '80px',
                        height: '80px',
                    }}>
                        {/* Article/Insights Icon */}
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3ZM5 19V5H19V19H5Z" />
                            <path d="M7 7H17V9H7V7Z" />
                            <path d="M7 11H17V13H7V11Z" />
                            <path d="M7 15H14V17H7V15Z" />
                        </svg>
                    </div>

                    <div
                        style={{
                            fontSize: 70,
                            fontWeight: 900,
                            color: colors.text,
                            lineHeight: 1.1,
                            marginBottom: 20,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <span>Market Insights</span>
                        <span style={{
                            background: 'linear-gradient(90deg, #f59e0b, #c5a059)',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}>& Analysis</span>
                    </div>

                    <div
                        style={{
                            fontSize: 28,
                            color: '#94a3b8',
                            maxWidth: '800px',
                            lineHeight: 1.5,
                        }}
                    >
                        Data-Driven Perspectives on Singapore Real Estate
                    </div>
                </div>

                <div style={{
                    position: 'absolute',
                    bottom: '40px',
                    fontSize: 20,
                    color: '#c5a059',
                    fontWeight: 'bold',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                }}>
                    New Launch Singapore
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
