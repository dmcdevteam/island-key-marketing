'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.25)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.8rem 3rem',
        opacity: scrolled ? 1 : 0,
        pointerEvents: scrolled ? 'auto' : 'none',
        background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        transition: 'opacity 0.4s ease, background 0.4s ease',
      }}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
        <img src="/logo.png" alt="" style={{ height: 26, width: 'auto', opacity: 0.9 }} />
        <span style={{
          fontFamily: 'var(--font-fraunces)',
          fontWeight: 200,
          fontSize: '0.85rem',
          letterSpacing: '0.15em',
          color: 'var(--cream)',
          opacity: 0.9,
        }}>
          ISLAND KEY
        </span>
      </Link>
      <a
        href="#collaborate"
        style={{
          fontFamily: 'var(--font-jakarta)',
          fontWeight: 300,
          fontSize: '0.65rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--cream)',
          opacity: 0.6,
          textDecoration: 'none',
          transition: 'opacity 0.3s ease',
          padding: '0.5rem 1rem',
          border: '1px solid rgba(196,165,90,0.2)',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '1', e.currentTarget.style.borderColor = 'rgba(196,165,90,0.5)')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '0.6', e.currentTarget.style.borderColor = 'rgba(196,165,90,0.2)')}
      >
        Collaborate
      </a>
      {/* Gold accent line at bottom of nav */}
      {scrolled && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '3rem',
          right: '3rem',
          height: '0.5px',
          background: 'linear-gradient(90deg, transparent, rgba(196,165,90,0.15), transparent)',
        }} />
      )}
    </nav>
  )
}
