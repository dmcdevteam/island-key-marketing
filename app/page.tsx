'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RevealWrapper from '@/components/RevealWrapper'
import EnquiryForm from '@/components/EnquiryForm'
import Footer from '@/components/Footer'

type ActiveCard = 'host' | 'operator' | null

function CollaborateCard({
  type,
  title,
  subtitle,
  isActive,
  isOtherActive,
  onToggle,
}: {
  type: 'host' | 'operator'
  title: string
  subtitle: string
  isActive: boolean
  isOtherActive: boolean
  onToggle: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const isHost = type === 'host'

  return (
    <div
      className="collab-card"
      style={{
        position: 'relative',
        opacity: isOtherActive ? 0.3 : 1,
        transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1)',
        pointerEvents: isOtherActive ? 'none' : 'auto',
      }}
    >
      {/* Card header / button */}
      <div
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          cursor: 'pointer',
          padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem)',
          border: `1px solid ${isActive ? 'var(--gold)' : hovered ? 'rgba(196,165,90,0.5)' : 'rgba(253,252,250,0.08)'}`,
          background: isActive
            ? 'rgba(196,165,90,0.04)'
            : hovered
              ? 'rgba(253,252,250,0.02)'
              : 'transparent',
          transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
          overflow: 'hidden',
        }}
      >
        {/* Atmospheric corner glow */}
        <div style={{
          position: 'absolute',
          top: isHost ? 0 : 'auto',
          bottom: isHost ? 'auto' : 0,
          right: 0,
          width: '60%',
          height: '60%',
          background: isHost
            ? 'radial-gradient(ellipse at top right, rgba(196,165,90,0.04) 0%, transparent 70%)'
            : 'radial-gradient(ellipse at bottom right, rgba(26,138,125,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
          transition: 'opacity 0.5s ease',
          opacity: hovered || isActive ? 1 : 0,
        }} />

        {/* Accent line */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: isActive ? '100%' : hovered ? '60%' : '0%',
          height: 1,
          background: isHost
            ? 'linear-gradient(90deg, var(--gold), transparent)'
            : 'linear-gradient(90deg, var(--teal), transparent)',
          transition: 'width 0.6s cubic-bezier(0.16,1,0.3,1)',
        }} />

        {/* Icon */}
        <div style={{
          width: 48,
          height: 48,
          border: `1px solid ${isActive ? 'var(--gold)' : 'rgba(253,252,250,0.12)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto clamp(1.5rem, 3vw, 2.5rem)',
          transition: 'border-color 0.4s ease, transform 0.4s ease',
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        }}>
          {isHost ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isActive ? 'var(--gold)' : 'rgba(253,252,250,0.4)'} strokeWidth="1" style={{ transition: 'stroke 0.4s ease' }}>
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isActive ? 'var(--teal)' : 'rgba(253,252,250,0.4)'} strokeWidth="1" style={{ transition: 'stroke 0.4s ease' }}>
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
            </svg>
          )}
        </div>

        <h3 style={{
          fontFamily: 'var(--font-fraunces)',
          fontWeight: 200,
          fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
          color: 'var(--cream)',
          lineHeight: 1.15,
          marginBottom: '0.8rem',
          letterSpacing: '0.01em',
          textAlign: 'center',
        }}>
          {title}
        </h3>

        <p style={{
          fontFamily: 'var(--font-jakarta)',
          fontWeight: 300,
          fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)',
          color: 'var(--cream)',
          opacity: 0.45,
          lineHeight: 1.7,
          maxWidth: 340,
          margin: '0 auto',
          textAlign: 'center',
        }}>
          {subtitle}
        </p>

        {/* Toggle indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.6rem',
          marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
        }}>
          <span style={{
            fontFamily: 'var(--font-jakarta)',
            fontWeight: 300,
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--cream)',
            opacity: isActive ? 0.6 : 0.25,
            transition: 'opacity 0.3s ease',
          }}>
            {isActive ? 'Close' : 'Apply'}
          </span>
          <div style={{
            width: 24,
            height: 24,
            border: `1px solid ${isActive ? 'var(--gold)' : 'rgba(253,252,250,0.15)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
            transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)',
          }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <line x1="5" y1="1" x2="5" y2="9" stroke={isActive ? 'var(--gold)' : 'rgba(253,252,250,0.35)'} strokeWidth="0.8" style={{ transition: 'stroke 0.3s ease' }} />
              <line x1="1" y1="5" x2="9" y2="5" stroke={isActive ? 'var(--gold)' : 'rgba(253,252,250,0.35)'} strokeWidth="0.8" style={{ transition: 'stroke 0.3s ease' }} />
            </svg>
          </div>
        </div>
      </div>

      {/* Expanded form area */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 4vw, 3rem)',
              borderLeft: `1px solid rgba(253,252,250,0.08)`,
              borderRight: `1px solid rgba(253,252,250,0.08)`,
              borderBottom: `1px solid rgba(253,252,250,0.08)`,
              position: 'relative',
            }}>
              {/* Subtle top glow inside form */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '20%',
                width: '60%',
                height: 120,
                background: isHost
                  ? 'radial-gradient(ellipse at top, rgba(196,165,90,0.03) 0%, transparent 70%)'
                  : 'radial-gradient(ellipse at top, rgba(26,138,125,0.03) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />
              <EnquiryForm type={isHost ? 'host' : 'operator'} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState<ActiveCard>(null)

  // Scroll indicator fade
  useEffect(() => {
    const indicator = scrollIndicatorRef.current
    if (!indicator) return
    const onScroll = () => {
      indicator.style.opacity = window.scrollY > 60 ? '0' : '0.5'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleCard = (type: 'host' | 'operator') => {
    setActiveCard(prev => prev === type ? null : type)
    if (activeCard !== type) {
      setTimeout(() => {
        document.getElementById('collaborate')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }

  return (
    <main>
      {/* ═══ HERO ═══ */}
      <section style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
        {/* Dark background while video loads */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          backgroundColor: '#0d1a2e',
        }} />

        {/* Video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 2,
            opacity: videoReady ? 1 : 0,
            transition: 'opacity 1.2s ease',
          }}
        >
          <source src="/videos/reel.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 3,
          background: `
            linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.35) 85%, rgba(0,0,0,0.6) 100%),
            radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, rgba(0,0,0,0.35) 100%)
          `,
        }} />

        {/* Letterbox bars */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5.5vh', background: 'black', zIndex: 4 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '5.5vh', background: 'black', zIndex: 4 }} />

        {/* Content — logo only */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 10,
          width: '100%',
          padding: '0 2rem',
        }}>
          <img
            src="/logo.png"
            alt="Island Key"
            style={{
              height: 'clamp(220px, 26vw, 288px)',
              width: 'auto',
              margin: '0 auto 1.5rem',
              display: 'block',
              opacity: 0.92,
              filter: 'drop-shadow(0 4px 30px rgba(0,0,0,0.5))',
            }}
          />
          <p style={{
            fontFamily: 'var(--font-jakarta)',
            fontWeight: 400,
            fontSize: 'clamp(0.7rem, 1.4vw, 0.95rem)',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: 'var(--cream)',
            textShadow: '0 2px 12px rgba(0,0,0,0.6)',
          }}>
            Your island. Unlocked.
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            opacity: 0.5,
            transition: 'opacity 0.4s ease',
          }}
        >
          <div style={{
            width: 1,
            height: 40,
            background: 'var(--gold)',
            animation: 'scrollPulse 2s ease-in-out infinite',
            transformOrigin: 'top',
          }} />
        </div>
        <style jsx>{`
          @keyframes scrollPulse {
            0% { transform: scaleY(1); }
            50% { transform: scaleY(0.3); }
            100% { transform: scaleY(1); }
          }
          @media (max-width: 768px) {
            div[style*="height: 5.5vh"] { height: 3vh !important; }
          }
        `}</style>
      </section>

      {/* ═══ STATEMENT ═══ */}
      <section style={{
        background: '#0e0e0e',
        padding: 'clamp(60px, 12vh, 180px) clamp(2rem, 8vw, 120px)',
        position: 'relative',
      }}>
        <RevealWrapper>
          <div className="gold-rule" style={{ marginBottom: 'clamp(2rem, 4vh, 3.5rem)' }} />
          <p style={{
            fontFamily: 'var(--font-fraunces)',
            fontWeight: 200,
            fontStyle: 'italic',
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
            lineHeight: 1.25,
            maxWidth: 780,
            margin: '0 auto',
            textAlign: 'center',
            color: 'var(--cream)',
          }}>
            Crete has secrets most guests can&apos;t find. Island Key changes that.
          </p>
          <div className="gold-rule" style={{ marginTop: 'clamp(2rem, 4vh, 3.5rem)' }} />
        </RevealWrapper>
      </section>

      {/* ═══ COLLABORATE ═══ */}
      <section
        id="collaborate"
        style={{
          background: 'var(--ink)',
          padding: 'clamp(40px, 8vh, 140px) clamp(1.5rem, 6vw, 80px)',
          position: 'relative',
        }}
      >
        {/* Background atmospheric element */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: 900,
          height: '60%',
          background: 'radial-gradient(ellipse, rgba(27,45,79,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto' }}>
          <RevealWrapper>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vh, 5rem)' }}>
              <p style={{
                fontFamily: 'var(--font-jakarta)',
                fontWeight: 300,
                fontSize: '0.6rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: '1.2rem',
              }}>
                Join the network
              </p>
              <h2 style={{
                fontFamily: 'var(--font-fraunces)',
                fontWeight: 200,
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                color: 'var(--cream)',
                lineHeight: 1.1,
                letterSpacing: '0.02em',
                marginBottom: '1rem',
              }}>
                Collaborate with us.
              </h2>
              <div className="gold-rule" style={{ marginTop: '1.5rem' }} />
            </div>
          </RevealWrapper>

          {/* Cards */}
          <div className="collab-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(1rem, 2vw, 2rem)',
          }}>
            <RevealWrapper delay={100}>
              <CollaborateCard
                type="host"
                title="Property Owner, Hotel or Host"
                subtitle="Turn your property into a full experience. Island Key becomes the concierge layer your guests remember."
                isActive={activeCard === 'host'}
                isOtherActive={activeCard === 'operator'}
                onToggle={() => toggleCard('host')}
              />
            </RevealWrapper>
            <RevealWrapper delay={250}>
              <CollaborateCard
                type="operator"
                title="Experience &amp; Service Provider"
                subtitle="Join a curated network of trusted local experts. We bring the guests. You deliver the experience."
                isActive={activeCard === 'operator'}
                isOtherActive={activeCard === 'host'}
                onToggle={() => toggleCard('operator')}
              />
            </RevealWrapper>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 768px) {
            .collab-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      <Footer />
    </main>
  )
}
