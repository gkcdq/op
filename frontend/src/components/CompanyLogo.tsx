import { useEffect, useState } from 'react'
import './CompanyLogo'

const LOGO_KEY = import.meta.env.VITE_LOGO_DEV_KEY

const LEGAL_FORMS = /\b(sa|sas|sasu|se|sca|plc|ag|nv|inc|corp|ltd|group|groupe|holding|holdings)\b/gi

export function toSearchName(name = '') {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, '')
    .replace(/\./g, '')
    .replace(LEGAL_FORMS, '')
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function getInitials(name = ''): string {
  const words = toSearchName(name).split(' ').filter(Boolean)
  if (words.length === 0) return '?'
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

interface CompanyLogoProps {
  societe: string | null; 
  size?: number;         
}

export default function CompanyLogo({ societe, size = 32 }: CompanyLogoProps) {
  const [failed, setFailed] = useState(false)
  const query = toSearchName(societe || '')

  useEffect(() => setFailed(false), [query])

  const style = { '--size': `${size}px` } as React.CSSProperties

  if (!LOGO_KEY || !query || failed) {
    return (
      <span className="logo logo-fallback" style={style} aria-hidden="true">
        {getInitials(societe || '')}
      </span>
    )
  }

  const src =
    `https://img.logo.dev/name/${encodeURIComponent(query)}` +
    `?token=${LOGO_KEY}&size=${size * 2}&format=png&fallback=404`

  return (
    <img
      className="logo"
      style={style}
      src={src}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      referrerPolicy="strict-origin-when-cross-origin"
      onError={() => setFailed(true)}
    />
  )
}