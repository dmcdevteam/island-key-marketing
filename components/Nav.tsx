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

  function openMemberModal() {
    window.dispatchEvent(new CustomEvent('open-island-member'))
  }

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
        justifyContent: 'center',
        gap: '1rem',
        padding: '1.4rem 3rem',
        opacity: scrolled ? 1 : 0,
        pointerEvents: scrolled ? 'auto' : 'none',
        background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        transition: 'opacity 0.4s ease, background 0.4s ease',
      }}
    >
      {/* Logo icon — left */}
      <Link href="/" style={{ position: 'absolute', left: '2rem', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img src="/logo_icon.png" alt="Island Key" style={{ height: 32, width: 'auto', opacity: 0.85 }} />
      </Link>

      {/* Collaborate */}
      <a
        href="#collaborate"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 300,
          fontSize: '0.65rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--shell)',
          opacity: 0.6,
          textDecoration: 'none',
          transition: 'opacity 0.3s ease, border-color 0.3s ease',
          padding: '0.5rem 1.2rem',
          border: '1px solid rgba(200,244,53,0.2)',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '1', e.currentTarget.style.borderColor = 'rgba(200,244,53,0.5)')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '0.6', e.currentTarget.style.borderColor = 'rgba(200,244,53,0.2)')}
      >
        Collaborate
      </a>

      {/* Island Member — lime pill CTA */}
      <button
        onClick={openMemberModal}
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 500,
          fontSize: '0.65rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--shell)',
          background: 'transparent',
          border: '1px solid rgba(200,244,53,0.2)',
          borderRadius: 0,
          padding: '0.5rem 1.2rem',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.opacity = '1'
          e.currentTarget.style.borderColor = 'rgba(200,244,53,0.5)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.opacity = '0.6'
          e.currentTarget.style.borderColor = 'rgba(200,244,53,0.2)'
        }}
      >
        Island Member
      </button>

      {/* Accent line at bottom */}
      {scrolled && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '3rem',
          right: '3rem',
          height: '0.5px',
          background: 'linear-gradient(90deg, transparent, rgba(200,244,53,0.15), transparent)',
        }} />
      )}
    </nav>
  )
}
