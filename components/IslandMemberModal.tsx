'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  open: boolean
  onClose: () => void
}

export default function IslandMemberModal({ open, onClose }: Props) {
  const [key, setKey] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit() {
    const trimmed = key.trim()
    if (!trimmed || loading) return
    setLoading(true)
    window.location.href = `https://app.islandkey.gr/?key=${encodeURIComponent(trimmed)}`
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 400,
              background: 'var(--shell)',
              borderRadius: 24,
              padding: 'clamp(2rem, 5vw, 2.5rem)',
              position: 'relative',
              boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                color: 'var(--tx-light)',
                fontSize: '1.2rem',
                lineHeight: 1,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--tx-light)')}
            >
              &times;
            </button>

            {/* Logo */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'var(--ink)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
              }}>
                <img
                  src="/logo_icon.png"
                  alt="Island Key"
                  style={{ height: 28, width: 'auto', filter: 'brightness(10)' }}
                />
              </div>
            </div>

            {/* Title */}
            <h2 style={{
              fontFamily: 'var(--font-fraunces)',
              fontWeight: 300,
              fontSize: '1.6rem',
              color: 'var(--ink)',
              textAlign: 'center',
              lineHeight: 1.2,
              marginBottom: '0.5rem',
            }}>
              Welcome to Island Key
            </h2>

            {/* Subtitle */}
            <p style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 400,
              fontSize: '0.85rem',
              color: 'var(--tx-light)',
              textAlign: 'center',
              lineHeight: 1.6,
              marginBottom: '1.8rem',
            }}>
              Enter your access key to unlock your personalised Crete experience.
            </p>

            {/* Access key input */}
            <div style={{ marginBottom: '0.75rem' }}>
              <input
                type="text"
                value={key}
                onChange={e => setKey(e.target.value.toUpperCase())}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder="Enter access key"
                autoCapitalize="characters"
                autoCorrect="off"
                spellCheck={false}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: 16,
                  border: '1px solid var(--border)',
                  background: 'var(--mist)',
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  color: 'var(--ink)',
                  outline: 'none',
                  textAlign: 'center',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = 'var(--lime)'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(200,244,53,0.15)'
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              />
            </div>

            {/* Submit CTA */}
            <button
              onClick={handleSubmit}
              disabled={loading || !key.trim()}
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: 999,
                background: loading || !key.trim() ? 'rgba(200,244,53,0.4)' : 'var(--lime)',
                color: 'var(--ink)',
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: 'none',
                cursor: loading || !key.trim() ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s, transform 0.1s',
                marginBottom: '1.2rem',
              }}
              onMouseDown={e => { if (key.trim()) e.currentTarget.style.transform = 'scale(0.97)' }}
              onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              {loading ? 'Redirecting...' : 'Enter →'}
            </button>

            {/* Divider */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.2rem',
            }}>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              <span style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.75rem',
                color: 'var(--tx-light)',
                fontWeight: 400,
              }}>or</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            </div>

            {/* Request access key */}
            <a
              href="https://wa.me/306974176759?text=Hi%2C%20I%27d%20like%20to%20request%20an%20Island%20Key%20access%20key"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                width: '100%',
                padding: '0.85rem',
                borderRadius: 999,
                border: '1px solid var(--border)',
                background: 'transparent',
                color: 'var(--ink)',
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.85rem',
                fontWeight: 500,
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--mist)'
                e.currentTarget.style.borderColor = '#ccc'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderColor = 'var(--border)'
              }}
            >
              💬 Request an Access Key
            </a>

            {/* Footer text */}
            <p style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.7rem',
              color: 'var(--tx-light)',
              textAlign: 'center',
              marginTop: '1.2rem',
              lineHeight: 1.5,
            }}>
              Island Key is available exclusively to guests of our accommodation partners.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
